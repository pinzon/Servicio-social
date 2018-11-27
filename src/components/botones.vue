<template>
  <div class="ibox float-e-margins">
    <div class="ibox-title">
      <h5>Comentarios</h5>
    </div>
    <div class="ibox-content no-padding">
      <ul class="list-group">
        <li class="list-group-item" :key="index" v-for='(btn, index) in buttons'>
          <div class="row">
            <div class="col-lg-9 " style="padding-right:0px !important">
              <input type="text" style="width: 100%" v-model="btn.text">
            </div>
            <div class="col-lg-2" style="padding-right:0px !important">
              <span class="badge badge-success font-size-12" role="button" v-on:click='animatedDiv(btn.id,btn.ann,btn.color)'>Mostrar</span>
            </div>
            <div class="col-lg-1">
              <span role="button" class="fa fa-trash" v-on:click="removeTest(index)"></span>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>



<script>
  module.exports = {
    props: {
      buttons: {
        type: Array,
        default: []
      }
    },
    data: function() {
      return {}
    },
    watch: {
      content: {
        handler: function() {
          // console.log('emmiting')
          this.$emit('change', this.buttons)
        },
        deep: true
      }
    },
    mounted: function() {
      this.$nextTick(function() {
        $('#irArriba').click(function() {
          $('body, html').animate({
            scrollTop: '0px'
          }, 300);
        });
        $(window).scroll(function() {
          if ($(this).scrollTop() > 0) {
            $('#irArriba').slideDown(300);
          } else {
            $('#irArriba').slideUp(300);
          }
        });
      });
      $(window).scroll(function() {
				if( $(this).scrollTop() > 0  && $(this).scrollTop() > 160 ){
					$("#scroll").css({
						"margin-top": ($(window).scrollTop() - 160) + "px",
					});
				}
				else if( $(this).scrollTop() < 160 ){
					$("#scroll").css({
						"margin-top": "40px",
					});
				}
			});
    },
    methods: {
      animatedDiv: function(id, animation, color) {
        document.getElementById(id).scrollIntoView();
				window.scrollBy(0, -40);
        if (animation == 'subrayar') {
          var atr = "background-position";
          var val = 0;
          $('span#' + id).css({
            //"background-position": "0",
            "background-size": "200%",
            "transition": "all 0.4s",
            "background-image": "linear-gradient(to right, #ffffff 50%," + color + " 50%)",
            'background-position': '-100%',
          });
        } else if (animation == 'underline') {
          var atr = "text-decoration";
          var val = '';
          $('span#' + id).css({
            "text-decoration": "underline",
          });
        }
        setTimeout(function() {
          $('span#' + id).css(atr, val);
        }, 3000);
        $('span#' + id).removeClass().addClass(animation + ' animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
          $(this).removeClass();
        });
      },
      removeTest: function(index) {
        this.$emit('comment-deleted', this.buttons[index].id)
        this.buttons.splice(index, 1);
      },

      removeTestWithId(id){
        var index = this.buttons.findIndex(x => x.id === id);
        if (index) this.buttons.splice(index, 1);
      }

    }
  }
</script>

<style>
  #irArriba {
    display: none;
    padding: 20px;
    background: #2F4050;
    font-size: 20px;
    color: #fff;
    cursor: pointer;
    position: fixed;
    bottom: 20px;
    right: 20px;
    z-index: 1;
  }
</style>
