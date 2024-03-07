<template>
    <div class="parent">
      <div class="container">
        <!-- <ImgDecode ></ImgDecode> -->
        <el-row :gutter="10">
          <el-col :xs="3" :sm="4" :md="7" :lg="7" :xl="1"><div class="grid-content "></div></el-col>
          <el-col :xs="18" :sm="16" :md="10" :lg="10" :xl="11">
            <div class="center_column">
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
              
                <!-- <el-button @click="podr()" v-if="bars_array.length > 0" class="btn_info">Подробнее</el-button> -->
                <div v-show="staate" class="imei_result">
                  <div v-for="(q, index) in phoneInfo" :key="index">
                    <div v-if="Object.keys(q).length > 1">
                      
                      <p>{{ q.phoneName }}</p>
                      <p>{{ q.color }}</p>
                      <p>{{ q.opisanie }}</p>
                    </div>
                    
                  </div>
                  <div v-if="Object.keys(phoneInfo).length < 1">
                      
                      <p>Устройство не обнаружено.</p>
                    </div>
                </div>
                        
  
              </div>
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
    
    data() {
      return {
        pReader: null,
        drawer:false,
        bShowImgDecode: true,
        list: store.state.imei, // получение доп информации - подробнее
        phoneInfo:[],
        staate: false
      }
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
  
      podr(){
        if(this.staate == false){
          this.staate = true
        }
        else{
          this.staate = false
        }
         
      },
  
      push_barcode(code){
          store.dispatch('pushNewBar',{id:code,exst:''})
  
            // this.bars_array.push({ code:code, status:''  })
      },
  
      async decodeImg(e) {
  
          try {
            const reader = await (this.pReader = this.pReader || BarcodeReader.createInstance());
            let results = await reader.decode(e.target.files[0]);
            if(results){ store.commit('clearBarsArray') }
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
  
  
  
      // filteredList(){
      //   this.drawer = true
      //   const newarr = []
      //   const sas = 'asdasasdsa'
      //   this.bars_array.forEach(b => {
      //     if (b.exst === true) {
      //       let document = this.list.find((doc) => doc.imei === b.id);
      //       // console.log(document.color, "filteredList ", document.phoneName)
      //       if (document){
      //         newarr.push(document)
      //       }
      //     }else{
      //       this.phoneInfo = "Устройство не обнаружено."
      //       console.log("false", this.phoneInfo)
      //     }
  
      //   })
      //   this.phoneInfo = newarr
      // },
      filteredList(){
        this.drawer = true
        this.phoneInfo = [];
        // this.filteredPhones = [] // Создаем пустой массив для хранения отфильтрованных устройств
        this.bars_array.forEach(b => {
          let document = this.list.find((doc) => doc.imei === b.id);
          if (b.exst === true) {
            console.log(document.color, "filteredList ", document.phoneName)
            this.phoneInfo.push(document); // Добавляем обнаруженное устройство в массив filteredPhones
            this.podr()
          } else {
            console.log("Устройство не обнаружено.")
            this.podr()
            }
        });
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
          this.staate = false
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
          this.filteredList()
        },
    },
    watch:{
      bars_array(){
        this.checkImeis()
        // this.filteredList()
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
  
  
  
  </style>