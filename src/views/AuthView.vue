<template>
  <div class="home">
 <LogIn/>

 <div>если нет акканута, <router-link to="/about">Зарегистрироваться</router-link> </div>

 <!-- <SignIn/> -->

  </div>
</template>

<script>

import LogIn from '@/components/LogIn.vue';
// import SignIn from '@/components/SignIn.vue';

export default {
  components: {
    LogIn
  }
}
</script>
