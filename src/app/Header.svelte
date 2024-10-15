<script>

    import { createEventDispatcher } from 'svelte';
    import { Icon } from 'svelte-icon';
    import connectIcon from '../assets/icons/connect.svg?raw';
    import disconnectIcon from '../assets/icons/disconnect.svg?raw';

    export let connected;

    let driver = 'webcam';
    let baudrate = '9600';
    let supported;

    $: supported = 
        driver === 'keyboard' || driver === 'webcam' || 
        ( driver === 'hid' && 'hid' in navigator ) ||
        ( driver === 'serial' && 'serial' in navigator );


    const dispatch = createEventDispatcher();

</script>

<header>
    <select id="driver" bind:value={driver}>
        <option value="webcam">Webcam</option>
        <option value="hid">HID</option>
        <option value="serial">Serial</option>
        <option value="keyboard">Keyboard</option>
    </select>

    {#if driver === 'serial'}
      <select id="baudrate" bind:value={baudrate}>
          <option value="9600">9600</option>
          <option value="38400">38400</option>
          <option value="115200">115200</option>
      </select>
    {/if}

    {#if !connected}
      <button id="connect" on:click={() => dispatch('connect', { driver, baudrate })} disabled={!supported}>
          <Icon data={connectIcon} />
          Connect
      </button>
    {:else}
      <button id="disconnect" on:click={() => dispatch('disconnect')}>
          <Icon data={disconnectIcon} />
          Disconnect
      </button>
    {/if}

</header>


<style>
  
    button#connect {
      background-color: #bbdefb;
      color: #1976d2;
    }

    button#disconnect,
    button#connect {
      margin-right: auto;
    }

</style>
