
const encode = (str) => {
    return str
        .replace(/\\\\/g, '~backslash~')
        .replace(/\\;/g, '~semicolon~')
        .replace(/\\,/g, '~comma~')
        .replace(/\\"/g, '~quote~')
        .replace(/\\:/g, '~colon~')
}

const decode = (str) => {
    return str
        .replace(/"/g, '')
        .replace(/~backslash~/g, '\\')
        .replace(/~semicolon~/g, ';')
        .replace(/~comma~/g, ',')
        .replace(/~quote~/g, '"')
        .replace(/~colon~/g, ':')
}


const is = qrCode => {
    return typeof qrCode === 'string' && qrCode.match(/^WIFI:/);
}

const parse = qrCode => {
    if (!qrCode.startsWith('WIFI:')) {
        return;
    }

    let parameters = qrCode.substring(5);
    let parts = encode(parameters)
                    .split(';')
                    .filter(part => part.length > 0)
                    .map(part => part.split(':'))
                    .map(part => [ part[0], decode(part[1]) ]);
                    
    let value = {};

    for (let part of parts) {
        if (part[0] === 'T') {
            value.type = part[1];
        }

        if (part[0] === 'S') {
            value.ssid = decodeURIComponent(part[1]);
        }

        if (part[0] === 'P' && part[1] != 'nopass') {
            value.password = decodeURIComponent(part[1]);
        }

        if (part[0] === 'H') {
            value.hidden = part[1] === 'true';
        }

        if (part[0] === 'R') {
            value.trdisabled = parseInt(part[1], 16);
        }

        if (part[0] === 'I') {
            value.identity = decodeURIComponent(part[1]);
        }

        if (part[0] === 'K') {
            value.key = part[1];
        }
    }

    return value;
}

export default { is, parse };