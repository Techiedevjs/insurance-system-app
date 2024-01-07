<script>

</script>


<section>
    <slot name="info"/>
    <slot name="amount"/>
</section>

<style>
    section{
        padding: 32px 34.5px;
        text-align: center;
        transition: all .3s ease;
        background: url('../static/linear-white-bg.svg');
        background-repeat: no-repeat;
        background-size: cover;
        border-radius: 19px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        width: 268px;
    }
    .info{
        color: rgba(14, 14, 14, 0.60);
        font-size: 18px;
        margin-bottom: 14px;
    }
    .amount{
        color: #262B2A;
        font-size: 24px;
        font-weight: 700;
    }
</style>