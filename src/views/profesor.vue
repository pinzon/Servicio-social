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
        <button type="button" class="btn btn-success "><i class="fa fa-upload"></i>&nbsp;&nbsp;
            <span class="bold">Guardar</span>
        </button>
      </div>
    </div>

    <div class="wrapper wrapper-content animated fadeIn">
      <div class="row">
        <div class="col-lg-6">
          <tinymce v-bind:content="content"></tinymce>
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
/* eslint-disable */
  export default {
    data:function (params) {
        return {
          content:'Test de ejercicio',
          rubrica: [{pts: 10 , txt: "test de parent to child"}],
        }   
    },

    components:{
      "tinymce" : require('../components/tinymce.vue').default,
      "rubrica" : require('../components/rubrica.vue').default
    },

    methods:{
      saveEx : function() {
        
      },

      getText:function() {
        
      }
    }

  }
</script>
<style scoped>
</style>
