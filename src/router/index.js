import Vue from 'vue'
import VueRouter from 'vue-router'
import GlavDecoder from '../views/GlavDecoder.vue'
import firebase from 'firebase/app'
import {store} from '../store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'glav',
    component: GlavDecoder
  },
  {
    path: '/auth',
    name: 'auth',
    component: () => import( '../views/AuthView.vue')
  },
  {
    path: '/table',
    name: 'table',
    component: () => import( '../views/TablePhone.vue')
  }
]

const router = new VueRouter({
  routes
})

firebase.auth().onAuthStateChanged(function(user){
  if(user){
    localStorage.setItem('currentUser', JSON.stringify(user));
  }else{
    localStorage.removeItem('currentUser')
  }
});

window.onload = function(){
  let currentUser = localStorage.getItem('currentUser');
  if(currentUser){
    let user = JSON.parse(currentUser);
    store.commit('SET_USER', user)
  }
  router.beforeEach((to, from, next) => {
    if(to.path !== '/' && store.state.user == null) next({path: '/'})
    else next()
  })

};







export default router
