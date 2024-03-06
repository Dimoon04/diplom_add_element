<template>
<div class="header">
    <el-row :gutter="10">
        <el-col :xs="6" :sm="4" :md="7" :lg="7" :xl="1"><div class="grid-content-left">
            
        </div></el-col>
        <el-col :xs="12" :sm="16" :md="10" :lg="10" :xl="11">
            <img src="../assets/logo.png" alt="Logo" class="logo">
            <div class="subtitle">
                <h2>Сканер IMEI</h2>
            </div>
        </el-col>
        <el-col :xs="6" :sm="4" :md="7" :lg="7" :xl="1"><div class="grid-content-right">
            <el-button class="btn-auth">Вход</el-button>

            
        </div></el-col>
    </el-row>
</div>    
</template>


<script>

</script>


<style>
    .logo{
        width: 60px;
        margin-top: 15px;
    }
    .grid-content {
        border-radius: 4px;
        min-height: 36px;
    }
    .grid-content-right {
        text-align: right;
        padding-right: 10px;
        padding-top: 20px;
        border-radius: 4px;
      
        min-height: 36px;
    }
    .grid-content-left {
        text-align: left;
        padding-right: 10px;
        padding-top: 20px;
        border-radius: 4px;
        min-height: 36px;
    }
    .el-dropdown-link {
        cursor: pointer;
        color: #409EFF;
    }
    .el-icon-arrow-down {
        font-size: 12px;
    }
</style>