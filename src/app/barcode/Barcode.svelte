<script>

    import Preview from "./Preview.svelte";
    import Details from "./Details.svelte";
    import Hexdump from "../../components/Hexdump.svelte";

    let { 
        id,
        symbology = 'unknown',
        aim = '',
        value = '',
        bytes = [],
        data = null,
        debug = null,
        guess = false
    } = $props();

    let barcode = value.split('')
        .map((c) => `<span class='char ${c === ' ' ? 'space' : ''}'>${c}</span>`)
        .join('');

</script>

<div class="barcode">
    <div class="result">
        <p class='symbology' data-id={id} data-type={symbology} data-guess={guess}>{symbology}</p>
        <p class='value'>{@html barcode}</p>

        <Details {value} {data} />
    </div>

    <Preview symbology={symbology} value={value} />

    <div class='hexdump'>
        {#if bytes.length}
            {#each bytes as row}
                <Hexdump bytes={row} />
            {/each}
        {/if}
    </div>
</div>

<style>

    .barcode {
        border-bottom: 1px dashed #ccc;
        padding: 40px 20px 40px 20px;
        margin: 0px -20px;
        min-height: 12px;
        opacity: 0.8;

        display: grid;
        grid-template-columns: 1fr auto minmax(auto,580px) 1fr;
        grid-template-areas:
            "left preview content right"
            "left empty   hexdump right";
    }

@container barcodes (width < 580px) {
    .barcode {
        grid-template-columns: 1fr 0px minmax(auto,580px) 1fr;
        grid-template-areas:
            "left empty preview right"
            "left empty content right"
            "left empty hexdump right";
    }
}

    .barcode:nth-child(1) {
        opacity: 1;
        background: #fff;
    }
    .barcode .result {
        grid-area: content;
        margin-bottom: 2em;

        display: flex;
        flex-direction: column;
    }

    .barcode .result .symbology {
        width: fit-content;
        font-size: 0.7rem;
        color: #fff;
        background: #1976d2;
        border-radius: 5px;
        margin: 0 0 8px 0;
        padding: 6px 8px;            
    }
    .barcode .result .symbology[data-type="unknown"] {
        background-color: #888;
    }
    .barcode .result .symbology[data-guess="true"] {
        background-color: #888;
    }

    .barcode .result .symbology[data-guess="true"]::after {
        content: '?';
        position: absolute;
        margin-left: 0.6em;
        margin-top: -0.25em;
        color: #ccc;
        font-size: 1.6em;
    }

    .barcode .result .value {
        font-size: 1.5rem;
        margin: 0;
        color: #333;
    }
    .barcode .result .value :global(.char) {
        display: inline-block;
        width: 1ch;
    }
    .barcode .result .value :global(.space::before) {
        color: #ccc;
        content: '·';
    }

@container barcodes (width < 580px) {
    .barcode .result .value {
        align-self: center;
    }
    .barcode .result .symbology {
        align-self: center;
    }
}

    .barcode .hexdump {
        grid-area: hexdump;
    }


</style>