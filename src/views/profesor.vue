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
      <div class="col-lg-2">

      </div>
    </div>

    <div class="wrapper wrapper-content animated fadeIn">
      <div class="row">
        <div class="col-lg-6">
          <tinymce></tinymce>
        </div>
        <div class="col-lg-6">
          <rubrica></rubrica>
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
    components:{
      "tinymce" : require('../components/tinymce.vue').default,
      "rubrica" : require('../components/rubrica.vue').default

    }
  }
</script>
<style scoped>
</style>
