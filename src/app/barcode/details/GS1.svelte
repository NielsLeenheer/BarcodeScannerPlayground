<script>

    import Card from '../../../components/Card.svelte';

    let { elements } = $props();

</script>

<Card type='gs1'>
    <div class='logo'>
        <img src='images/cards/gs1.svg' alt=''>
    </div>            

    <div class='expanded'>
        {#each elements as element (element.ai)}
            {'(' + element.ai + ') ' + element.value + ' '}
        {/each}
    </div>

    <div class='information'>
        {#each elements as element (element.ai)}
            <div><b>{element.label}</b><br>{element.value}</div>
        {/each}
    </div>
</Card>

<style>

    .expanded {
        text-align:center;
        margin-top: -16px;
        padding-bottom: 12px;
        margin-bottom: 12px;
        font-family: var(--font-stack-mono);

        border-bottom: 1px solid #ccc;
    }
</style>