<template>
    <div>
        <h1>Регистрация</h1>
        <input type="email" name="email" placeholder="Email" v-model="email">
        <input type="password" name="Password" placeholder="Password" v-model="password">
        <el-button @Click="Login()">Зарегистрироваться</el-button>
    </div>
</template>

<script>
import firebase from 'firebase/app'
    export default{
        data(){
            return{
                email:"",
                password:"",
                initials:"",
            }
        },
        methods:{
            Login(){
                firebase
                .auth()
                .createUserWithEmailAndPassword(this.email, this.password)
                .then(
                    (user) =>{
                        console.log(user)
                    },
                    (err) =>{
                        alert(err)
                    }
                );

            }
        }
    }
</script>

<style lang="scss" scoped>

</style>