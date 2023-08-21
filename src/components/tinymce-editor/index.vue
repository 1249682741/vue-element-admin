<template>
  <editor v-model="modelValue" :init="init" :disabled="disabled" :id="selectorId" />
</template>

<script setup lang="ts">
//JS部分
//在js中引入所需的主题和组件
import tinymce from 'tinymce/tinymce'
import Editor from '@tinymce/tinymce-vue'
import 'tinymce/skins/content/default/content.min.css'
import 'tinymce/themes/silver'
import 'tinymce/themes/silver/theme'
import 'tinymce/icons/default' //引入编辑器图标icon，不引入则不显示对应图标
import 'tinymce/models/dom' // 这里是个坑 一定要引入

//在TinyMce.vue中接着引入相关插件
import 'tinymce/icons/default/icons'
import 'tinymce/plugins/lists' // 列表插件
import 'tinymce/plugins/link'
import 'tinymce/plugins/image' // 插入上传图片插件
import 'tinymce/plugins/table' // 插入表格插件
import 'tinymce/plugins/wordcount' // 字数统计插件
import 'tinymce/plugins/preview'
// import 'tinymce/plugins/help'
// import 'tinymce/plugins/code' // 源码
// import "tinymce/plugins/media" // 插入视频插件
// import "tinymce/plugins/fullscreen" //全屏

//接下来定义编辑器所需要的插件数据
import { reactive, ref, onMounted, watch, onUnmounted } from 'vue'
import { useVModel } from '@vueuse/core'
import { uploadImage } from './useHook'

const emits = defineEmits<{
  (e: 'update:modelValue'): void
}>()
//这里我选择将数据定义在props里面，方便在不同的页面也可以配置出不同的编辑器，当然也可以直接在组件中直接定义
const props = defineProps({
  modelValue: {
    type: String,
    default: () => {
      return ''
    },
  },
  baseUrl: {
    type: String,
    default: '',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  plugins: {
    type: [String, Array],
    // default: 'lists  table',
    default: 'lists link image table wordcount preview',
  }, //必填
  toolbar: {
    type: [String, Array],
    default: [
      'searchreplace bold italic underline strikethrough alignleft aligncenter alignright outdent indent  blockquote undo redo removeformat subscript superscript code codesample',
      'hr bullist numlist image charmap anchor pagebreak insertdatetime media table emoticons forecolor backcolor preview',
    ],
    // 'codesample bold italic underline alignleft aligncenter alignright alignjustify | undo redo | formatselect | fontselect | fontsizeselect | forecolor backcolor | bullist numlist outdent indent | lists link table code | removeformat ',
  }, //必填
})
const modelValue = useVModel(props, 'modelValue', emits)
const selectorId = 'vue-tinymce-editor'
const selector = `#${selectorId}`

//定义一个对象 init初始化
const init = reactive({
  promotion: false,
  selector, //富文本编辑器的id,
  language_url: 'tinymce/langs/zh-Hans.js', // 语言包的路径，具体路径看自己的项目，文档后面附上中文js文件
  language: 'zh-Hans', //语言,特别注意，这里的名称需要和上面的language_url中的文件名要一致
  skin_url: 'tinymce/skins/ui/oxide', // skin路径，具体路径看自己的项目
  height: 400, //编辑器高度
  branding: false, //是否禁用“Powered by TinyMCE”
  menubar: true, //顶部菜单栏显示
  image_dimensions: false, //去除宽高属性
  plugins: props.plugins, //这里的数据是在props里面就定义好了的
  toolbar: props.toolbar, //这里的数据是在props里面就定义好了的
  font_formats: 'Arial=arial,helvetica,sans-serif; 宋体=SimSun; 微软雅黑=Microsoft Yahei; Impact=impact,chicago;', //字体
  fontsize_formats: '11px 12px 14px 16px 18px 24px 36px 48px 64px 72px', //文字大小
  // paste_convert_word_fake_lists: false, // 插入word文档需要该属性
  paste_webkit_styles: 'all',
  paste_merge_formats: true,
  nonbreaking_force_tab: false,
  paste_auto_cleanup_on_paste: false,
  file_picker_types: 'file',
  content_css: 'tinymce/skins/content/default/content.min.css', //以css文件方式自定义可编辑区域的css样式，css文件需自己创建并引入
  // 存储URL的原始值，默认为true, URL会被自动转化； 为false,它会试着保持URL的完整性
  convert_urls: false,
  // 避免图片地址和链接地址转换成相对路径
  relative_urls: false,
  //图片上传
  images_upload_handler: uploadImage,
  imageSuccessCBK: (...args: any[]) => {
    console.log(...args)
  },
  // 文件上传
  // file_picker_callback: (callback: Function, value: any, meta: any) => {
  //   // Provide file and text for the link dialog
  //   if (meta.filetype == 'file') {
  //     callback('mypage.html', { text: 'My text' })
  //   }

  //   // Provide image and alt text for the image dialog
  //   if (meta.filetype == 'image') {
  //     callback('myimage.jpg', { alt: 'My alt text' })
  //   }

  //   // Provide alternative source and posted for the media dialog
  //   if (meta.filetype == 'media') {
  //     callback('movie.mp4', { source2: 'alt.ogg', poster: 'image.jpg' })
  //   }
  // },
})

function setStyle() {
  let dialog =  <HTMLImageElement>document.querySelector('.tox-dialog--width-lg')
  if(dialog) {
    dialog.style['maxWidth'] = '375px'
  }
}

let observer: any = ''
function initObserver() {
  try {
    var ele = document.body
    //以下代码为监控整个Body元素的变化
    var MutationObserver = window.MutationObserver; // || window.WebKitMutationObserver;
    if (MutationObserver) {
      var MutationObserverConfig = {
          attributes: true, 
          childList: true, 
          subtree: true
      };
      console.log('observer work')
      observer = new MutationObserver(function (mutations) {
        setStyle()
      });
      observer.observe(ele, MutationObserverConfig);
    }
     else if (ele.addEventListener) {
      ele.addEventListener("DOMSubtreeModified", function (evt) {
        setStyle()
      }, false);
    } else {
      var timer = setInterval(function () {
        setStyle()
      }, 1000)
    }
  } catch (error) {

  }
}

//在onMounted中初始化编辑器
onMounted(() => {
  initObserver()
  tinymce.init({})
})

onUnmounted(() => {
  tinymce.get(selector)?.destroy()
  console.log('observer disconnect')
  observer && observer.disconnect()
})
</script>
