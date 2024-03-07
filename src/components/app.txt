<template>
  <div id="app">
    
    <HeaderUi></HeaderUI>
    <Decoder
      style="margin-top: 40px;"
    ></Decoder>
    <!-- <SignIn></SignIn> -->
    <Bottom></Bottom>

  </div>
</template>

<script>

import Decoder from './components/Decoder.vue'
 import HeaderUi from './components/HeaderUi.vue'
 import Bottom from './components/BottomUi.vue'
//  import SignIn from './components/SignIn.vue'
export default {
  name: 'App',
  components:{
    HeaderUi,
    Decoder,
    Bottom,
    // SignIn
  },
  data(){
    return {
     
    }
  }
}

</script>

<style>
@import url(style.css);
#app {
  
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
