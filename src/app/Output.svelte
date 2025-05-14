<script>

    import Barcode from "./barcode/Barcode.svelte";
    import Debug from "./barcode/Debug.svelte";

    let items = [];

    export const render = data => {
        items = [ { id: items.length, ...data }, ...items ];
    }

</script>

<div id="output">
    {#each items as item (item.id)}
        {#if item.type === 'barcode'}
            <Barcode {...item} />
        {/if}
        {#if item.type === 'debug'}
            <Debug {...item} />
        {/if}
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