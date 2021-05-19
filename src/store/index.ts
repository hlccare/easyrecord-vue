import clone from '@/lib/clone';
import Vue from 'vue'
import Vuex from 'vuex'
import createId from '@/lib/createId';
import { expenseTagsList, incomeTagsList } from '@/constants/tagsList';

Vue.use(Vuex) //把 store 绑到 Vue.prototype.$store = store

const store = new Vuex.Store({
  state: {//data
    recordList: [],
    createRecordError: null,
    createTagError: null,
    tagList: [],
    expenseTagsList: expenseTagsList,
    incomeTagsList: incomeTagsList,
    currentTag: undefined
  } as RootState,
  mutations: {//methods
    fetchRecords: function (state) {
      state.recordList = JSON.parse(
        window.localStorage.getItem('recordList') || "[]"
      ) as RecordItem[];
    },
    createRecord(state, record: RecordItem) {
      state.recordList.push({ ...record, id: createId() })
      store.commit('saveRecords')
    },
    saveRecords(state) {
      window.localStorage.setItem('recordList', JSON.stringify(state.recordList));
    },
    deleteRecord(state, id: number) {
      state.recordList = state.recordList.filter((record) => { return record.id !== id })
      store.commit('saveRecords')
    },

    fetchTags(state) {
      state.tagList = JSON.parse(
        window.localStorage.getItem('tagList') || "[]"
      ) as Tag[];
    },
    createTag(state, { iconName, name }) {
      state.createTagError = null
      const names = state.tagList.map(item => item.name)
      if (names.indexOf(name) >= 0) {
        window.alert("标签名重复了")
        state.createTagError = new Error('tag name duplicated')
        return;
      }
      state.tagList.push({ iconName, name })
      store.commit('saveTags')
    },
    saveTags(state) {
      window.localStorage.setItem('tagList', JSON.stringify(state.tagList));
    },
    getTagNameById(state, id: number) {
      const tagsList = id.toString()[0] === '1' ? state.expenseTagsList : state.incomeTagsList
      return tagsList.filter(r => r.id === id)[0].name
    },
  },
  getters: {
    getIconNameById: (state) => (id: number): string => {
      const tagsList = id.toString()[0] === '1' ? state.expenseTagsList : state.incomeTagsList
      return tagsList.filter(r => r.id === id)[0].iconName
    },
    getTagNameById: (state) => (id: number): string => {
      const tagsList = id.toString()[0] === '1' ? state.expenseTagsList : state.incomeTagsList
      return tagsList.filter(r => r.id === id)[0].name
    },
    getRecordListByType: (state) => (type: '+' | '-'): RecordItem[] => {
      return state.recordList.filter((item) => item.type === type)
    }
  }
});
export default store;