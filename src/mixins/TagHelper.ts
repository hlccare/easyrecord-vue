import Component from "vue-class-component";
import Vue from "vue";

const map: {[key: string]: string} ={
    'tag name duplicated':'标签名重复了'
}

@Component
class TagHelper extends Vue {
    createTag() {
        const name = window.prompt("请输入标签名");
        if (name) {
            this.$store.commit("createTag", name);
        } else {
            return window.alert("标签名不可为空");
        }
        if(this.$store.state.createTagError){
            window.alert(map[this.$store.state.createTagError.message]||'未知错误')
        }
    }
}

export default TagHelper;