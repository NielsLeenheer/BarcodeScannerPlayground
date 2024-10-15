import { generate } from 'verhoeff';
import Base38 from './base38.js';
import BitStruct from './bitstruct.js';


function getBits(start, length, data) {
    let bits = 0;
    for (let i = 0; i < length; i++) {
        let byte = (start + i) >> 3;
        let bit = (start + i) & 0x07;
        bits |= (data[byte] >> bit & 0b1) << i;
    }

    return bits;
}


const ManualCode = new BitStruct({
    version: 1,
    vid_pid_present: 1,
    discriminator: 4,
    pincode_lsb: 14,
    pincode_msb: 13,
    vid: 16,
    pid: 16,
    padding: 7
});

const CreateManualCode = data => {
    const bits = ManualCode.build({
        version: 0,
        vid_pid_present: data.flow === 0 ? 0 : 1,
        discriminator: data.discriminator.short,
        pincode_lsb: data.pincode & 0x3FFF,    // 14 least significant bits
        pincode_msb: data.pincode >> 14,       // 13 most significant bits
        vid: data.flow === 0 ? 0 : data.vid,
        pid: data.flow === 0 ? 0 : data.pid,
        padding: 0
    });

    let payload = 
        parseInt(bits.slice(0, 4), 2).toString().padStart(1, '0') +
        parseInt(bits.slice(4, 20), 2).toString().padStart(5, '0') +
        parseInt(bits.slice(20, 33), 2).toString().padStart(4, '0');

    if (data.flow !== 0) {
        payload += data.vid.toString().padStart(5, '0');
        payload += data.pid.toString().padStart(5, '0');
    }

    return `${payload.substring(0, 4)}-${payload.substring(4, 7)}-${payload.substring(7)}${generate(payload)}`;
}


const is = qrCode => {
    return typeof qrCode === 'string' && qrCode.match(/^MT:/);
}

const parse = async qrCode => {
    let payload = qrCode.substring(3);                    
    let raw = Base38.decode(payload);

    let bits = '';
    for (let i = 0; i < raw.length; i++) {
        bits += raw[i].toString(2).padStart(8, '0')
    }
    
    let value = {
        version: getBits(0, 3, raw),
        vid: getBits(3, 16, raw),
        pid: getBits(19, 16, raw),
        flow: getBits(35, 2, raw),
        discovery: getBits(37, 8, raw),
        discriminator: {
            long:   getBits(45, 12, raw),
            short: getBits(53, 4, raw),
        },
        pincode: getBits(57, 27, raw),
        padding: getBits(84, 4, raw),
    }

    value.manualCode = CreateManualCode(value);

    try {
        let response = await fetch(`https://on.dcl.iotledger.io/dcl/vendorinfo/vendors/${value.vid}`);
        let data = await response.json();

        if (data && data.vendorInfo) {
            value.vendorName = data.vendorInfo.vendorName;
            value.vendorUrl = data.vendorInfo.vendorLandingPageURL;
        }
    }
    catch (e) {
    }

    try {
        let response = await fetch(`https://on.dcl.iotledger.io/dcl/model/models/${value.vid}/${value.pid}`);
        let data = await response.json();

        if (data && data.model) {
            value.productName = data.model.productName;
            value.productUrl = data.model.productUrl;
        }
    }
    catch (e) {
    }

    return value;
}

export default { is, parse };