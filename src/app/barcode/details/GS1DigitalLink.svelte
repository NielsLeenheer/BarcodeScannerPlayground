<script>

    import Card from '../../../components/Card.svelte';

    import gs1digitallink from '../../../utils/parse-gs1-digital-link.js';

    export let value;

    let result = gs1digitallink.parse(value);

</script>

{#if result}

    <Card type='gs1digitallink'>
        <div class='logo'>
            <img src='images/cards/cart.svg' alt=''>
        </div>            

        <div class='information'>
            {#if result['01']}<div><b>GTIN</b><br>{result['01']}</div>{/if}
            {#if result['10']}<div><b>Batch</b><br>{result['10']}</div>{/if}
            {#if result['22']}<div><b>Product variant</b><br>{result['22']}</div>{/if}
            {#if result['21']}<div><b>Serial number</b><br>{result['21']}</div>{/if}
            {#if result['15']}<div><b>Best before</b><br>{result['15'].substring(4,6)}-{result['15'].substring(2,4)}-20{result['15'].substring(0,2)}</div>{/if}            
        </div>
    </Card>

{/if}
