<template>
    <div class="">
    
      <el-row :gutter="10">
        <el-col :xs="8" :sm="6" :md="7" :lg="7" :xl="1"><div class="grid-content bg-purple"></div></el-col>
        <el-col :xs="4" :sm="12" :md="10" :lg="10" :xl="11">
          <button @click="checkImeis" class="btn_check">ПРОВЕРИТЬ</button>
        </el-col>
        <el-col :xs="8" :sm="6" :md="7" :lg="7" :xl="1"><div class="grid-content bg-purple-light"></div></el-col>
      </el-row>



    
        
    </div>
</template>
<script>
 import {store} from '../store'

   export default {
    data(){
        return{
            
            result_out: ''
        }
    },
    computed:{
        

    }
    ,
    methods:{
      checkImeis() {
        let imei = store.state.imei
        let bars_array = store.state.bars_array
          for (let b in imei){
            for (let i in bars_array){
              // console.log(imei[b].imei)
              // console.log(bars_array[i].id)
              if (imei[b].imei==bars_array[i].id){
                console.log('есть')
                store.commit('set_exst',bars_array[i].id)
              }
            }
            
          }
          // if(result) {
          //   this.result_out = 'есть'
          // }else{
          //   this.result_out = 'нет'
          // }
      },
    }
  }

</script>
<style>
button {
  font-size: 1.2rem;
  
}
.btn_check{
  background-color: #75c3ff;
  width: 100%;
  border-radius: 10px;
}




.el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }

</style>
