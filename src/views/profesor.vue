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
      <div class="col-lg-2 p-md">
        <button v-on:click="saveEx" type="button" class="btn btn-success "><i class="fa fa-upload"></i>&nbsp;&nbsp;
            <span class="bold">Guardar</span>
        </button>
      </div>
    </div>

    <div class="wrapper wrapper-content animated fadeIn">
      <div class="row">
        <div class="col-lg-6">
          <tinymce v-bind:content="content" v-on:change="textEdited" ></tinymce>
        </div>
        <div class="col-lg-6">
          <rubrica v-bind:content="rubrica"></rubrica>
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

// import '../../source_page/js/jquery-3.1.1.min.js'
/* eslint-disable */
export default {
      data(){
            return {
                  content:'static',
                  rubrica: [{pts: 10 , txt: "test de parent to child"}]
            }
      },

      components:{
            "tinymce" : require('../components/tinymce.vue').default,
            "rubrica" : require('../components/rubrica.vue').default
            },

      methods:{
            textEdited: function (text) {
                  this.content = text
            },

            saveEx : function() {
                  var component = this
                  console.log("deleting data")
                  //delete previous exercise
                  $.ajax({
                        type: 'DELETE',
                        url: 'http://localhost:3000/ejercicio/1',
                        success: function (data) {
                              $.ajax({
                                    type: 'POST',
                                    url: 'http://localhost:3000/ejercicio',
                                    data: {id:1, content: component.content},
                                    success: function (data) {
                                          console.log('data posted');      
                                    }
                              });
                        }
                  });
                  
            },

            getRubrica: async function(){
                  // var $ = require('../../source_page/js/jquery-3.1.1.min.js')
                  var component = this
                  // console.log($)
                  $.ajax({
                        dataType: "json",
                        url: 'http://localhost:3000/ejercicio?id=1',
                        success: function (data) {
                              console.log(data);
                              component.content = data[0].content
                        }
                  });
            }
      },

      

      created: async function () {
            this.getRubrica();
      }
            
}
</script>
<style scoped>
</style>
