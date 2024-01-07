<script>
    import {isLocation} from '../../store/stores'
</script>

<section>
    <img src="../static/map.png" alt="map">
    <div class="back" on:click={() => isLocation.set(false)} on:keydown={() => {}}>
        <svg xmlns="http://www.w3.org/2000/svg" width="9" height="16" viewBox="0 0 9 16" fill="none">
            <path d="M7.64331 16L9 14.58L2.71338 8L9 1.42L7.64331 0L0 8L7.64331 16Z" fill="#0975FD"/>
        </svg> BACK
    </div>
</section>

<style>
    section{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 10;
    }
    section img{
        width: 100%;
        height: 100%;
    }
    .back{
        color: #0975FD;
        font-size: 11px;
        font-weight: 700;
        text-transform: uppercase;
        display: flex;
        align-items: center;
        gap: 7px;
        cursor: pointer;
        position: absolute;
        top: 58px;
        left: 18px;
    }
    .back:hover{
        color: #348EFF;
    }
    .back:hover svg path{
        fill: #348EFF;
    }
</style>