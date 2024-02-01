import Vue from 'vue'
import Vuex from 'vuex'
import { vuexfireMutations, firestoreAction } from 'vuexfire'
import { db } from './db'
import firebase from 'firebase/app'

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        imei:[],  // переменные , данные , состояние 
        bars_array:[], //сканированные imei
    },
    mutations: {
        ...vuexfireMutations,  // мутации изменяют state если происходят action
        set_bars(state, data){
           state.bars_array.push(data)
          
        },
        set_exst(state,id){
            state.bars_array.filter((n)=>{ return n.id.match(id)  })[0].exst = true
        }
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

       
       initFirebase(){
        //  const firebaseApp =
          firebase.initializeApp({
            apiKey: "AIzaSyAl1xl6-9BNdpAc_FuYeIAq1zJjJHAs89I",
            authDomain: "list-imei.firebaseapp.com",
            projectId: "list-imei",
            storageBucket: "list-imei.appspot.com",
            messagingSenderId: "975717760165",
            appId: "1:975717760165:web:361311fb63577481a1214c",
            measurementId: "G-NCKFSDY13W"
          });
        },
    }
})


store.dispatch('bindZag')
store.dispatch('bindGL')
store.dispatch('bindTeachers')
