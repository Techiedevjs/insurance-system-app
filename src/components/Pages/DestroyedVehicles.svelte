<script>
    import {destroyedVehicles} from '../../store/stores'
    import Vehicle from "../Vehicle.svelte";
    const claimVehicles = () => {

    }
</script>

<section class="destroyed-vehicles">
    {#each $destroyedVehicles as vehicle (vehicle.id) }
        <Vehicle {vehicle} />
    {/each}
    <button on:click={claimVehicles}>CLAIM ALL VEHICLES</button>
</section>

<style>
   .destroyed-vehicles{
    display: flex;
        flex-direction: column;
        gap: 10px;
        overflow-y: scroll;
        transition: all .2s ease;
        padding-bottom: 18px;
        height: 498px;
        overflow-y: scroll;
    }
    button{
        position: absolute;
        bottom: 30px;
        left: 50%;
        transform: translateX(-50%);
        cursor: pointer;
        color: #FFF;
        font-size: 13px;
        font-weight: 700;
        text-transform: uppercase;
        border-radius: 27px;
        border: none;
        height: 44px;
        aspect-ratio: 188/44;
        font-family: inherit;
        background: #1EA089;
        transition: all .2s ease;
    }
    button:hover{
        background: #2FC0A7;
    }
</style>