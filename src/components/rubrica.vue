<template>
<div class="">
    <div class="ibox float-e-margins">
          <div class="ibox-title">
            <h5>Rúbrica</h5>
            <div class="ibox-tools">
              <a class="collapse-link">
                <i class="fa fa-chevron-up"></i>
              </a>
              <a class="dropdown-toggle" data-toggle="dropdown" href="#">
                <i class="fa fa-wrench"></i>
              </a>
              <ul class="dropdown-menu dropdown-user">
                <li>
                  <a href="#">Config option 1</a>
                </li>
                <li>
                  <a href="#">Config option 2</a>
                </li>
              </ul>
              <a class="close-link">
                <i class="fa fa-times"></i>
              </a>
            </div>
          </div>
          <div class="ibox-content">
            <form class="form-horizontal">
              <div class="form-group">
                <label class="col-lg-2 control-label">Condición</label>

                <div class="col-lg-10">
                  <input type="text" v-model="inputText" placeholder="..." class="form-control">
                </div>
              </div>
              <div class="form-group">
                <label class="col-lg-2 control-label">Puntos</label>

                <div class="col-lg-2">
                  <input type="number" min="1" v-model="inputValue" placeholder="pts" class="form-control">
                </div>
              </div>
              
              <div class="form-group">
                <div class="col-lg-offset-2 col-lg-10">
                  <button class="btn btn-sm btn-white" type="button" @click="addTest" >Agregar</button>
                </div>
              </div>
            </form>

            <div class="row ibox-content">
        <table class="col-8">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Puntos</th>
                    <th>Condición</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(condicion,index) in objetivos" v-bind:key="index">
                      <td>{{index + 1}}.- </td>
                      <td><b>{{condicion.pts}}pts</b></td>
                      <td>{{condicion.txt}}</td>
                      <td class="fa fa-trash" @click="removeTest(index)"><i></i></td>
                </tr>
            </tbody>
            <label><b>Total: {{totalPoints}} pts</b></label>
        </table>

    </div>
          </div>
        </div>
</div>
</template>
<script>
module.exports = {
  props:['content'],

  data:function(){return {
        inputValue: "",
        inputText: "",
        objetivos:[],
  }},

  watch:{
        content:function () {
          // console.log(content)
            this.objetivos = this.content
            // console.log('changed2')
        }
      },

  methods:{
      addTest :function (){

        this.objetivos.push({pts:this.inputValue,txt:this.inputText})
        this.inputValue =""
        this.inputText=""

        this.$emit('change', this.objetivos)
      },

      removeTest: function(index){
        this.objetivos.splice(index, 1);


        this.$emit('change', this.objetivos)
      },
  },
  computed:{
    totalPoints: function(){
        if(this.objetivos.length > 0){
          total = 0
          this.objetivos.forEach(element => {
              total+= parseInt( element.pts)
          });
          return total
        }

        return 0;
      }
  }

}
</script>

<style>
td,th{
  min-width: 100px;
}
</style>
