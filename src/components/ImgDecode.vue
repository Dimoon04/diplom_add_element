<template>
    <div>
      <el-row :gutter="10">
        <el-col :xs="8" :sm="6" :md="7" :lg="7" :xl="1"><div class="grid-content bg-purple"></div></el-col>
        <el-col :xs="4" :sm="12" :md="10" :lg="10" :xl="11">
          <div class="ImgDecode">
            <div id="dropzone">
              <input type="file" @change="decodeImg" title="">
            </div>
            <h2>Вставьте сюда фотографию</h2>
          </div>
        </el-col>
        <el-col :xs="8" :sm="6" :md="7" :lg="7" :xl="1"><div class="grid-content bg-purple-light"></div></el-col>
      </el-row>
    </div> 
  </template>
  
  <script>
  import { BarcodeReader } from 'dynamsoft-javascript-barcode'
  import {store} from "../store"
  export default {  
    name: 'ImgDecode',
    data() {
      return {
    
        pReader: null,
        
      }
    },
    computed:{
      List(){
        return store.state.imeis
      }
    },
    methods: {



      push_barcode(code){
        store.dispatch('pushNewBar',{id:code,exst:''})

          // this.bars_array.push({ code:code, status:''  })
      },
      async decodeImg(e) {
        try {
          const reader = await (this.pReader = this.pReader || BarcodeReader.createInstance());
          let results = await reader.decode(e.target.files[0]);
          for (let result of results) {
                this.push_barcode(result.barcodeText)
                // alert(result.barcodeText);
          }
          if (!results.length) { this.push_barcode('IMEI не найдено'); }
        } catch (ex) {
          let errMsg;
          if (ex.message?.includes("Нет подключения к сети")) {
            errMsg = "Не удалось подключить соединение с сервером. Пожалуйста, проверьте подключение к сети.";
          } else {
            errMsg = ex.message||ex;
          }
          console.error(errMsg);
          alert(errMsg);
        }
        e.target.value = '';
      },

     

    },
    async beforeDestroy() {
      if (this.pReader) {
        (await this.pReader).destroyContext();
        console.log('ImgDecode Component Unmount');
      }
    }
  
  
   
  
  }
  </script>
  
  <style scoped>
  .ImgDecode {
    width: 100%;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    
  }
#dropzone{
  width: 100%;
    height: 300px;
    border: 2px dashed gray;
    display: flex;
    align-items: center;
    justify-content: center;
}

input[type='file'] {
  width: 400px;
  height: 336px;
  opacity:0;    
  position: absolute;
}
h2{
  display: flex;
  position: absolute;
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