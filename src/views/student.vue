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
                        <tinymce id="textEditor" user="student" v-if="ajaxFinished" v-bind:content="content" v-on:change="textEdited" ></tinymce>
                    </div>
                </div>
            </div>

        </div>

        <div class="col-lg-6">
          <rubrica v-if="ajaxFinished" type="student" v-bind:content="rubrica" ></rubrica>
            
            <!-- <div class="ibox float-e-margins">
                <div class="ibox-title">
                    <h5>Rubrica</h5>
                </div>
                <div class="ibox-content">
                    
                   <div class="row ibox-content"> 
                        <table >
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Puntos</th>
                                    <th>Condición</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(condicion,index) in rubrica" v-bind:key="index">
                                    <td>
                                        <i v-if="condicion.value" class="fa fa-check" aria-hidden="true"></i>
                                        <i v-else class="fa fa-times" aria-hidden="true"></i>
                                    
                                    </td>

                                    <td>{{index + 1}}.- </td>
                                    <td><b>{{condicion.pts}}pts</b></td>
                                    <td>{{condicion.txt}}</td>
                                    
                                </tr>
                            </tbody>
                            <label><b>Total: {{totalPoints}} pts</b></label>
                        </table>
                    </div> 
                </div>
            </div> -->
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

            getEjer: function(){


                var component = this
                var rubo = []
                  // console.log($)
                  $.ajax({
                        type: "GET",
                        url: 'http://localhost:3000/ejercicio/1',
                        success: function (data) {
                            
                            component.content = data.respuesta;
                            component.instruccion = data.content;
                            component.rubrica = data.rubrica ? JSON.parse(data.rubrica) : []
                            
                                                          
                        },
                        complete:()=>{
                              component.ajaxFinished = true
                        }
                         
                  });
                
            },
            patchEjercicio: function(){


                var component = this
                // var rubo = []
                  // console.log($)
                  $.ajax({
                        type: "PATCH",
                        url: 'http://localhost:3000/ejercicio/1',
                        data: {
                            // op: "replace",
                            respuesta: component.content,                            
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
            // this.getEjercicio();
            this.getEjer();
      }
            
}
</script>
<style scoped>
</style>
