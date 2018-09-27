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
        <button v-on:click="patchEjercicio" type="button" class="btn btn-success "><i class="fa fa-upload"></i>&nbsp;&nbsp;
            <span class="bold">Guardar</span>
        </button>
      </div>

    </div>
    <!--
              div class="ibox-content">
                <div v-html="content"></div>
              </div>
    -->

    <div class="wrapper wrapper-content animated fadeIn">
      <div class="row">

        <div class="col-lg-7">
          <ul class="nav nav-tabs " id="myTab" role="tablist">
            <li class="nav-item bg-white">
              <a class="nav-link active bg-white" id="editor-tab" data-toggle="tab" href="#editor" role="tab" aria-controls="editor" aria-selected="true">Editor</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" id="preview-tab" data-toggle="tab" href="#preview" role="tab" aria-controls="preview" aria-selected="false">Vista Previa</a>
            </li>
          </ul>
          <div class="tab-content" id="myTabContent">
            <div class="tab-pane active" id="editor" role="tabpanel" aria-labelledby="editor-tab">
              <tinymce id="textEditor" v-if="ajaxFinished" v-bind:content="content" v-on:textedited="textEdited"></tinymce>
            </div>
            <div class="tab-pane ibox-content" id="preview" role="tabpanel" aria-labelledby="preview-tab" v-html="content">

            </div>
          </div>
        </div>

        <div class="col-lg-5 bg-white" >
          <div class="ibox float-e-margins">
            <div class="ibox-title">
              <h5>Comentarios</h5>
            </div>
            <div class="ibox-content no-padding">
              <ul class="list-group">
                <li class="list-group-item" :key="index" v-for='(btn, index) in buttons'>
                  <span class="badge badge-success font-size-12" role="button" v-on:click='animatedDiv(btn.id,btn.ann,btn.color)'>Mostrar</span>
                  <p  style="padding-right: 15%">{{btn.text}}</p>
                </li>
              </ul>
            </div>
          </div>

        </div>
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
                  //rubrica: [],
                  buttons: [],
                  ajaxFinished: false,
            }
      },

      components:{
            "tinymce" : require('../components/comments.vue').default
            },

      methods:{
            textEdited: function (text,id,name,anim,color) {
                  this.content = text
                  this.buttons.push({id: id, text:name, ann:anim, color:color})
            },
            animatedDiv: function (id,animation, color){
              if (animation=='subrayar'){
                //console.log('subrayar'+id+animation+color);
                var atr = "background-position";
                 $('span#'+id).css({
                   "background-position": "0",
                   "background-size": "200%",
                   "transition": "all 0.4s",
                    "background-image": "linear-gradient(to right, #ffffff 50%," + color +" 50%)",
                    'background-position': '-100%',

                });
              }else if (animation=='underline'){
                var atr = "text-decoration";
                var val = '';
                $('span#'+id).css({
                    "text-decoration":"underline",
                });
              }
                setTimeout(function(){
                  $('span#'+id).css(atr, val);
                }, 3000);


                $('span#'+id).removeClass().addClass(animation + ' animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
                    $(this).removeClass();
                });
            },

            getEjercicio: async function(){
                  // var $ = require('../../source_page/js/jquery-3.1.1.min.js')
                  var component = this
                  // console.log($)
                  $.ajax({
                        dataType: "json",
                        url: 'http://142.93.52.192:81/ejercicio?id=1',
                        crossDomain: true,
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
            },
            patchEjercicio: function(){


                var component = this
                // var rubo = []
                  console.log(component.content)
                  $.ajax({
                        type: "PATCH",
                        url: 'http://142.93.52.192:81/ejercicio?id=1',
                        crossDomain: true,
                        data: {
                            // op: "replace",
                            respuesta: component.content,
                            parts: JSON.stringify(component.buttons),


                        },

                        success: function (data) {
                            // console.log(data);
                            swal("Guardado!", "Ejercicio guardado correctamente!", "success");

                        },
                        complete:()=>{
                            console.log('Post completado');

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
