import Component from "vue-class-component";
import Vue from "vue";

@Component
class TagHelper extends Vue {
    createTag() {
        const name = window.prompt("请输入标签名");
        if (name) {
            this.$store.commit("createTag", name);
        } else {
            return window.alert("标签名不可为空");
        }
    }
}

export default TagHelper;