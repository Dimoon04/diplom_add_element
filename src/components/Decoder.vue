<template>
  <div class="parent">
    <div class="container">
      <!-- <ImgDecode ></ImgDecode> -->
      <el-row :gutter="10">
        <el-col :xs="3" :sm="4" :md="7" :lg="7" :xl="1"><div class="grid-content "></div></el-col>
        <el-col :xs="18" :sm="16" :md="10" :lg="10" :xl="11">
          <div class="ImgDecode">
            <div class="description"> 
              <img id="uploadIcon" src="../assets/upload.png" alt=""><br><br>
              <p>Перетащите изображение сюда или <b>нажмите чтобы загрузить</b>.</p>
            </div>

            <div id="dropzone">
              <input type="file" @change="decodeImg" title="">
            </div>
          </div>





          <div class="imei_result" v-if="bars_array.length > 0">
            <div class="table_out">  
              <table class="w3-table w3-striped">
                <tr v-for="(b,index) in bars_array" :key="index">
                      <td class="imei_out">
                        {{ b.id }}  <br>
                      </td> 
                </tr>
              </table>
            </div>
            <!-- <button v-on:click="filteredList" class="btn_info"> Подробнее</button> -->

            <!-- <el-collapse accordion v-for="i in filteredList" :key="i"> -->
            

          </div>

          

          <div >
            <button v-on:click="filteredList" class="btn_info"> Подробнее</button>
            
            <div v-for="(w, index) in bars_array" :key="index">
            {{ w }}
            </div>
            


            <el-drawer
              title="I am the title"
              :visible.sync="drawer" size="50%"
              :with-header="false">
                <h2>{{ phoneInfo }}</h2>
                
            </el-drawer>
          </div>
          
        </el-col>
        <el-col :xs="3" :sm="4" :md="7" :lg="7" :xl="1"><div class="grid-content "></div></el-col>
      </el-row>
    </div>  
  </div>
</template>

<script>
import "../dbr"; // import side effects. The license, engineResourcePath, so on.
import { BarcodeReader } from "dynamsoft-javascript-barcode";
import {store} from '../store'


export default {
  name: "HelloWorld",
  data() {
    return {
      pReader: null,
      drawer:false,
      bShowImgDecode: true,
      list: store.state.imei, // получение доп информации - подробнее
      phoneInfo:[]

     
    };
  },
  computed:{
    List(){
        return store.state.imei
    },
    
    bars_array(){
      return store.state.bars_array
    }
  },
  async mounted() {
    //Load the library on page load to speed things up.
    try {
      await BarcodeReader.loadWasm();
    } catch (ex) {
      let errMsg;
      if (ex.message?.includes("network connection error")) {
        errMsg = "Failed to connect to Dynamsoft License Server: network connection error. Check your Internet connection or contact Dynamsoft Support (support@dynamsoft.com) to acquire an offline license.";
      } else {
        errMsg = ex.message||ex;
      }
      console.error(errMsg);
      alert(errMsg);
    }
    
  },
  components: {
    
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



    filteredList(){
      this.drawer = true
      const newarr = []
      this.bars_array.forEach(b => {
        if (b.exst === true) {
          let document = this.list.find((doc) => doc.imei === b.id);
          // console.log(document.color, "filteredList ", document.phoneName)
          if (document){
            newarr.push(document)
          }
        }else{
          this.phoneInfo = "Устройство не обнаружено."
          console.log("false", this.phoneInfo)
        }

      })
      this.phoneInfo = newarr
    },
    // filteredList(){
    //   this.drawer = true
    //   this.bars_array.forEach(b => {
    //     if (b.exst === true) {
    //       let document = this.list.find((doc) => {
    //         return doc.imei === b.id;
    //       });
    //       console.log(document.color, "filteredList ", document.phoneName)
    //       this.phoneInfo = document
    //     }else{
    //       this.phoneInfo = "Устройство не обнаружено."
    //     }
    //   });
    // },
    
    checkImeis() {
        let imei = store.state.imei
        let bars_array = store.state.bars_array
          for (let b in imei){
            for (let i in bars_array){
              if (imei[b].imei==bars_array[i].id){
                console.log('есть exst')
                store.commit('set_exst',bars_array[i].id)
                
              }else{
                console.log('non')
                
              }
            }
            
          }
      },
  },
  watch:{
    bars_array(){
      console.log("вызов")
      this.checkImeis()
    }
  },
  
  async beforeDestroy() {
      if (this.pReader) {
        (await this.pReader).destroyContext();
        console.log('ImgDecode Component Unmount');
      }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>





.parent{
  margin: 0 !important;
}
.container {
  margin: 2vmin auto;
  text-align: center;
  width: 100%;
}

.imei_result{
  margin: 2vmin auto;
  width: 100%;
  display: inline-block;
  border: 2px rgb(117, 195, 255) solid;
  border-radius: 10px;
  animation: ani 1s forwards;
  justify-content: center;
}
@keyframes ani {
  0% {opacity: 0;}
  100% {opacity: 1;}
}
.table_out{
  display: flex;
  justify-content: center;
}
.imei_out{
  font-size: 2.5vmin;
  text-align: center;
  justify-content: center;
}
.btn_info{
  border-radius: 5px;
  background-color: #212529;
  border: #75c3ff 1px solid;
  color: #75c3ff;
  width: 100%;
  height: 4vmin;
  font-size: 2.5vmin;
  text-decoration: none;
}
.btn_info:hover{
  cursor: pointer;
}
table{
  text-align: center;
}


p{
  margin: 0;
}






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
  height: 200px;
  border: 2px dashed gray;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.01s;
}
#dropzone:hover{
  border: 2px dashed #212529;
  background-color: #d6edff;
  transition: 1s;
  
}
#uploadIcon{
  margin-top: 20px;
  width: 7.5vmin;
}

input[type='file'] {
  width: 100%;
  height: 200px;
  opacity:0;    
  position: absolute;
}
input[type='file']:hover {
  width: 100%;
  height: 200px;
  opacity:0;    
  position: absolute;
  cursor: pointer;
  
}
.description{
  font-size:2vmin;
  justify-content: center;
  margin: 0;
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
