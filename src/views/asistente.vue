<template>
  <div>
    <div class="row wrapper border-bottom white-bg page-heading">
      <div class="col-lg-10">
        <h2>Calificar ejercicio</h2>
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
        <!-- <div class="col-lg-12">
            <span v-html="instruccion"></span>

            
            <button v-on:click="getEjer">Prueba</button>
        </div> -->
      <div class="row">
        <div class="col-lg-6">
            <!-- <span v-html="instruccion"></span>

            
            <button v-on:click="getEjer">Prueba</button> -->
          <!-- <tinymce id="textEditor" v-if="ajaxFinished" v-bind:content="content" v-on:change="textEdited" ></tinymce> -->
        
            <div class="ibox float-e-margins">
                <div class="ibox-title">
                    <h5>Tarea</h5>
                </div>
                <div class="ibox-content">
                    <span v-html="instruccion"></span>
                    <div class="row ibox-content">
                        <!-- <button v-on:click="patchEjercicio">Prueba</button><br> -->
                        <!-- <tinymce id="textEditor"  v-if="ajaxFinished"  v-bind:readonly="true" user="asistant"  v-bind:content="content" v-on:change="textEdited" ></tinymce> -->
                        <rubrica v-if="ajaxFinished" type="asistant" v-bind:content="rubrica"  ></rubrica>
                    </div>
                </div>
            </div>

        </div>

        <div class="col-lg-6">
          <!-- <rubrica v-if="ajaxFinished" type="asistant" v-bind:content="rubrica"  ></rubrica> -->
          <tinymce id="textEditor"  v-if="ajaxFinished"  v-bind:readonly="true" user="asistant"  v-bind:content="content" v-on:change="textEdited" ></tinymce>
            
            
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
                  instruccion: "",
                  puntos: 0,
                  content:'static',
                  rubrica: [],
                  ajaxFinished: false,
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

            // rubricaEdited: function (text) {
            //       console.log(text)
            //       this.rubrica = text
            // },

            // saveEx : function() {
            //       var component = this
            //       // console.log("deleting data")
            //       //delete previous exercise
            //       $.ajax({
            //             type: 'DELETE',
            //             url: 'http://142.93.52.192:3000/ejercicio/1',
            //crossDomain: true,
            //             complete: function (data) {
            //                   $.ajax({
            //                         type: 'POST',
            //                         url: 'http://142.93.52.192:3000/ejercicio',
            //crossDomain: true,
            //                         data: {
            //                               id:1, 
            //                               content: component.content,
            //                               rubrica: JSON.stringify(component.rubrica)
            //                               },
            //                         success: function (data) {
            //                               // console.log('data posted'); 
            //                               swal("Guardado!", "Ejercicio guardado correctamente!", "success");     
            //                         }
            //                   });
            //             }
            //       });
                  
            // },

            getEjer: function(){


                var component = this
                var rubo = []
                  // console.log($)
                  $.ajax({
                        type: "GET",
                        url: 'http://142.93.52.192:3000/ejercicio/1',
                        crossDomain: true,
                        success: function (data) {
                            
                            component.content = data.respuesta;
                            component.instruccion = data.content;
                            component.rubrica = data.rubrica ? JSON.parse(data.rubrica) : []
                            // JSON.parse(data.rubrica).forEach(rubro => {
                            //     // console.log(rubro);
                            //     rubo.push({pts:rubro.pts,txt:rubro.txt});
                            // });
                                                          
                        },
                        complete:()=>{
                              component.ajaxFinished = true
                        }
                         
                  });
                // this.instruccion = component.content;
                
            },
            patchEjercicio: function(){


                var component = this
                // var rubo = []
                  //console.log(component.content)
                  $.ajax({
                        type: "PATCH",
                        url: 'http://142.93.52.192:3000/ejercicio/1',
                        crossDomain: true,
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
      computed:{
        totalPoints: function(){
            if(this.rubrica.length > 0){
                var total = 0
                this.rubrica.forEach(ele => {
                    total+= ele.value ?  parseInt( ele.pts) : 0
                });
                    return total
            }

            return 0;
        }
      },

      

      created: async function () {
            // this.getEjercicio();
            this.getEjer();
      }
            
}
</script>
<style scoped>
</style>
