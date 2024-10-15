<script>

    import Card from '../../../components/Card.svelte';
    import matter from '../../../utils/parse-matter-qrcode.js';

    export let value;

    let result = matter.parse(value);

</script>

{#await result then result}
    {#if result}

        <Card type='matter'>
            <div class='logo'>
                <img src='images/cards/matter.svg' alt=''>
            </div>
            <div class='information'>
                <div class='manualCode'><b>Code</b><br>{result.manualCode}</div>
                <div class='pincode'><b>Pin</b><br>{result.pincode}</div>
                <div class='vid'><b>Vendor</b><br>{result.vendorName ? result.vendorName : result.vid.toString(16).padStart(4, '0')}</div>
                <div class='pid'><b>Product</b><br>{result.productName ? result.productName : result.pid.toString(16).padStart(4, '0')}</div>
            </div>
        </Card>

    {/if}
{/await}