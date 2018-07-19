<template>
  <div>
    <div class="row wrapper border-bottom white-bg page-heading">
      <div class="col-lg-10">
        <h2>Redactar ejercicio</h2>
        <ol class="breadcrumb">
          <li>
            <a href="index.html">Home</a>
          </li>
          <li>
            <a>UI Elements</a>
          </li>
          <li class="active">
            <strong>Panels</strong>
          </li>
        </ol>
      </div>
      <!--
      <div class="col-lg-2 p-md">
        <button v-on:click="saveEx" type="button" class="btn btn-success "><i class="fa fa-upload"></i>&nbsp;&nbsp;
            <span class="bold">Guardar</span>
        </button>
      </div>
      -->
    </div>

    <div class="wrapper wrapper-content animated fadeIn">
      <div class="row">
        <div class="col-lg-6">
          <tinymce id="textEditor" v-if="ajaxFinished" v-bind:content="content" v-on:change="textEdited" ></tinymce>
        </div>
        <div class="col-lg-6">
          <!--
          <rubrica v-if="ajaxFinished" v-bind:content="rubrica" v-on:change="rubricaEdited" ></rubrica>-->
        </div>
        <div class="col-lg-12">
         
        </div>
        <div class="col-lg-12">
         
        </div>
      </div>

      <div class="row">
        
      </div>

    </div>
  </div>
</template>

<script>

// import swal from '../../source_page/js/plugins/sweetalert/sweetalert.min.js'
import swal from 'sweetalert';


/* eslint-disable */
export default {
      data(){
            return {
                  content:'static',
                  rubrica: [],
                  ajaxFinished: false,
            }
      },

      components:{
            "tinymce" : require('../components/comments.vue').default,
            "rubrica" : require('../components/rubrica.vue').default
            },

      methods:{
            textEdited: function (text) {
                  this.content = text
            },

            rubricaEdited: function (text) {
                  console.log(text)
                  this.rubrica = text
            },

            saveEx : function() {
                  var component = this
                  $.ajax({
                        type: 'DELETE',
                        url: 'http://localhost:3000/ejercicio/1',
                        complete: function (data) {
                              $.ajax({
                                    type: 'POST',
                                    url: 'http://localhost:3000/ejercicio',
                                    data: {
                                          id:1, 
                                          content: component.content,
                                          rubrica: JSON.stringify(component.rubrica)
                                          },
                                    success: function (data) {
                                          // console.log('data posted'); 
                                          swal("Guardado!", "Ejercicio guardado correctamente!", "success");     
                                    }
                              });
                        }
                  });
                  
            },

            getEjercicio: async function(){
                  // var $ = require('../../source_page/js/jquery-3.1.1.min.js')
                  var component = this
                  // console.log($)
                  $.ajax({
                        dataType: "json",
                        url: 'http://localhost:3000/ejercicio?id=1',
                        success: function (data) {
                              // console.log(JSON.parse(data));
                              
                              if(data[0] ){
                                    component.content = data[0].content ? data[0].content : ''
                                    component.rubrica = data[0].rubrica ? JSON.parse(data[0].rubrica) : []
                              }else{
                                    component.content =  ''
                                    component.rubrica = []
                              }

                              
                        },
                        complete:()=>{
                              component.ajaxFinished = true
                        }
                  });
            }
      },

      

      created: async function () {
            this.getEjercicio();
      }
            
}
</script>
<style scoped>
</style>
