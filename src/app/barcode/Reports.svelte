<script>

    import Hexdump from '../../components/Hexdump.svelte';

    export let reports = [];

</script>

{#each reports as report}
    <Hexdump {...report} />
{/each}
