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

    <div class="wrapper wrapper-content animated fadeIn">
      <div class="row">
        <div class="col-lg-6">
          <tinymce id="textEditor" v-if="ajaxFinished" v-bind:content="content" v-on:change="textEdited"  user="teacher"></tinymce>
        </div>
        <div class="col-lg-6 bg-white" >

          <div class="ibox float-e-margins">
              <div class="ibox-title">
                <h5>Vista Previa</h5>
              </div>

              <div class="ibox-content">
                <div v-html="content">
                </div>
              </div>

              <div class="ibox-content">
                <div class="text-center"  >
                  <button class="btn rounded-2 font-size-19 mb-5 px-5" v-for='btn in buttons' v-on:click='animatedDiv(btn.id,btn.ann,btn.color)' > {{btn.text}} </button>
                </div>
              </div>
          </div>

            <!--<input id="btn2" type="button" value="Subtract" />   -->


            

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
                  rubrica: [],
                  buttons: [],
                  ajaxFinished: false,
            }
      },

      components:{
            "tinymce" : require('../components/comments.vue').default,
            "rubrica" : require('../components/rubrica.vue').default
            },

      methods:{
            textEdited: function (text,id,name,anim,color) {
                  this.content = text
                  this.buttons.push({id: id,text:name, ann:anim, color:color})
            },
            animatedDiv: function (id,animation, color){
              if (animation=='subrayar'){
                //console.log('subrayar'+id+animation+color);
                var atr = "background-position";

                 $('span#'+id).css({
                    "background-image": "linear-gradient(to right, #ffffff 50%," + color +" 50%)",
                    'background-position': '-100%',

                });

                setTimeout(function(){
                  $('span#'+id).css(atr, 0);
                }, 3000);

              }else if (animation=='underline'){
                console.log('underline');
              }else {
                $('span#'+id).removeClass().addClass(animation + ' animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
                    $(this).removeClass();
                });
              }
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
            },
            patchEjercicio: function(){


                var component = this
                // var rubo = []
                  console.log(component.content)
                  $.ajax({
                        type: "PATCH",
                        url: 'http://localhost:3000/ejercicio/1',
                        data: {
                            // op: "replace",
                            respuesta: component.content,
                            rubrica: JSON.stringify(component.rubrica),
                            
                            
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