<script>

    let { bytes = [] } = $props();

    let result = bytes.reduce((p, c, i, a) => p + (i % 16 === 0 ? '<span class="number">' + 
        i.toString(16).padStart(6, '0') + '</span>  ' : ' ') + '<span class="data">' + c.toString(16).padStart(2, '0') + 
        '</span>' + (i === a.length - 1 || i % 16 === 15 ? '<span class="chars">' + ' '.repeat((15 - i % 16) * 3) + 
        Array.from(a).splice(i - i % 16, 16).reduce((r, v) => r + (v > 31 && v < 127 || v > 159 ? 
        String.fromCharCode(v) : '.'), '  ') + '</span>\n' : ''), '')

</script>

<pre>{@html result}</pre>

<style>

    pre {
        margin-top: 0;
        line-height: 130%;
    }

    pre :global(.number) {
        color: #aaa;
    }
    pre :global(.data) {
        color: #000;
    }
    pre :global(.chars) {
        color: #3F51B5;
    }

</style>