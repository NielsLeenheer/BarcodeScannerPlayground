<script>

    import Card from '../../../components/Card.svelte';
    import homekit from '../../../utils/parse-homekit-qrcode.js';

    let { value } = $props();

    let result = homekit.parse(value);

</script>

{#if result}

    <Card type='homekit'>
        <div class='logo'>
            <img src='images/cards/homekit.svg' alt=''>
        </div>
        <div class='information'>
            <div class='code'><b>Code</b><br>{result.code}</div>
            <div class='category'><b>Category</b><br>{result.category}</div>
            <div class='pairing'><b>Pairing</b><br>{result.uses.join(', ')}</div>
        </div>        
    </Card>

{/if}
