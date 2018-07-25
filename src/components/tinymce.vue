<template>
    <textarea ref="editor" v-model="content"></textarea>
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

//Comments
require('../assets/js/tma_annotate/plugin.min.js');

export default {
    props: {
        content:{
            type: String,
            default: ''
        },
        readonly:{
            type: Boolean,
            default: false
        },
        user:{
            type: String,
            default: 'teacher'
        }
    },

    data:function(){return {
        editor : {}
    }},

    mounted: function () {
        let component = this
        
        tinyMCE.baseURL = '/static/'

        var plugins,toolbar,menubar

        switch (this.user) {
            case 'teacher':
                
                plugins = 'print preview fullpage  searchreplace autolink directionality visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists textcolor wordcount  imagetools media  contextmenu colorpicker textpattern help'
                toolbar= 'formatselect | bold italic strikethrough forecolor backcolor | link | alignleft aligncenter alignright alignjustify  | numlist bullist outdent indent  | removeformat'
                menubar = true
                break;

            case 'student':
                
                plugins = 'print preview fullpage  searchreplace autolink directionality visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists textcolor wordcount  imagetools media  contextmenu colorpicker textpattern help'
                toolbar= 'formatselect | bold italic strikethrough forecolor backcolor | link | alignleft aligncenter alignright alignjustify  | numlist bullist outdent indent  | removeformat'
                menubar = true
                break;
            
            
            case 'asistant':
                
                plugins = 'tma_annotate'
                toolbar= 'tma_annotate tma_annotatedelete tma_annotatehide '
                menubar = false
                break;
        
            
        }


        this.editor = tinymce.init({
            target: component.$refs.editor,
            height: 500,
            menubar:menubar,
            plugins: plugins,
            toolbar1: toolbar,
            image_advtab: true,
            codesample_content_css: 'skins/prism.css',
            init_instance_callback : component.initEditor,
            setup:function(ed) {
                // var component = component
                // console.log(coomponent)
                ed.on('change', function(e) {
                    // console.log(component)
                    // console.log('the event object ', e);
                    // console.log('the editor object ', ed);
                    // console.log('the content ', ed.getContent());
                    component.$emit('change', ed.getContent())
                });


                
            }
        });

        if (this.readonly){
             tinymce.activeEditor.getBody().setAttribute('contenteditable', false);
        }

    },

    methods:{
        initEditor:function(editor) {
            this.editor = editor      
        }
    },

    beforeDestroy:function () {
        this.editor.destroy()
    }

    
}
</script>

