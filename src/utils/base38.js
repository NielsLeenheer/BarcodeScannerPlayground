const CODES = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
               'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J',
               'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T',
               'U', 'V', 'W', 'X', 'Y', 'Z', '-', '.'];

const RADIX = CODES.length;
const BASE38_CHARS_NEEDED_IN_CHUNK = [2, 4, 5];
const MAX_BYTES_IN_CHUNK = 3;
const MAX_ENCODED_BYTES_IN_CHUNK = 5;


function encode(bytes) {
    const totalBytes = bytes.length;
    let qrcode = '';

    for (let i = 0; i < totalBytes; i += MAX_BYTES_IN_CHUNK) {
        let bytesInChunk = (i + MAX_BYTES_IN_CHUNK > totalBytes) 
            ? totalBytes - i 
            : MAX_BYTES_IN_CHUNK;

        let value = 0;
        for (let j = i; j < i + bytesInChunk; j++) {
            value += bytes[j] << (8 * (j - i));
        }

        let base38CharsNeeded = BASE38_CHARS_NEEDED_IN_CHUNK[bytesInChunk - 1];
        while (base38CharsNeeded > 0) {
            qrcode += CODES[value % RADIX];
            value = Math.floor(value / RADIX);
            base38CharsNeeded--;
        }
    }

    return qrcode;
}

function decode(qrcode) {
    const totalChars = qrcode.length;
    let decodedBytes = [];

    for (let i = 0; i < totalChars; i += MAX_ENCODED_BYTES_IN_CHUNK) {
        let charsInChunk = (i + MAX_ENCODED_BYTES_IN_CHUNK > totalChars) 
            ? totalChars - i 
            : MAX_ENCODED_BYTES_IN_CHUNK;

        let value = 0;
        for (let j = i + charsInChunk - 1; j >= i; j--) {
            value = value * RADIX + CODES.indexOf(qrcode[j]);
        }

        let bytesInChunk = BASE38_CHARS_NEEDED_IN_CHUNK.indexOf(charsInChunk) + 1;
        for (let k = 0; k < bytesInChunk; k++) {
            decodedBytes.push(value & 0xFF);
            value = value >> 8;
        }
    }

    return new Uint8Array(decodedBytes);
}

export default { encode, decode };