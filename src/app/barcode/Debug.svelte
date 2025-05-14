<script>

    let { 
        id,
        type,
        events = []
    } = $props();

    let timeline = [];
    let lastTime = null;

    for (let event of events) {
        timeline.push({
            diff: lastTime ? event.time - lastTime : 0,
            ...event
        })

        lastTime = event.time;
    }

</script>

<div class="debug">
    <div class="result">
        {#each timeline as event}
            <div>
            {#if event.type === 'keydown'}
                {#if event.diff > 1}
                    <div class="diff">← {Math.round(event.diff * 10) / 10}ms →</div>
                {/if}
                <kbd>{event.key}</kbd>
            {/if}

            {#if event.type === 'label'}
                {#if event.diff > 1}
                    <div class="diff">← {Math.round(event.diff * 10) / 10}ms →</div>
                {/if}
                <div class={[ 'label', event.class ]}>{event.label}</div>
            {/if}
        </div>
        {/each}
    </div>
</div>

<style>

    .debug {
        border-bottom: 1px dashed #ccc;
        padding: 40px 20px 40px 20px;
        margin: 0px -20px;
        min-height: 12px;
        opacity: 0.8;

        display: grid;
        grid-template-columns: 1fr minmax(auto,740px) 1fr;
        grid-template-areas:
            "left content right";
    }

    .debug:nth-child(1) {
        opacity: 1;
        background: #fff;
    }
    .debug .result {
        grid-area: content;
        margin-bottom: 2em;
        display: block;
    }
    .debug .result > div {
        display: inline-block;
    }

    kbd {
        display: inline-block;
        padding: 0.2em 0.6em;
        margin: 0 0.5em 0.7em 0;
        border-radius: 4px;
        background: #f6f6f6;
        border: 2px solid #aaa;
        box-shadow: #999 0 2px 0px 0px;
        color: #888;
        font-size: 0.75rem;
        position: relative;
        top: -1px;
    }

    .label {
        display: inline-block;
        border-radius: 4px;
        background: #ddd;
        border: 3px solid #ddd;
        padding: 0.2em 0.6em;
        margin: 0 0.5em 0.7em 0;
        color: #444;
    }

    .label.success {
        background: #4caf50;
        border: 2px solid #4caf50;
        color: #fff;
    }

    .label.error {
        background: #f44336;
        border: 2px solid #f44336;
        color: #fff;
    }

    .diff {
        display: inline-block;
        margin: 0;
        color: #bbb;
    }

</style>