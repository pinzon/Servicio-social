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
				<div class="col-lg-7">
          <div class="tabs-container">
					<ul class="nav nav-tabs " id="myTab" role="tablist">
						<li class="active">
							<a class="nav-link active bg-white" id="editor-tab" data-toggle="tab" href="#editor" role="tab" aria-controls="editor" aria-selected="true">Editor</a>
						</li>
						<li class="">
							<a class="nav-link" id="preview-tab" data-toggle="tab" href="#preview" role="tab" aria-controls="preview" aria-selected="false">Vista Previa</a>
						</li>
					</ul>
          </div>
					<div class="tab-content" id="myTabContent">
						<div class="tab-pane active" id="editor" role="tabpanel" aria-labelledby="editor-tab">
							<tinymce ref='editor' v-if="ajaxFinished" v-bind:content="content" v-on:change="contentChange" v-on:comment-added="textEdited" v-on:comment-deleted="deleteInButtons"></tinymce>
						</div>
						<div class="tab-pane ibox-content" id="preview" role="tabpanel" aria-labelledby="preview-tab" v-html="content"></div>
					</div>
				</div>

				<div id="scroll" class="col-lg-5 bg-white">
					<buttons ref="buttons" v-if="ajaxFinished" type="teacher" v-bind:buttons="buttons" v-on:comment-deleted="deleteInEditor" ></buttons>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import swal from 'sweetalert';

	export default {
		data() {
			return {
				content: 'static',
				buttons: [],
				ajaxFinished: false,
				saved: false
			}
		},

		components: {
			"tinymce": require('../components/comments.vue').default,
			"buttons": require('../components/botones.vue').default
		},
		watch: {
			content: function(content) {
				this.saved = false
			}
		},
		methods: {
      deleteInButtons(id){
        console.log('delete in buttons', id)
        console.log(this.$refs.buttons)
        this.$refs.buttons.removeTestWithId(id)
      },

      deleteInEditor(id){
        console.log('delete in editor', id)
        // console.log(this.$refs.editor)
        this.$refs.editor.deleteCommentInEditor(id)
      },

      contentChange: function(text) {
				this.content = text
				this.saved = false
			},
			textEdited: function(text, id, name, anim, color) {
				this.content = text
				this.saved = false
				this.buttons.push({
					id: id,
					text: name,
					ann: anim,
					color: color
				})
			},
			getEjercicio: async function() {
				var component = this
				$.ajax({
					dataType: "json",
					url: 'http://142.93.52.192:81/ejercicio?id=1',
					crossDomain: true,
					success: function(data) {
						if (data[0]) {
							component.content = data[0].content ? data[0].content : ''
							component.buttons = data[0].parts ? JSON.parse(data[0].parts) : []
						} else {
							component.content = ''
							component.buttons = []
						}
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
						content: component.content,
						parts: JSON.stringify(component.buttons),
					},
					success: function(data) {
						component.saved = true;
					},
					complete: () => {
						// console.log('Post completado');
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
