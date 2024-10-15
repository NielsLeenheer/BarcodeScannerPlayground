import { decode } from 'bcbp';

const compartmentCodes = {
    'A': 'First Class',
    'B': 'Economy',
    'C': 'Business Class',
    'D': 'Business Class',
    'E': 'Shuttle Service',
    'F': 'First Class',
    'G': 'Conditional Reservation',
    'H': 'Economy',
    'J': 'Business Class Premium',
    'K': 'Thrift',
    'L': 'Thrift',
    'M': 'Economy',
    'P': 'First Class Premium',
    'Q': 'Economy',
    'R': 'First Class Suite',
    'S': 'Standard',
    'T': 'Economy',
    'U': 'Shuttle Service',
    'V': 'Thrift',
    'W': 'Economy Premium',
    'X': 'Economy',
    'Y': 'Economy',
    'Z': 'Business Class',
};

const is = qrCode => {
    return typeof qrCode === 'string' && qrCode.match(/^M[0-9]/);
}

const parse = qrCode => {
    let result = [];

    let decoded = decode(qrCode);

    let passengerName = decoded.data.passengerName
            .split('/')
            .map(name => name.charAt(0).toUpperCase() + name.toLowerCase().slice(1))
            .reverse()
            .join(' ');

    let flightDateFormat = new Intl.DateTimeFormat('en-US',  {
        day: 'numeric',
        month: 'long'
    });
    
    let flightTimeFormat = new Intl.DateTimeFormat('en-US',  {
        hour: 'numeric',
        minute: 'numeric'
    });

    for (let leg of decoded.data.legs) {
        let flightDate = flightDateFormat.format(new Date(leg.flightDate));
        let flightTime = flightTimeFormat.format(new Date(leg.flightDate));                        

        result.push({
            carrier: leg.operatingCarrierDesignator,
            flightNumber: leg.flightNumber,
            flightDate: flightDate,
            flightTime: flightTime,
            departureAirport: leg.departureAirport,
            arrivalAirport: leg.arrivalAirport,
            passengerName: passengerName,
            pnr: leg.operatingCarrierPNR,
            class: leg.compartmentCode ? compartmentCodes[leg.compartmentCode] : '',
            seat: leg.seatNumber,
            sequence: leg.checkInSequenceNumber,
        });
    }

    return result;
}

export default { is, parse };