<script>

  import KeyboardBarcodeScanner from '@point-of-sale/keyboard-barcode-scanner';
  import WebHIDBarcodeScanner from '@point-of-sale/webhid-barcode-scanner';
  import WebSerialBarcodeScanner from '@point-of-sale/webserial-barcode-scanner';
  import WebcamBarcodeScanner from '@point-of-sale/webcam-barcode-scanner';
  
  import Output from './app/Output.svelte';
  import Header from './app/Header.svelte';


  /* State */

  let barcodeScanner;
  let output;
  
  let connected = $state(false);


  /* Functions */

  function connect(event) {
    let { driver, baudrate } = event;

    /* Setup driver */

    if (driver === 'hid') {
        barcodeScanner = new WebHIDBarcodeScanner({ debug: true });
    }

    if (driver === 'serial') {
        barcodeScanner = new WebSerialBarcodeScanner({
            baudRate: parseInt(baudrate, 10),
            guessSymbology: true
        });
    }

    if (driver === 'webcam') {
        barcodeScanner = new WebcamBarcodeScanner({ 
            // useFallback: true,

            preview: {
                draggable: true,
                padding: {
                    top: 80,
                    right: 20,
                    bottom: 20,
                    left: 20
                }
            }
        });
    }

    if (driver === 'keyboard') {
        barcodeScanner = new KeyboardBarcodeScanner({ 
            debug: true,
            guessSymbology: true 
        });
    }

    /* Event listeners */

    barcodeScanner.addEventListener('connected', device => {
        connected = true;
    });

    barcodeScanner.addEventListener('barcode', data => {
        output.render({ type: 'barcode', ...data })
    });

    barcodeScanner.addEventListener('debug', data => {
        output.render({ type: 'debug', ...data })
    });

    /* Connect */

    barcodeScanner.connect();
  }

  function disconnect() {
    barcodeScanner.disconnect();
    connected = false;
  }

</script>

<Header {connected} {connect} {disconnect} />

<div id="content">
    <Output bind:this={output} />
</div>

