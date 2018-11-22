<template>
    <button ref="saveButton" @click="click" type="button" :class="{'btn':true, 'btn-success': !saved, 'btn-primary': saved, 'round-fixed': round }">
        <div v-if="!round">
            <i v-if="saved" class="fa fa-check"></i>
            <span v-if="saved" class="bold">Guardado</span>
            <i v-if="!saved" class="fa fa-upload"></i>
            <span v-if="!saved" class="bold">Guardar</span>
        </div>
        <div v-else>
            <i class="fa fa-floppy-o fa-4x" aria-hidden="true"></i>
        </div>

    </button>
</template>

<script>
export default {
    props:{
        saved:{
            type: Boolean
        }
    },

    data: function() {
        return{
            round: false,
        }
    },

    methods:{
        click: function(){
            this.$emit('click')
        }
    },

    mounted: function(){
        var button = this.$refs.saveButton;
        var heightLimit =  button.offsetTop + $(button).height();
        var component = this

        $(document).on('scroll',function(){
            console.log('scrooling',window.scrollY, heightLimit)
            
            if ( heightLimit < window.scrollY){
                // console.log('button is not visible')
                component.round = true;
            }else{
                // console.log('button is visible')
                component.round = false;
            }
        });
    }
}
</script>

<style>
    .round-fixed{
        border-radius: 100%;
        width: 100px;
        height: 100px;
        position: fixed;
        top: 80%;
        left: 90%;
        z-index: 9999;
        
        box-shadow: 0px 0px 5px 1px rgba(0,0,0,0.75);
    }
</style>


