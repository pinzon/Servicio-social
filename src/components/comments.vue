<template>
    <textarea v-model="content"></textarea>
</template>
<script>

require('/src/assets/js/tma_annotate');
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







export default {
    props: ['content'],

    data:function(){return {
        saveText : ""
    }},

    watch:{
        // content:function () {
        //     tinyMCE.activeEditor.setContent(this.content);
        // }
    },

    mounted: function () {
        let component = this
        
        tinyMCE.baseURL = '/static/'

        tinymce.init({
            selector: 'textarea',
            height: 500,
            plugins: 'print preview fullpage  searchreplace autolink directionality visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists textcolor wordcount  imagetools media  contextmenu colorpicker textpattern help',
            toolbar1: 'formatselect | bold italic strikethrough forecolor backcolor | link | alignleft aligncenter alignright alignjustify  | numlist bullist outdent indent  | removeformat',
            image_advtab: true,
            codesample_content_css: 'skins/prism.css',

            setup:function(ed) {
                //comments = ed.getContent();
                //console.log(coomponent)
                ed.on('change', function(e) {
                    // console.log(component)
                    // console.log('the event object ', e);
                    // console.log('the editor object ', ed);
                    // console.log('the content ', ed.getContent());
                    component.$emit('change', ed.getContent())
                });

            }

        });

    }
}
</script>

