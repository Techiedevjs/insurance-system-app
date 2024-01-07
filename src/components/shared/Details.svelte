<script>
    import { Detail, checkDetail } from "../../store/stores";
</script>

<main>
    <div class="img-cont">
        <div class="status {$Detail.status}">
            <span>{$Detail.status}</span>
            {#if $Detail.status === 'insured'}
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                <g clip-path="url(#clip0_18844_462)">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M9.47992 1.77286C9.77223 1.64904 10.0916 1.63289 10.3925 1.72674L10.5199 1.77286L15.7051 3.97437C15.968 4.08598 16.1975 4.2799 16.3668 4.53351C16.5361 4.78712 16.6383 5.08998 16.6614 5.40681L16.6666 5.54519V10.043C16.6666 11.402 16.3425 12.7357 15.7285 13.9035C15.1146 15.0713 14.2335 16.0297 13.1784 16.6777L12.9814 16.7942L10.497 18.2007C10.3602 18.278 10.2107 18.3225 10.058 18.3315C9.90535 18.3404 9.75266 18.3136 9.60955 18.2527L9.50288 18.2007L7.01844 16.7942C5.94482 16.1864 5.03605 15.2617 4.38807 14.1177C3.74009 12.9737 3.37694 11.6528 3.33696 10.2946L3.33325 10.043V5.54519C3.33326 5.22744 3.41298 4.91623 3.56313 4.64779C3.71328 4.37935 3.92769 4.16472 4.1814 4.02888L4.29473 3.97437L9.47992 1.77286ZM12.5429 7.16885L9.13696 11.025L7.82733 9.54228C7.68833 9.38502 7.49986 9.29672 7.30336 9.2968C7.10686 9.29688 6.91844 9.38533 6.77955 9.5427C6.64065 9.70007 6.56266 9.91346 6.56273 10.1359C6.5628 10.3584 6.64093 10.5717 6.77992 10.729L8.56066 12.7451C8.63633 12.8309 8.72617 12.8989 8.82505 12.9452C8.92393 12.9916 9.02992 13.0155 9.13696 13.0155C9.24399 13.0155 9.34998 12.9916 9.44886 12.9452C9.54774 12.8989 9.63758 12.8309 9.71325 12.7451L13.5903 8.35472C13.661 8.27736 13.7175 8.18482 13.7563 8.0825C13.7951 7.98018 13.8155 7.87013 13.8164 7.75877C13.8173 7.64741 13.7985 7.53698 13.7613 7.43391C13.724 7.33084 13.669 7.2372 13.5995 7.15845C13.5299 7.07971 13.4472 7.01744 13.3562 6.97527C13.2651 6.9331 13.1676 6.91188 13.0693 6.91285C12.9709 6.91381 12.8737 6.93695 12.7833 6.9809C12.6929 7.02486 12.6112 7.08875 12.5429 7.16885Z" fill="#2FC0A7"/>
                </g>
                <defs>
                  <clipPath id="clip0_18844_462">
                    <rect width="20" height="20" fill="white"/>
                  </clipPath>
                </defs>
            </svg>
            {:else}
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                <g clip-path="url(#clip0_18844_95)">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M10.52 1.77322L15.7052 3.97474C15.9876 4.09461 16.231 4.30925 16.4028 4.58995C16.5747 4.87065 16.6667 5.20405 16.6667 5.54557V10.0434C16.6667 11.4451 16.3219 12.8192 15.6711 14.0117C15.0202 15.2041 14.0889 16.1678 12.9815 16.7947L10.497 18.2003C10.3427 18.2877 10.1725 18.3332 9.99999 18.3332C9.82745 18.3332 9.65728 18.2877 9.50296 18.2003L7.01851 16.7938C5.91113 16.1669 4.97982 15.2033 4.32894 14.0108C3.67805 12.8184 3.3333 11.4443 3.33333 10.0425V5.54641C3.33314 5.20474 3.42511 4.87116 3.59693 4.59029C3.76876 4.30942 4.01224 4.09466 4.29481 3.97474L9.48 1.77322C9.81527 1.63093 10.1847 1.63093 10.52 1.77322ZM9.99999 11.6737C9.80354 11.6737 9.61513 11.7621 9.47621 11.9194C9.3373 12.0767 9.25925 12.29 9.25925 12.5124C9.25925 12.7348 9.3373 12.9482 9.47621 13.1054C9.61513 13.2627 9.80354 13.3511 9.99999 13.3511C10.1965 13.3511 10.3849 13.2627 10.5238 13.1054C10.6627 12.9482 10.7407 12.7348 10.7407 12.5124C10.7407 12.29 10.6627 12.0767 10.5238 11.9194C10.3849 11.7621 10.1965 11.6737 9.99999 11.6737ZM9.99999 5.80304C9.81856 5.80307 9.64345 5.87849 9.50787 6.01499C9.37229 6.15149 9.28567 6.33958 9.26444 6.54359L9.25925 6.64171V9.9964C9.25946 10.2102 9.33176 10.4158 9.46136 10.5712C9.59097 10.7266 9.76811 10.8202 9.95658 10.8327C10.1451 10.8452 10.3306 10.7758 10.4754 10.6386C10.6202 10.5014 10.7133 10.3068 10.7356 10.0945L10.7407 9.9964V6.64171C10.7407 6.41928 10.6627 6.20596 10.5238 6.04868C10.3849 5.8914 10.1965 5.80304 9.99999 5.80304Z" fill="#E86B61"/>
                </g>
                <defs>
                <clipPath id="clip0_18844_95">
                <rect width="20" height="20" fill="white"/>
                </clipPath>
                </defs>
            </svg>
            {/if}
        </div>
        <img src={$Detail.imgUrl} alt="car">
    </div>
    <div>
        <h3>{$Detail.name}</h3>
        <h5>{$Detail.type}</h5>
    </div>
    <article>
        <div>
            <p>{$Detail.status === 'insured' ? 'Insurance amount' : 'Cost of insurance'}</p> <span>{$Detail.status === 'insured' ? $Detail.insuredAmount : $Detail.costOfInsurance}</span>
        </div>
        {#if $Detail.status === 'insured'}
        <div>
            <p>Term of insurance</p> <span>{$Detail.period}</span>
        </div>
        {/if}
        <div>
            <p>Number of crashes</p> <span>{$Detail.crashes}</span>
        </div>
        <div>
            <p>Cost of auto</p> <span>{$Detail.autoCost}</span>
        </div>
    </article>
    <button class={$Detail.status === 'insured' ? 'red-btn' : 'green-btn'}  on:click={() => checkDetail.set(true)}>{$Detail.status === 'insured' ? 'CANCEL' : 'GET'} INSURANCE</button>
</main>

<style>
    main{
        font-style: normal;
        line-height: normal;
        font-family: 'SF Pro Text';
        height: 493px;
    }
    .img-cont{
        padding:  14px 19px 7px 15px;
        background: #F6FFFF;
        border-radius: 16px;
        box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.15);
    }
    .img-cont img{
        width: 234px;
        aspect-ratio: 234/163;
        object-fit: contain;
    }
    div:has(h3){
        text-align: center;
        margin-top: 26px;
        margin-bottom: 35px;
        text-transform: capitalize;
    }
    h3{
        color: #262B2A;
        font-size: 20px;
        font-weight: 700;
    }
    h5{
        color: rgba(38, 43, 42, 0.85);
        font-size: 16px;
        font-weight: 500;
    }
    article{
        display: flex;
        flex-direction: column;
        gap: 15px;
    }
    article div{
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-weight: 500;
    }
    article div p{
        color: rgba(38, 43, 42, 0.50);
        font-size: 12px;
    }
    article div span{
        color: #262B2A;
        font-size: 13px;
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
        transition: all .2s ease;
    }
    .red-btn{
        background: #C4564E;
    }
    .red-btn:hover{
        background: #E86B61;
    }
    .green-btn{
        background: #1EA089;
    }
    .green-btn:hover{
        background: #2FC0A7;
    }
    .status{
        position: absolute;
        right: 10px;
        top:10px;
        display: flex;
        align-items: center;
        gap: 10px;
        font-family: 'SF UI Text';
        font-size: 14px;
        font-weight: 600;
        border-radius: 16px;
        padding: 4px 10px 4px 10px;
        text-transform: capitalize;
    }
    .insured{
        color: #3D4E4A;
        background: #B7E7DF;
    }
    .uninsured{
        color: #784A46;
        background: #E6D4D4;
    }
</style>