<template>
  <div class="helloWorld">
    
    <!-- <div>
      <button
        class="btn-video" :style="{ 
          backgroundColor: bShowScanner ? '#75c3ff' : '#343a40',
          color: bShowScanner ? '#212529' : 'gray',
          fontWeight: bShowScanner ? 'bold' : 'normal',
          textDecoration: bShowScanner ? 'underline' : ''
          }" 
          @click="showScanner">Камера</button> 
      <button 
        class="btn-img" :style="{ 
          backgroundColor: bShowImgDecode ? '#75c3ff' : '#343a40',
          color: bShowScanner ? 'gray' : '#212529',
          fontWeight: bShowScanner ? 'normal' : 'bold',
          textDecoration: bShowScanner ? '' : 'underline'
          }" @click="showImgDecode">Фото</button>
    </div> -->
    <div class="container">
      <!-- <VideoDecode v-if="bShowScanner"></VideoDecode> -->
      <ImgDecode ></ImgDecode>
    </div>
    <div class="imei_result" v-if="bars_array.length > 0">
      <table class="w3-table w3-striped">
         <tr v-for="(b,index) in bars_array" :key="index">
              <td class="imei_out" :style="{color: b.exst ? 'red' : ''}">
                {{ b.id }} <br>
                <div v-if="b.exst">
                  <button v-on:click="filteredList" class="btn-info"> Подробнее</button>
                  <!-- <div v-if="">
                    
                  </div> -->
                </div>
              </td>
              
         </tr>
      </table>
    </div>


    <el-drawer
  title="I am the title"
  :visible.sync="drawer" size="50%"
  :with-header="false">
    <h2>{{ phoneInfo.color }}</h2>
    <h2>{{ phoneInfo.phoneName }}</h2>
</el-drawer>


<!-- <el-row :gutter="10">
  <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1"><div class="grid-content bg-purple"></div></el-col>
  <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11"><div class="grid-content bg-purple-light"></div></el-col>
  <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11"><div class="grid-content bg-purple"></div></el-col>
  <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1"><div class="grid-content bg-purple-light"></div></el-col>
</el-row> -->








  </div>
</template>

<script>
import "../dbr"; // import side effects. The license, engineResourcePath, so on.
import { BarcodeReader } from "dynamsoft-javascript-barcode";
// import VideoDecode from "./VideoDecode.vue";
import ImgDecode from './ImgDecode.vue'
import {store} from '../store'

export default {
  name: "HelloWorld",
  data() {
    return {
      drawer:false,
      // bShowScanner: false,
      bShowImgDecode: true,
      list: store.state.imei, // получение доп информации - подробнее
      phoneInfo:''
     
    };
  },
  computed:{
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
    // VideoDecode,
     ImgDecode
  },
  methods: {
    filteredList(){
      this.drawer = true
      this.bars_array.forEach(b => {
        if (b.exst === true) {
          let document = this.list.find((doc) => {
            return doc.imei === b.id;
          });
          console.log(document.color, " ", document.phoneName)
          this.phoneInfo = document
        }
      });
    } 
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  font-size: 1.5em;
}

button {
  font-size: 1.5rem;
  margin-bottom: 2vh;
  border: none;
}

.btn-info{
  border-radius: 5px;
  background-color: #455a64;
  color: #75c3ff;
  width: 80px;
  height: 24px;
  font-size: small;
  text-decoration: none;
  margin: 0;
}


.helloWorld {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}
.container {
  margin: 2vmin auto;
  text-align: center;
  font-size: medium;
  width: 100%;
}

.imei_result{
  margin: 2vmin auto;
  text-align: center;
  font-size: medium;
  width: 600px;
  border: 2px rgb(117, 195, 255) solid;
  border-radius: 10px;
}
.imei_out{
  font-size: 20px;
  text-align: center;
  justify-content: center;
}





</style>
