<script>
    import Modal from "../shared/Modal.svelte";
    import { checkDetail, Detail, ActiveTab } from "../../store/stores";
    import {onMount} from 'svelte'
    let pop = true;
    let opac = true;
    let notify = false
    onMount(() => {
        setTimeout(() => {
            pop=false
            opac=false
        }, 200);
    })
    const popInfo = () => {
        pop=true
        opac=true
        setTimeout(() => {
            pop=false
            opac=false
            checkDetail.set(false)
        }, 200);
    }
    const confirmGet = () => {
        notify=true
        pop=true
    }
    const confirmCancel = () => {
        notify=true
        pop=true
    }
</script>

<div class="popup-cont"  on:click|self={popInfo} on:keydown={() => {}}>
    <div class="black-bg" class:change={opac}></div>
    <section class:hide={pop}>
        <p>Are you sure you want to {$Detail.status === 'insured' ? 'cancel' : 'get'} insurance for</p>
        <h3>{$Detail.name}</h3>
        <div class="btns-cont">
            <button class="cancel" on:click={popInfo}>CANCEL</button>
            <button 
            class={$Detail.status === 'insured' ? 'confirm-cancel' : 'confirm-get'} 
            on:click={$Detail.status === 'insured' ? confirmCancel() : confirmGet()}>
            CONFIRM
            </button>
        </div>
    </section>
    <div class:hide-notify={!notify}>
        <Modal>
            <p slot="info">The insurance amount will be {$Detail.status === 'insured' ? 'refunded' : 'taken'}</p>
            <h2 slot="amount"> $5609</h2>
        </Modal>
    </div>
</div>


<style>
    .popup-cont{
        position: absolute;
        inset: 0;
        bottom: 0;
        z-index: 10;
        font-family: 'SF Pro Text';
        font-style: normal;
        font-weight: 500;
        line-height: normal;
        transition: all .3s ease;
    }
    .change{
        opacity: 0;
    }
    .hide{
        transform: translateY(100%);
    }
    section{
        position: absolute;
        inset-inline: 0;
        bottom: 0;
        z-index: 3;
        width: 100%;
        border-top-left-radius: 33.56px;
        border-top-right-radius: 33.56px;
        overflow: hidden;
        transition: all .3s ease;
        background: url('../static/linear-white-bg.svg');
        background-repeat: no-repeat;
        background-size: cover;
        padding: 34px 36.5px 49px 36.6px;
        text-align: center;
    }
    .black-bg{
        position: absolute;
        background: rgba(0, 0, 0, 0.85);
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        width: 100%;
        height: 100%;
        pointer-events: none;
        transition: all .3s ease;
        z-index: -1;
    }
    .btns-cont{
        display: flex;
        justify-content: center;
        gap: 8px;
    }
    .btns-cont button{
        color: #FFF;
        width: 108px;
        aspect-ratio: 108/44;
        border-radius: 27px;
        cursor: pointer;
        border: none;
        font-family: 'SF Pro Text';
        font-size: 11px;
        font-weight: 700;
    }
    .cancel{
        background: #8F97AD;
    }
    .cancel:hover{
        background: rgba(143, 151, 173, 0.50);
    }
    .confirm-cancel{
        background: #C4564E;
    }
    .confirm-cancel:hover{
        background: #E86B61;
    }
    .confirm-get{
        background: #1EA089;
    }
    .confirm-get:hover{
        background: #2FC0A7;
    }
    p{
        color: rgba(14, 14, 14, 0.60);
        text-align: center;
        font-size: 18px;
    }
    h3{
        color: #262B2A;
        font-size: 20px;
        font-weight: 700;
        text-transform: uppercase;
        margin-top: 16px;
        margin-bottom: 24px;
    }
    h2{
        color: #262B2A;
        font-size: 24px;
        font-weight: 700;
        margin-top: 14px;
    }
    .hide-notify{
        opacity: 0;
        pointer-events: none;
        transition: all .2s all;
    }
</style>