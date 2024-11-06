<script>

    let { children, type = '' } = $props();

</script>

<div class='card {type}'>
    {@render children?.()}
</div>

<style>

    .card {
        background: #eee;
        border-radius: 6px;
        padding: 20px 50px;
        margin: 30px 0 4px;
        font-family: system-ui;
        display: flex;
        flex-direction: column;
    }
    .card :global(.logo) {
        align-self: center;
        margin-bottom: 24px;
    }
    .card :global(.logo img) {
        height: 32px;
        display: block;
        margin-bottom: 8px;
    }
    .card :global(.information) {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        text-align: center;
        color: #333;
    }
    .card :global(.information div) {
        margin: 0 0 16px;
    }
    .card :global(.information b) {
        text-transform: uppercase;
        font-size: 0.8em;
        line-height: 180%;
    }

</style>
