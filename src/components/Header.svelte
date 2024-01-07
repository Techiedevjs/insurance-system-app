<script>
    import { ActiveTab} from "../store/stores";
    
</script>

<header>
    <div class="header-content">
        <h4>{$ActiveTab}</h4>
    </div>
</header>

<style>
    header {
        width: 100%;
        font-size: 16px;
        padding:53px 0 15px 0;
        transition: all .3s ease;
    }
    header .header-content {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
    }
    h4{
        text-transform: capitalize;
        font-size: var(--fm);
        text-align: center;
        flex: 1;
        color: #262B2A;
        font-weight: 700;
    }
</style>
