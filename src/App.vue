<template>
  <div id="app">
   <el-container>
    <el-header>
      <el-row>
        <el-col :span="6">
          lasd
        </el-col>

        <el-col :span="12" style="display: flex; justify-content: space-evenly;">
          <router-link to="/">Главная</router-link>
          <router-link v-if="user!=null" to="/table">Table</router-link> 
        </el-col>

        <el-col :span="6">
          <router-link to="/auth">Вход</router-link>
          <button @click="signout">выйти</button>
        </el-col>
        

      </el-row>
    </el-header>
    
    <el-main>
      <router-view/>
    </el-main>

   <el-footer>
    footer
   </el-footer>
   </el-container>

  </div>
</template>

<script>
import {store} from './store'
export default{
  data(){
    return{

    }
  },
  computed:{
    user(){
      return store.state.user
    },
  },
  methods:{
    signout(){
            store.dispatch('signout')
            this.$router.push('/')
          },
    
  }
}
</script>

<style>
@import url(./style.css);
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

</style>