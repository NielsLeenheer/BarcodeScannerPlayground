<script>

    import Boardingpass from "./details/Boardingpass.svelte";
    import GS1DigitalLink from "./details/GS1DigitalLink.svelte";
    import HomeKit from "./details/HomeKit.svelte";
    import Matter from "./details/Matter.svelte";
    import Wifi from "./details/Wifi.svelte";

    import boardingpass from '../../utils/parse-boardingpass.js';
    import gs1digitallink from '../../utils/parse-gs1-digital-link.js';
    import homekit from '../../utils/parse-homekit-qrcode.js';
    import matter from '../../utils/parse-matter-qrcode.js';
    import wifi from '../../utils/parse-wifi-qrcode.js';


    export let value;

    let type;

    if (boardingpass.is(value)) {
        type = 'boardingpass';
    } 
    
    if (gs1digitallink.is(value)) {
        type = 'gs1digitallink';
    }

    if (homekit.is(value)) {
        type = 'homekit';
    } 
    
    if (matter.is(value)) {
        type = 'matter';
    }

    if (wifi.is(value)) {
        type = 'wifi';
    } 
    

</script>


{#if type === 'boardingpass'}
    <Boardingpass {value} />
{/if}

{#if type === 'wifi'}
    <Wifi {value} />
{/if}

{#if type === 'homekit'}
    <HomeKit {value} />
{/if}

{#if type === 'matter'}
    <Matter {value} />
{/if}

{#if type === 'gs1digitallink'}
    <GS1DigitalLink {value} />
{/if}
