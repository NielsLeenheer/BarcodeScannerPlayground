class BitStruct {
    constructor(structure) {
        this.structure = structure;
    }

    build(data) {
        let bits = [];
        for (let key in this.structure) {
            const size = this.structure[key];
            let value = data[key].toString(2).padStart(size, '0');
            bits.push(value);
        }
        return bits.join('');
    }
}

export default BitStruct;