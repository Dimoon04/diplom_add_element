<template>
  <div id="app">
    
    <HeaderUi></HeaderUI>
    <Decoder
      style="margin-top: 40px;"
    ></Decoder>
    <Bottom></Bottom>
  </div>
</template>

<script>

import Decoder from './components/Decoder.vue'
 import HeaderUi from './components/HeaderUi.vue'
 import Bottom from './components/BottomUi.vue'
export default {
  name: 'App',
  components:{
    HeaderUi,
    Decoder,
    Bottom
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
