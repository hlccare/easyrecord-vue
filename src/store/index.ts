import clone from '@/lib/clone';
import Vue from 'vue'
import Vuex from 'vuex'
import createId from '@/lib/createId';
import { expenseTagsList, incomeTagsList } from '@/constants/tagsList';
import dayjs from 'dayjs';

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
    getRecordListByType: (state) => (type: '+' | '-'): RecordItem[] => {
      return state.recordList.filter((item) => item.type === type)
    },
    getTotalByType: (state, getters) => (type: '+' | '-') => {
      const records: RecordItem[] = getters.getRecordListByType(type)
      const total = records.reduce((sum, record) => {
        return sum + record.amount
      }, 0)
      console.log('getTotal')
      console.log(total)
      return total
    },
    getShareListByType: (state, getters) => (type: '+' | '-') => {
      const recordList: RecordItem[] = getters.getRecordListByType(type);

      const hash: { [key: string]: number } = {}
      if (recordList.length === 0) {
        return []
      }
      for (let i = 0; i < recordList.length; i++) {
        const id = recordList[i].tagId.toString()
        if (!hash[id]) {
          hash[id] = recordList[i].amount
        } else {
          hash[id] += recordList[i].amount;
        }
      }
      const keyList = Object.keys(hash)
      keyList.sort((a, b) => hash[a] - hash[b])
      const valueList = Object.values(hash)
      const total = valueList.reduce((sum, value) => { return sum += value }, 0)
      const result: Result = []
      keyList.map(key =>
        result.push({
          id: parseInt(key),
          amount: hash[key],
          share: (hash[key] / total).toFixed(2)
        })
      )
      return result
    },
    getDayTotalListByType: (state, getters) => (type: '-' | '+') => {
      const dayTotalList: RecordItem[] = getters.getRecordListByType(type)
      dayTotalList.sort((a, b) => (dayjs(b.createdAt).valueOf() - dayjs(a.createdAt).valueOf()))
      type Result = {
        title: string; //日期，格式'MM/DD'
        total?: number; //总金额
        items: RecordItem[]; //对应的记录
      }[]
      if (dayTotalList.length === 0) {
        return []
      }
      const result: Result = [
        {
          title: dayjs(dayTotalList[0].createdAt).format('MM/DD'),
          items: [dayTotalList[0]]
        }
      ]
      for (let i = 1; i < dayTotalList.length; i++) {
        const current = dayTotalList[i]
        const last = result[result.length - 1]
        if (dayjs(last.items[0].createdAt).isSame(dayjs(current.createdAt), 'day')) {
          last.items.push(current) //与末尾记录为同一天则存入
        } else {
          result.push(
            { title: dayjs(current.createdAt).format('MM/DD'), items: [current] }
          )
        }
      }
      result.map(
        group =>
          group.total = group.items.reduce((sum, item) => {
            return sum + item.amount
          }, 0)
      )
      return result
    },

    getIconNameById: (state) => (id: number): string => {
      const tagsList = id.toString()[0] === '1' ? state.expenseTagsList : state.incomeTagsList
      return tagsList.filter(r => r.id === id)[0].iconName
    },
    getTagNameById: (state) => (id: number): string => {
      const tagsList = id.toString()[0] === '1' ? state.expenseTagsList : state.incomeTagsList
      return tagsList.filter(r => r.id === id)[0].name
    },

  }
});
export default store;