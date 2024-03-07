<template>
    <div>
        <el-col v-if="user==null">
        <el-input v-model="authInput.txtEmail" class="w3-margin" placeholder="Email"></el-input>
        <el-input v-model="authInput.txtPassword" class="w3-margin" placeholder="Пароль" type="password"></el-input>
        <el-button @click="login()" type="success">Войти</el-button>
        <el-button @click="signIn()" type="warning">Зарегистрироваться</el-button>
        <hr>
      </el-col>
      <span v-if="user!=null">
         <h4>Выполнен вход с email: {{ user.email }} </h4>
         

      </span>
    </div>
</template>

<script>
import {store} from '../store'
    export default{
        data(){
            return{
               authInput:{
                txtEmail:'',
                txtPassword:''
               }
            }
        },
        computed:{
          user(){ return store.state.user }
        },

        methods:{
          
            async login(){
      try {
        await store.dispatch('login', { email:this.authInput.txtEmail, password:this.authInput.txtPassword })
        if (this.user!=null){
          
            this.$router.push('/table')
        }
      } catch (error) {
        console.log(error.code)
        if (error.code=='auth/internal-error'){
          this.$message({
              showClose: true,
              message: 'Email или пароль неверен!',
              type: 'warning'
            });
        }
      }
     
    },
    
  }
}
</script>

<style lang="scss" scoped>

</style>