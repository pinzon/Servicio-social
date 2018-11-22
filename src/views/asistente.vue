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
				<!-- <button v-on:click="patchEjercicio" type="button" :class="{'btn':true, 'btn-success': !saved, 'btn-primary': saved }">
				<i v-if="saved" class="fa fa-check"></i>
				<span v-if="saved" class="bold">Guardado</span>
				<i v-if="!saved" class="fa fa-upload"></i>
				<span v-if="!saved" class="bold">Guardar</span>
			</button> -->
				<save-button @click="patchEjercicio" :saved="saved"></save-button>

			</div>
		</div>

		<div class="wrapper wrapper-content animated fadeIn">

			<div class="row">
				<div class="col-xl-4 col-lg-6  col-md-6">
					<div class="tabs-container">
						<ul class="nav nav-tabs">
							<li class="active">
								<a data-toggle="tab" href="#tab-1" aria-expanded="true">
									Ejercicio
								</a>
							</li>
							<li class="">
								<a data-toggle="tab" href="#tab-2" aria-expanded="false">
	  								Evaluación
	  							</a>
							</li>
						</ul>
						<div class="tab-content ">
							<div id="tab-1" class="tab-pane active">
								<div class="panel-body limit-height">
									<span v-html="instruccion"></span>
								</div>
							</div>
							<div id="tab-2" class="tab-pane">
								<div class="panel-body">
									<rubrica v-if="ajaxFinished" type="asistant" v-bind:content="rubrica" v-on:change="rubricaEdited"></rubrica>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div class="col-xl-8 col-lg-6 col-md-6">
					<!-- <rubrica v-if="ajaxFinished" type="asistant" v-bind:content="rubrica"  ></rubrica> -->
					<h3>Comenta el trabajo del estudiante para una mejor retroalimentación</h3>
					<tinymce id="textEditor" v-if="ajaxFinished" v-bind:readonly="true" user="asistant" v-bind:content="content" v-on:change="textEdited"></tinymce>
				</div>


			</div>



		</div>
	</div>
</template>

<script>
	/* eslint-disable */
	export default {
		data() {
			return {
				instruccion: "",
				puntos: 0,
				content: 'static',
				rubrica: [],
				ajaxFinished: false,
				saved: false,
			}
		},

		components: {
			"tinymce": require('../components/tinymce.vue').default,
			"rubrica": require('../components/rubrica.vue').default,
			'save-button': require('../components/saveButton.vue').default

		},

		methods: {
			textEdited: function(text) {
				this.saved = false
				this.content = text
			},

			rubricaEdited: function(text) {
				this.saved = false
				this.rubrica = text
			},

			getEjer: function() {


				var component = this
				var rubo = []
				// console.log($)
				$.ajax({
					type: "GET",
					url: 'http://142.93.52.192:81/ejercicio/1',
					crossDomain: true,
					success: function(data) {

						component.content = data.respuesta;
						component.instruccion = data.content;
						component.rubrica = data.rubrica ? JSON.parse(data.rubrica) : []
					},
					complete: () => {
						component.ajaxFinished = true
					}

				});

			},
			patchEjercicio: function() {
				var component = this
				$.ajax({
					type: "PATCH",
					url: 'http://142.93.52.192:81/ejercicio/1',
					crossDomain: true,
					data: {
						// op: "replace",
						respuesta: component.content,
						rubrica: JSON.stringify(component.rubrica),


					},

					success: function(data) {
						component.saved = true

					},
					complete: () => {
						console.log('Post completado');
					}
				});
			}
		},
		computed: {
			totalPoints: function() {
				if (this.rubrica.length > 0) {
					var total = 0
					this.rubrica.forEach(ele => {
						total += ele.value ? parseInt(ele.pts) : 0
					});
					return total
				}

				return 0;
			}
		},
		created: async function() {
			this.getEjer();
		}

	}
</script>

<style scoped>
	.limit-height {
		height: 70vh;
		overflow-y: auto;
	}
</style>
