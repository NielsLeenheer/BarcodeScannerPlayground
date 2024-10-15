<script>

    import Card from '../../../components/Card.svelte';
    import wifi from '../../../utils/parse-wifi-qrcode.js';

    export let value;

    let result = wifi.parse(value);

</script>

{#if result}
    <Card type='wifi'>
        <div class='logo'>
            <img src='images/cards/wifi.svg' alt=''>
        </div>
        <div class='information'>
            <div class='ssid'><b>SSID</b><br>{result.ssid}</div>
            <div class='password'><b>Password</b><br>{result.password}</div>
            <div class='hidden'><b>Hidden</b><br>{result.hidden ? 'Yes' : 'No'}</div>
        </div>
    </Card>
{/if}