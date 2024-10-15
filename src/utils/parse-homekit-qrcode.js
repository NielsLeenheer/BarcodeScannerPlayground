const HKCategory = new Map([
    [ 1, 'Other' ], 
    [ 2, 'Bridges' ], 
    [ 3, 'Fans' ], 
    [ 4, 'Garage Door Openers' ], 
    [ 5, 'Lighting' ], 
    [ 6, 'Locks' ], 
    [ 7, 'Outlets' ], 
    [ 8, 'Switches' ],
    [ 9, 'Thermostats' ], 
    [ 10, 'Sensors' ], 
    [ 11, 'Security Systems' ], 
    [ 12, 'Doors' ], 
    [ 13, 'Windows' ], 
    [ 14, 'Window Coverings' ], 
    [ 15, 'Programmable Switches' ], 
    [ 16, 'Range Extenders' ], 
    [ 17, 'IP Cameras' ], 
    [ 18, 'Video Doorbells' ], 
    [ 19, 'Air Purifiers' ], 
    [ 20, 'Heaters' ],
    [ 21, 'Air Conditioners' ],
    [ 22, 'Humidifiers' ],
    [ 23, 'Dehumidifiers' ],
    [ 28, 'Sprinklers' ],
    [ 29, 'Faucets' ],
    [ 30, 'Showers' ],
]);

const is = qrCode => {
    return typeof qrCode === 'string' && qrCode.match(/^X-HM:\/\//);
}

const parse = qrCode => {
    let payload = qrCode.substring(7, 16);
    let decoded = BigInt(parseInt(payload, 36));
    let code = (decoded & 0x7ffffffn).toString().padStart(8, '0');

    let flags = Number((decoded >> 0x1bn) & 0x0fn);

    let uses = [
        ...(flags & 0x01 ? ['NFC'] : []),
        ...(flags & 0x02 ? ['BLE'] : []),
        ...(flags & 0x04 ? ['IP'] : []),
        ...(flags & 0x08 ? ['Wireless (WAC)'] : []),
    ];

    let value = {
        code: `${code.substring(0, 3)}-${code.substring(3, 6)}-${code.substring(6, 8)}`,
        category: HKCategory.get(Number((decoded >> 0x1fn) & 0xffn)) || 'Unknown (' + Number((decoded >> 0x1fn) & 0xffn) + ')',
        flags: flags,
        uses,
        version: Number((decoded >> 0x2bn) & 0x07n),
        reserved: Number((decoded >> 0x27n) & 0x0en),
        setup: qrCode.substring(16, 20)
    }

    return value;
}

export default { is, parse };