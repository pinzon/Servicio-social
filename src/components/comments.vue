<template>
    <textarea ref='editor'  v-model="content"></textarea>
</template>
<script>


/* eslint-disable */
require('tinymce');
require('tinymce/themes/modern/theme');
require('tinymce/plugins/print')
require('tinymce/plugins/preview')
require('tinymce/plugins/fullpage')
require('tinymce/plugins/searchreplace')
require('tinymce/plugins/autolink')
require('tinymce/plugins/directionality')
require('tinymce/plugins/visualblocks')
require('tinymce/plugins/visualchars')
require('tinymce/plugins/fullscreen')
require('tinymce/plugins/image')
require('tinymce/plugins/link')
require('tinymce/plugins/media')
require('tinymce/plugins/template')
require('tinymce/plugins/codesample')
require('tinymce/plugins/table')
require('tinymce/plugins/charmap')
require('tinymce/plugins/hr')
require('tinymce/plugins/pagebreak')
require('tinymce/plugins/nonbreaking')
require('tinymce/plugins/anchor')
require('tinymce/plugins/toc')
require('tinymce/plugins/insertdatetime')
require('tinymce/plugins/advlist')
require('tinymce/plugins/lists')
require('tinymce/plugins/textcolor')
require('tinymce/plugins/wordcount')
require('tinymce/plugins/imagetools')
require('tinymce/plugins/media')
require('tinymce/plugins/contextmenu')
require('tinymce/plugins/colorpicker')
require('tinymce/plugins/textpattern')
require('tinymce/plugins/help')

require('../assets/js/segmentar/plugin.min.js');





export default {
    props: ['content'],

    data: function(){
        return {
            editor : {}
        }
    },

    watch:{
        // content:function () {
        //     tinyMCE.activeEditor.setContent(this.content);
        // }
    },

    mounted: function () {
        let component = this
        
        tinyMCE.baseURL = '/static/'

        tinymce.init({
            target: component.$refs.editor,
            height: 500,
            plugins: 'print preview fullpage  searchreplace autolink directionality visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists textcolor wordcount  imagetools media  contextmenu colorpicker textpattern help tma_segmentar',
            contextmenu: 'tma_segmentar tma_segmentardelete | link openlink image inserttable',
            toolbar1: 'tma_segmentar tma_segmentardelete tma_segmentarhide | formatselect | bold italic strikethrough forecolor backcolor | link | alignleft aligncenter alignright alignjustify  | numlist bullist outdent indent  | removeformat',
            image_advtab: true,
            
            
            codesample_content_css: 'skins/prism.css',
            init_instance_callback : component.initEditor,
            setup:function(ed) {
                ed.on('submitcomment', function(e) {
                    //console.log('the event object ', e);
                    //console.log('the editor object ', ed);
                    component.$emit('textedited', ed.getContent(), e.id , e.dataAnnotation , e.anim, e.color)
                });
            }
        });

    },
     methods:{
        initEditor:function(editor) {
            this.editor = editor      
        },

        deleteCommentInEditor(id){
            var newElement = document.createTextNode(tinymce.activeEditor.dom.select('span#' + id)[0].innerHTML)
            tinymce.activeEditor.dom.replace( newElement, tinymce.activeEditor.dom.select('span#' + id)[0]);
        }
    },

    beforeDestroy:function () {
        this.editor.destroy()
    }
}
</script>