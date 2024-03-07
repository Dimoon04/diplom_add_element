import Vue from 'vue'
import Vuex from 'vuex'
import { vuexfireMutations, firestoreAction } from 'vuexfire'
import { db } from './db'
import firebase from 'firebase/app'
import "firebase/auth"

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        imei:[],  // переменные , данные , состояние 
        bars_array:[], //сканированные imei
        user:null,

    },
    mutations: {
        ...vuexfireMutations,  // мутации изменяют state если происходят action
        set_bars(state, data){
           state.bars_array.push(data)
          
        },
        set_exst(state,id){
            state.bars_array.filter((n)=>{ return n.id.match(id)  })[0].exst = true
        },
        clearBarsArray(state) {
            state.bars_array = [];
        },
        SET_USER(state, user) {
           state.user = user
        },
    },
    actions: {
        bindZag: firestoreAction(({ bindFirestoreRef }) => {
            return bindFirestoreRef('imei', db.collection('list_imei'))
        }), // 
        bindGL: firestoreAction(({ bindFirestoreRef }) => {
            return bindFirestoreRef('g40b', db.collection('g40b'))
        }), // 
        bindTeachers: firestoreAction(({ bindFirestoreRef }) => {
            return bindFirestoreRef('teachers', db.collection('teachers'))
        }), // 

        addUser: firestoreAction((context, payload) => {
            return db.collection('g40b').add(payload)
        }),
        saveR: firestoreAction((context, payload) => {
            return db.collection('rezult_zagadki').add(payload)
        }),
        delUser: firestoreAction((context, payload) => {
            db.collection('g40b')
                .doc(payload)
                .delete()
        }),
        updateG: firestoreAction((context, {id, doc}) => {
            db.collection('g40b')
                .doc(id)
                .update(doc)
        }),
        pushNewBar(context,payload){
           context.commit('set_bars',payload)
        },
        async login(context,{email, password}){
            console.log(email)
            console.log(password)
            const promise = await firebase.auth().signInWithEmailAndPassword(email, password);
            try{
                if (promise){
                store.commit('SET_USER', promise.user)
                } else{
                throw new Error('error')
                }
            }catch(error){
                console.log(error)
            }
          },
        async signout(){
            firebase.auth().signOut();
            store.commit('SET_USER', null)
        }
    }
})


store.dispatch('bindZag')
store.dispatch('bindGL')
store.dispatch('bindTeachers')
