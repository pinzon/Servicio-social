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
				<save-button @click="saveEx" :saved="saved"></save-button>
			</div>
		</div>

		<div class="wrapper wrapper-content animated fadeIn">
			<div class="row">
				<div class="tareux col-xl-8 col-lg-6 col-md-6">
					<h3>Redacta el ejercicio </h3>
					<tinymce id="textEditor" v-if="ajaxFinished" v-bind:content="content" v-on:change="textEdited"></tinymce>
				</div>
				<div class="rubrix col-xl-4 col-lg-6  col-md-6">
					<h3>Escribe los parametros con los que se calificará la respuesta </h3>
					<rubrica v-if="ajaxFinished" type="teacher" v-bind:content="rubrica" v-on:change="rubricaEdited"></rubrica>
				</div>
			</div>

			<div class="row">

			</div>

		</div>
	</div>
</template>




<script>
	import swal from 'sweetalert';

	/* eslint-disable */
	export default {
		data() {
			return {
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
		watch: {
			rubrica: function(rubrica) {
				this.saved = false
			},
			content: function (content) {
				this.saved = false
			}
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

			saveEx: function() {
				var component = this

				$.ajax({
					type: 'PATCH',
					url: 'http://142.93.52.192:81/ejercicio/1',
					crossDomain: true,
					data: {
						id: 1,
						content: component.content,
						rubrica: JSON.stringify(component.rubrica)
					},
					success: function(data) {
						component.saved = true
					}
				});

			},

			getEjercicio: async function() {
				var component = this
				$.ajax({
					dataType: "json",
					url: 'http://142.93.52.192:81/ejercicio/1',
					crossDomain: true,
					success: function(data) {
						// console.log(JSON.parse(data));

						if (data) {
							component.content = data.content ? data.content : ''
							component.rubrica = data.rubrica ? JSON.parse(data.rubrica) : []
						} else {
							component.content = ''
							component.rubrica = []
						}


					},
					complete: () => {
						component.ajaxFinished = true
					}
				});
			}
		},

		created: async function() {
			this.getEjercicio();
		}

	}
</script>

<style scoped>

</style>
