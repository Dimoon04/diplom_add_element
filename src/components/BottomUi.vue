<template>
<div class="bottom">
    <el-row :gutter="10">
        <el-col :xs="3" :sm="4" :md="7" :lg="7" :xl="1"><div class="grid-content "></div></el-col>
        <el-col :xs="18" :sm="16" :md="10" :lg="10" :xl="11">
            <div class="copy">
                <hr>
                <p>© 2024 - Дима Ооржак</p>
            </div>
        </el-col>
        <el-col :xs="3" :sm="4" :md="7" :lg="7" :xl="1"><div class="grid-content ">
            
        </div></el-col>
    </el-row>
</div>
</template>
<script>

</script>
<style>
    .bottom{
        width: 100%;
       
        position: fixed;
        bottom: 0;
    }
    .copy{
        font-size: 2vmin;
    }
    .el-col {
    border-radius: 4px;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
</style>