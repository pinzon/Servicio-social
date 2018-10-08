<template>
	<div>
		<div class="row wrapper border-bottom white-bg page-heading">
			<div class="col-lg-10">
				<h2>Resolver ejercicio</h2>
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
				<button v-on:click="patchEjercicio" type="button" :class="{'btn':true, 'btn-success': !saved, 'btn-primary': saved }">
									<i v-if="saved" class="fa fa-check"></i>
									<span v-if="saved" class="bold">Guardado</span>
									<i v-if="!saved" class="fa fa-upload"></i>
									<span v-if="!saved" class="bold">Guardar</span>
								</button>
			</div>
		</div>

		<div class="wrapper wrapper-content animated fadeIn">

			<div class="row">

				<div class="col-lg-6">
					<h3>Redacta tu respuesta</h3>
					<tinymce id="textEditor" user="student" v-if="ajaxFinished" v-bind:content="content" v-on:change="textEdited"></tinymce>
				</div>

				<div class="col-lg-6">
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
						<div class="tab-content">
							<div id="tab-1" class="tab-pane active">
								<div class="panel-body limit-height">
                  					<span class="" v-html="instruccion"></span>
								</div>
							</div>
							<div id="tab-2" class="tab-pane">
								<div class="panel-body">
                  					<rubrica v-if="ajaxFinished" type="student" v-bind:content="rubrica"></rubrica>
								</div>
							</div>
						</div>
					</div>
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
				saved: false
			}
		},

		components: {
			"tinymce": require('../components/tinymce.vue').default,
			"rubrica": require('../components/rubrica.vue').default
		},

		watch: {
			content: function(content) {
				this.saved = false
			}
		},

		methods: {
			textEdited: function(text) {
				this.saved = false
				this.content = text
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
				// var rubo = []
				// console.log($)
				$.ajax({
					type: "PATCH",
					url: 'http://142.93.52.192:81/ejercicio/1',
					crossDomain: true,
					data: {
						// op: "replace",
						respuesta: component.content,
					},

					success: function(data) {
						// console.log(data);
						component.saved = true;

					},
					complete: () => {
						console.log('Post completado');

					}

				});
			}
		},


		created: async function() {
			// this.getEjercicio();
			this.getEjer();
		}

	}
</script>

<style scoped>
	.lol {
		position: fixed;
		width: 800px;
		/* right: 10px; */
	}

	.limit-height {
		height: 70vh;
		overflow-y: scroll;
	}

	.collapse-link {
		display: none;
	}
</style>
