<script>

    import Boardingpass from "./details/Boardingpass.svelte";
    import GS1 from "./details/GS1.svelte";
    import HomeKit from "./details/HomeKit.svelte";
    import Matter from "./details/Matter.svelte";
    import Wifi from "./details/Wifi.svelte";

    import boardingpass from '../../utils/parse-boardingpass.js';
    import homekit from '../../utils/parse-homekit-qrcode.js';
    import matter from '../../utils/parse-matter-qrcode.js';
    import wifi from '../../utils/parse-wifi-qrcode.js';

    let { 
        value,
        data = {}
    } = $props();

    let type = $state();


    if (data?.elements) {
        type = 'gs1';
    }

    if (boardingpass.is(value)) {
        type = 'boardingpass';
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

{#if type === 'gs1'}
    <GS1 {value} elements={data.elements} />
{/if}
