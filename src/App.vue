<template>
  <div id="app">
    
    <HeaderUi></HeaderUI>
    <Decoder
      style="margin-top: 40px;"
    ></Decoder>
    <UV></UV>
  </div>
</template>

<script>

import Decoder from './components/Decoder.vue'
 import UV from './components/UslovView.vue'
 import HeaderUi from './components/HeaderUi.vue'
export default {
  name: 'App',
  components:{
     HeaderUi,
    Decoder,
     UV
  },
  data(){
    return {
     
    }
  }
}

</script>

<style>
#app {
  
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
