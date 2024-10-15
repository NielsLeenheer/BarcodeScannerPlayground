<script>

    import Barcode from "./barcode/Barcode.svelte";

    let barcodes = [];

    export const render = data => {
        barcodes = [ { id: barcodes.length, ...data }, ...barcodes ];
    }

</script>

<div id="output">
    {#each barcodes as barcode (barcode.id)}
        <Barcode {...barcode} />
    {/each}
</div>

<style>

    #output {
        padding: 0 20px;
        margin: 0;
        font-family: var(--font-stack-mono);
        font-size: 0.75rem;
        color: #888;

        container: barcodes / inline-size;
    }

</style>