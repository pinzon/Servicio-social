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
              <a class="close-link">3
                <i class="fa fa-times"></i>
              </a>
            </div>
          </div>
          <div class="ibox-content">
            <form v-if="type=='teacher'" class="form-horizontal" @button="checkForm">
              <!-- <p v-if="errors.length">
                <b>Please correct the following error(s):</b>
                <ul>
                  <li v-for="error in errors" :key="error">{{ error }}</li>
                </ul>
              </p> -->
              <!-- <p v-else>Todo biem</p> -->
              <div class="form-group">
                <label class="col-lg-2 control-label">Condición</label>

                <div class="col-lg-10">
                  <input type="text" v-model="inputText" placeholder="..." class="form-control">
                </div>
              </div>
              <div class="form-group">
                <label class="col-lg-2 control-label">Puntos</label>

                <div class="col-lg-2">
                  <input type="number" min="1" v-model.number="inputValue" placeholder="pts" class="form-control">
                </div>
              </div>
              
              <div class="form-group">
                <div class="col-lg-offset-2 col-lg-10">
                  <button class="btn btn-sm btn-white" type="button" @click="checkForm" >Agregar</button>
                </div>
              </div>
              <p v-if="errors.length">
                <b>Por favor corregir error(es):</b>
                <ul>
                  <li v-for="error in errors" :key="error">{{ error }}</li>
                </ul>
              </p>
            </form>

            <div class="row ibox-content">
        <table class="col-8 table table-striped">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Puntos</th>
                    <th>Condición</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(condicion,index) in content" v-bind:key="index">
                      <td v-if="type=='teacher'" >{{index + 1}}.- </td>
                      <td v-if="type=='student'">
                          <i v-if="condicion.value" class="fa fa-check" aria-hidden="true"></i>
                          <i v-else class="fa fa-times" aria-hidden="true"></i>
                      </td>
                      <td v-if="type=='asistant'">
                        <input type="checkbox" v-model="condicion.value" v-bind:value="true">
                      </td>
                      <td><b>{{condicion.pts}}pts</b></td>
                      <td>{{condicion.txt}}</td>
                      <td v-if="type=='teacher'" class="fa fa-trash" @click="removeTest(index)"><i></i></td>
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
  props:{
    content:{
      type: Array,
      default: []
    },
    type:{
      type: String,
      default: 'teacher'
    }
  },

  data:function(){return {
        errors: [],
        inputValue: "",
        inputText: "",
  }},

  methods:{
      addTest :function (){

        this.content.push({pts:this.inputValue,txt:this.inputText,value:false})
        this.inputValue =""
        this.inputText=""

        //this.$emit('change', this.content)
      },

      removeTest: function(index){
        this.content.splice(index, 1);
        //this.$emit('change', this.content)
      },
      checkForm: function (e) {
      this.errors = [];

      if (!this.inputText) {
        this.errors.push("Descripcion requerida.");
      }
      if (!this.inputValue) {
        this.errors.push('Puntuacion requerida.');
      }

      if (!this.errors.length) {
        this.content.push({pts:this.inputValue,txt:this.inputText,value:false})
        this.inputValue =""
        this.inputText=""
        return true;
        
      }

      e.preventDefault();
    }
  },
  computed:{
    totalPoints: function(){
      var component = this
        if(this.content.length > 0){
          total = 0
          this.content.forEach(element => {
              if(component.type == 'teacher'){
                total+= parseInt( element.pts)
              }else{
                 total+= element.value ?  parseInt( element.pts) : 0
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
td,th{
  min-width: 100px;
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
.table > thead > tr > th {
  border-bottom: 1px solid #DDDDDD;
  vertical-align: bottom;
}
.table > thead > tr > th,
.table > tbody > tr > th,
.table > tfoot > tr > th,
.table > thead > tr > td,
.table > tbody > tr > td,
.table > tfoot > tr > td {
  border-top: 1px solid #e7eaec;
  line-height: 1.42857;
  padding: 8px;
  vertical-align: top;
}

.table-striped > tbody > tr:nth-of-type(odd) {
  background-color: #f9f9f9;
}


</style>
