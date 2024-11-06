<script>

    let { symbology = '', value = '' } = $props();

    let failed = $state(false);

    let symbologies = {
        'upca': 'upca',
        'upce': 'upce',
        'ean13': 'ean13',
        'ean8': 'ean8',
        'code11': 'code11',
        'code32': 'code32',
        'code39': 'code39',
        'coda39': 'code39',
        'code-49': 'code49',
        'itf': 'interleaved2of5',
        'interleaved-2-of-5': 'interleaved2of5',
        'msi': 'msi',
        'nw-7': 'rationalizedCodabar',
        'codabar': 'rationalizedCodabar',
        'code93': 'code93',
        'code128': 'code128',
        'gs1-128': 'gs1-128',
        'gs1-databar-omni': 'databaromni',
        'gs1-databar-truncated': 'databartruncated',
        'gs1-databar-limited': 'databarlimited',
        'gs1-databar-expanded': 'databarexpanded',
        'code128-auto': 'code128',
        'codablock-f': 'codablockf',
        'aztec-code': 'azteccode',
        'qr-code': 'qrcode',
        'pdf417': 'pdf417',
        'pdf417-micro': 'pdf417compact',
        'data-matrix': 'datamatrix',
        'maxicode': 'maxicode',
    }

    let parameters = {
        bcid: symbologies[symbology],
        text: value,
    }

    if (symbology !== 'qr-code' && symbology !== 'aztec-code' && symbology !== 'pdf417' && symbology !== 'data-matrix') {
        parameters.height = '16';
    }

    let src = $state();
    
    if (symbologies[symbology]) {
        src = 'https://bwipjs-api.metafloor.com/?' + new URLSearchParams(parameters).toString();
    } else {
        console.log('Trying to render unknown symbology for Bwipjs', symbology);
    }

</script>

<div class='preview'>
    {#if symbology && symbology !== 'unknown' && src && !failed}
        <img {src} alt='' onerror={() => {failed = true}}>
    {/if}
</div>

<style>

    .preview {
        grid-area: preview;
        min-width: 160px;
    }

@container barcodes (width < 580px) {
    .preview {
        min-width: auto;
        justify-self: center;
        margin-bottom: 20px;
    }
}

    .preview img {
        max-width: 130px;
        min-height: 60px;
    }

</style>

