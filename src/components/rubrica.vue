<template>
<div class="ibox-content">
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
          </div>
        </div>
    <div class="row">
        <table>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Puntos</th>
                    <th>Condición</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(condicion,index) in tests" v-bind:key="index">
                      <td>{{index + 1}}.- </td>
                      <td><b>{{condicion.pts}}pts</b></td>
                      <td>{{condicion.txt}}</td>
                      <td class="fa fa-trash" @click="removeTest(index)"><i></i></td>
                </tr>
            </tbody>
            <label><b>Total: {{totalPoints}}pts</b></label>
        </table>

    </div>
</div>
</template>
<script>
module.exports = {
    data:function() {
        return{
            inputValue: "",
            inputText: "",
            tests:[{pts:10,txt:"Test"}],
        }
    },
    computed:{
      totalPoints: function(){
        if(this.tests.length > 0){
          total = 0
          this.tests.forEach(element => {
             total+= parseInt( element.pts)
          });
          return total
        }

        return 0;
      }
    },

    methods:{
        addTest :function (){

          this.tests.push({pts:this.inputValue,txt:this.inputText})
          this.inputValue =""
          this.inputText=""
        },

        removeTest: function(index){
          this.tests.splice(index, 1);
        }
    }
}
</script>

<style>
td,th{
  min-width: 100px;
}
</style>
