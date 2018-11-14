<template>
	<div>
		<i id="irArriba" class="fa fa-arrow-up"></i>
		<div class="row wrapper border-bottom white-bg page-heading">
			<div class="col-lg-10">
				<h2>Vista Previa Segmentacion</h2>
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
		</div>

		<div class="wrapper wrapper-content animated fadeIn">
			<div class="row">
				<div id = "scroll" class="col-lg-4 bg-white" >
						<div class="ibox float-e-margins">
							<div class="ibox-title">
									<h5>Comentarios</h5>
							</div>
							<div class="ibox-content no-padding">
								<ul class="list-group">
									<li class="list-group-item" :key="index" v-for='(btn, index) in buttons'>
										<div class="row">
											<div class="col-lg-9 " style="padding-right:0px !important">
												<p  style="padding-right: 15%">{{btn.text}}</p>
											</div>
											<div class="col-lg-2" style="padding-right:0px !important">
												<span class="badge badge-success font-size-12" role="button" v-on:click='animatedDiv(btn.id,btn.ann,btn.color)'>Mostrar</span>
											</div>
										</div>
									</li>
								</ul>
							</div>
						</div>
				</div>
				<div class="col-lg-8">
					<div class="ibox float-e-margins">
						<div class="ibox-title">
							<h5>Texto</h5>
						</div>
						<div class="ibox-content no-padding">
							<div class="tab-pane ibox-content" id="preview" role="tabpanel" aria-labelledby="preview-tab" v-html="content"></div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import swal from 'sweetalert';
	export default {
		data(){
			return {
				content:'static',
				buttons: [],
				ajaxFinished: false,
			}
		},
		mounted: function () {
			this.$nextTick(function () {
				$('#irArriba').click(function(){
					$('body, html').animate({
						scrollTop: '0px'
					}, 300);
				});
				$(window).scroll(function(){
					if( $(this).scrollTop() > 0 ){
						$('#irArriba').slideDown(300);
					} else {
						$('#irArriba').slideUp(300);
					}
				});
			})
			$(window).scroll(function() {
				if( $(this).scrollTop() > 160 ){
					$("#scroll").css({
						"margin-top": ($(window).scrollTop() - 160) + "px",
					});
				}
			});
		},
		components:{
			"tinymce" : require('../components/comments.vue').default
		},
		methods:{
			animatedDiv: function (id,animation, color){
					document.getElementById(id).scrollIntoView();
					window.scrollBy(0, -40);
					if (animation=='subrayar'){
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
				var component = this
				$.ajax({
					dataType: "json",
					url: 'http://142.93.52.192:81/ejercicio?id=1',
					crossDomain: true,
					success: function (data) {
						if(data[0] ){
							component.content = data[0].content ? data[0].content : ''
							component.buttons = data[0].parts ? JSON.parse(data[0].parts) : []
						}else{
							component.content =  ''
							component.buttons = []
						}
					},
					complete:()=>{
						component.ajaxFinished = true
					}
				});
			},
		},
		created: async function () {
			this.getEjercicio();
		}
	}
</script>
<style scoped>
	#irArriba{
		display:none;
		padding:20px;
		background:#2F4050;
		font-size:20px;
		color:#fff;
		cursor:pointer;
		position: fixed;
		bottom:20px;
		right:20px;
		z-index: 1;
	}
</style>