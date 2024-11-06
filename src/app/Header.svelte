<script>

    import { Icon } from 'svelte-icon';
    import connectIcon from '../assets/icons/connect.svg?raw';
    import disconnectIcon from '../assets/icons/disconnect.svg?raw';

    let { connected, connect, disconnect } = $props();

    let driver = $state('webcam');
    let baudrate = $state('9600');

    let supported = $derived(
        ( driver === 'keyboard' ) || 
        ( driver === 'webcam' ) || 
        ( driver === 'hid' && 'hid' in navigator ) ||
        ( driver === 'serial' && 'serial' in navigator )
    );


    /* Retrieve and save state */
  
    let driverValue = localStorage.getItem('barcode-driver');

    if (driverValue) {
        driver = driverValue;
    }

    let baudrateValue = localStorage.getItem('barcode-baudrate');

    if (baudrateValue) {
        baudrate = baudrateValue;
    }

    window.addEventListener('beforeunload', () => {
        if (driver) {
            localStorage.setItem('barcode-driver', driver);
        }

        if (baudrate) {
            localStorage.setItem('barcode-baudrate', baudrate);
        }
    });

</script>

<header>
    <select id="driver" bind:value={driver} disabled={!!connected}>
        <option value="webcam">Webcam</option>
        <option value="hid">HID</option>
        <option value="serial">Serial</option>
        <option value="keyboard">Keyboard</option>
    </select>

    {#if driver === 'serial'}
      <select id="baudrate" bind:value={baudrate} disabled={!!connected}>
          <option value="9600">9600</option>
          <option value="38400">38400</option>
          <option value="115200">115200</option>
      </select>
    {/if}

    {#if !connected}
      <button id="connect" onclick={() => connect({ driver, baudrate })} disabled={!supported}>
          <Icon data={connectIcon} />
          Connect
      </button>
    {:else}
      <button id="disconnect" onclick={() => disconnect()}>
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
