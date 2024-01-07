<script>
    import Vehicle from '../Vehicle.svelte';
    import { vehicles } from "../../store/stores";
</script>

<section>
    {#each $vehicles as vehicle (vehicle.id) }
        <Vehicle {vehicle} />
    {/each}
</section>

<style>
    section{
        display: flex;
        flex-direction: column;
        gap: 10px;
        overflow-y: scroll;
        transition: all .3s ease;
        padding-bottom: 18px;
        height: 478px;
        overflow-y: scroll;
    }
</style>