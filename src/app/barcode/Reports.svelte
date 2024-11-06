<script>

    import Hexdump from '../../components/Hexdump.svelte';

    let { reports = [] } = $props();

</script>

{#each reports as report}
    <Hexdump {...report} />
{/each}
