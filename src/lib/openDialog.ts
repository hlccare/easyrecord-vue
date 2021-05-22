import Vue from "vue"
import Dialog from '../components/Dialog.vue';

const openDialog = (options: any) => {
    const { type, title, content, okHandler, cancelHandler, closeOnClickOverlay } = options
    const div = document.createElement('div')
    document.body.append(div)
    const close = () => {
        document.body.removeChild(app.$el)
        app.$destroy()
    }
    const app = new Vue({
        render(h) {
            return h(Dialog, {
                props: {
                    type,
                    visible: true,
                    okHandler, cancelHandler, closeOnClickOverlay
                },
                on: {
                    'update:visible': (newVisible: boolean) => {
                        console.log('on update:visible')
                        console.log(newVisible)
                        if (newVisible === false) {
                            close()
                        }
                    }
                },
            }, [h('span', { slot: 'title' }, [title]), h('span', { slot: 'content' }, [content])])
        }
    })
    app.$mount(div)
}
export { openDialog }