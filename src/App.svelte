<script>
    import { ActiveTab, checkDetail, Detail, isLocation } from "./store/stores";
    $:details = $Detail;
    import Header from "./components/Header.svelte";
    import Menu from "./components/Menu.svelte";
    // Pages
    import Home from "./components/Pages/Home.svelte";
    import Vehicles from "./components/Pages/Vehicles.svelte";
    import DestroyedVehicles from "./components/Pages/DestroyedVehicles.svelte";
    import Notifications from "./components/Pages/Notifications.svelte";
    import Popup from "./components/shared/Popup.svelte";
    import DetailHeader from "./components/DetailHeader.svelte";
    import Details from "./components/shared/Details.svelte";
    import Location from "./components/shared/Location.svelte";
</script>

<main class="app">
    <div>
        {#if details}
            <DetailHeader/>
            <section>
                <Details/>
            </section>
            {:else}
            <Header/>
            <section> 
                {#if $ActiveTab === 'dashboard'}
                    <Home/>
                    {:else if $ActiveTab === 'your vehicles' }
                    <Vehicles/>
                    {:else if $ActiveTab === 'destroyed vehicles'}
                    <DestroyedVehicles/>
                    {:else if $ActiveTab === 'notifications'}
                    <Notifications/>
                {/if}
            </section>
        {/if}
        <Menu/>
    </div>
    {#if $checkDetail}
        <Popup/>
    {/if} 
    {#if $isLocation}
        <Location/>
    {/if}
</main>

<style>
    main {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%) !important;
        height: 651px;
        aspect-ratio: 300/651;
        background: #E0EBF1;
        background-repeat: no-repeat;
        background-size: cover;
        border-radius: 33.6px;
        font-family: "SF Pro Text";
        font-style: normal;
        color: #ffffff;
        overflow: hidden;
    }
    section{
        position: relative;
    }
    main div{
        position: relative;
        height: 100%;
        padding: 0 15px;
    }
</style>
