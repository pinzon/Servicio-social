<template>
	<div class="">
		<div class="ibox ">

			<div class="ibox-content">
				<form v-if="type=='teacher'" class="form-horizontal" @button="checkForm">
					<div class="form-group">
						<label class="col-lg-2 control-label">Condición</label>

						<div class="col-lg-10">
							<input type="text" v-model="inputText" placeholder="..." class="form-control">
							<label class="red">{{errorText}}</label>
						</div>
					</div>
					<div class="form-group">
						<label class="col-lg-2 control-label">Porcentaje</label>
						<div class="col-lg-2">
							<input type="number" min="1" v-model.number="inputValue" placeholder="%" class="form-control">
							<label class="red">{{errorValue}}</label>
						</div>
					</div>

					<div class="form-group">
						<div class="col-lg-offset-2 col-lg-10">
							<button class="btn btn-sm btn-white" type="button" @click="checkForm">Agregar</button>

						</div>
					</div>
				</form>

				<div class="row ibox-content">
					<table class="col-8 table table-striped">
						<thead>
							<tr>
								<th>#</th>
								<th>%</th>
								<th>Condición</th>
								<th v-if="type=='student' || type=='asistant' ">Comentario</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="(condicion,index) in content" v-bind:key="index">
								<td v-if="type=='teacher'">{{index + 1}}.- </td>
								<td v-if="type=='student'">
									<span>{{condicion.value}}</span>
								</td>
								<td v-if="type=='asistant'">
									<input type="number" v-model="condicion.value" class="comment lol" min="0" :max='condicion.pts'>
								</td>
								<td v-if="type=='teacher'"><b><input type="number" v-model="condicion.pts" id="" style="min-width:20px"></b></td>
								<td v-else><b>{{condicion.pts}}%</b></td>

								<td v-if="type=='teacher'"><b><input type="text" v-model="condicion.txt" id=""></b></td>
								<td v-else>{{condicion.txt}}</td>
								<!-- <td v-if="type=='teacher'" class="fa fa-pencil" @click="removeTest(index)"><i></i></td> -->
								<td v-if="type=='teacher'" class="fa fa-trash" @click="removeTest(index)"><i></i></td>
								<td v-if="type=='student' || type=='asistant' ">
									<input v-if="type=='asistant'" type="text" class="comment lol" v-model="condicion.comment">
									<span v-if="type=='student'">{{condicion.comment}}</span>
								</td>
							</tr>
						</tbody>
						<label><b>Total:<br> {{totalPoints}} %</b></label>
					</table>

				</div>
			</div>
		</div>
	</div>
</template>

<script>
	module.exports = {
		props: {
			content: {
				type: Array,
				default: []
			},
			type: {
				type: String,
				default: 'teacher'
			}
		},

		data: function() {
			return {
				errorValue: '',
				errorText: '',
				inputValue: "",
				inputText: "",
			}
    },

    watch: {
      content:{
        handler: function(){
          // console.log('emmiting')
          this.$emit('change', this.content)
        },
        deep:true
      }
    },

		methods: {
			removeTest: function(index) {
				this.content.splice(index, 1);
			},

			checkForm: function(e) {
				this.errors = [];

				if (!this.inputText) {
					this.errorText = 'Descripcion requerida.';
				} else {
					this.errorText = ''
				}
				if (!this.inputValue) {
					this.errorValue = 'Puntuacion requerida.';
				} else {
					this.errorValue = ""
				}

				if (!this.errorValue && !this.errorText) {
					this.content.push({
						pts: this.inputValue,
						txt: this.inputText,
						value: 0,
						comment: ''
					})
					this.inputValue = ""
					this.inputText = ""
					return true;
				}

				e.preventDefault();
			}
		},
		computed: {
			totalPoints: function() {
				var component = this
				if (this.content.length > 0) {
					total = 0
					this.content.forEach(element => {
						if (component.type == 'teacher') {
							total += parseInt(element.pts)
						} else {
							total += parseInt(element.value)
						}
					});
					return total
				}

				return 0;
			}
		}

	}
</script>

<style>
	.red {
		color: red;
	}

	td input[type=number] {
		width: 50px;
	}


	/* .ibox.fullscreen .collapse-link{
		    display: none;
		  }

		  .table-bordered {
		    border: 1px solid #EBEBEB;
		  }
		  .table-bordered > thead > tr > th,
		  .table-bordered > thead > tr > td {
		    background-color: #F5F5F6;
		    border-bottom-width: 1px;
		  }
		  .table-bordered > thead > tr > th,
		  .table-bordered > tbody > tr > th,
		  .table-bordered > tfoot > tr > th,
		  .table-bordered > thead > tr > td,
		  .table-bordered > tbody > tr > td,
		  .table-bordered > tfoot > tr > td {
		    border: 1px solid #e7e7e7;
		  } */

	.table>thead>tr>th {
		border-bottom: 1px solid #DDDDDD;
		vertical-align: bottom;
	}

	.table>thead>tr>th,
	.table>tbody>tr>th,
	.table>tfoot>tr>th,
	.table>thead>tr>td,
	.table>tbody>tr>td,
	.table>tfoot>tr>td {
		border-top: 1px solid #e7eaec;
		line-height: 1.42857;
		padding: 8px;
		vertical-align: top;
	}

	.table-striped>tbody>tr:nth-of-type(odd) {
		background-color: #f9f9f9;
	}

	.comment.lol {
		width: 100%
	}
</style>
