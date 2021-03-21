<template>
  <div>
    <Layout>
      <Tabs
        class-prefix="type"
        :data-source="recordTypeList"
        :value.sync="type"
      />
      <!-- <Tabs
        class-prefix="interval"
        :data-source="intervalList"
        :value.sync="interval"
      /> --> 
      <div class="chart-wrapper" ref='chartWrapper'>
      <Chart class='chart' :options='chartOptions'/>

      </div>
      <ol v-if="groupedList.length > 0">
        <li v-for="(group, index) in groupedList" :key="index">
          <h3 class="title">
            {{ beautify(group.title) }}
            <span>{{ type }}￥{{ group.total }}</span>
          </h3>
          <ol>
            <li v-for="item in group.items" :key="item.id" class="record">
              <span>{{ tagString(item.tags) }}</span>
              <span class="notes">{{ item.notes }}</span>
              <span> ￥{{ item.amount }} </span>
            </li>
          </ol>
        </li>
      </ol>
      <div v-else class="noResult">
        暂无数据
      </div>
    </Layout>
  </div>
</template>

<script lang='ts'>
import Vue from "vue";
import Component from "vue-class-component";
import Tabs from "../components/Tabs.vue";
import intervalList from "../constants/intervalList";
import recordTypeList from "../constants/recordTypeList";
import dayjs from "dayjs";
import clone from "@/lib/clone";
import Chart from '@/components/Chart.vue'
import _ from 'lodash'

@Component({
  components: { Tabs,Chart },
})
export default class Statistics extends Vue {
  tagString(tag: Tag[]) {
    return tag.length === 0 ? "无" : tag.map((t) => t.name).join(" | ");
  }

  mounted(){
    const div = (this.$refs.chartWrapper as HTMLDivElement)
    div.scrollLeft = div.scrollWidth
  }

  beautify(string: string) {
    const day = dayjs(string);
    const now = dayjs();
    if (dayjs(string).isSame(now, "day")) {
      return "今天";
    } else if (day.isSame(now.subtract(1, "day"), "day")) {
      return "昨天";
    } else if (day.isSame(now.subtract(2, "day"), "day")) {
      return "前天";
    } else if (day.isSame(now, "year")) {
      return day.format("MM月D日");
    } else {
      return day.format("YYYY年MM月DD日");
    }
  }
  get keyValueList(){
    console.log('recordList')
    console.log(this.recordList)
    const today = new Date()
    const array = []
    for(let i=0;i<=29;i++){
      const dateString = dayjs(today).subtract(i,'day').format('YYYY-MM-DD')
      const found = _.find(this.groupedList,{
        title: dateString  
      })
      array.push({
        key:dateString, value: found?found.total:0 
      })
    }
    array.sort((a,b)=>{
      if(a.key>b.key){
        return 1
      }else if(a.key<b.key){
        return -1
      }else{
        return 0
      }
    })
    console.log('array')
    console.log(array)
    return array
  }
  get chartOptions(){
    
    const keys = this.keyValueList.map(r=>r.key)
    const values = this.keyValueList.map(r=>r.value)
    return {
      grid:{
        left:0,
        right:0
      },
    xAxis: {
        type: 'category',
        data: keys,
        axisTick:{
          alignWithLabel: true
        },
        axisLine:{
          lineStyle:{color: '#666'}
        },
        axisLabel:{
          formatter:function(value: string, index: number){
            return value.substr(5)
          }
        }
    },
    yAxis: {
      show:false,
        type: 'value'
    },
    tooltip:{
        show:true,
        triggerOn: 'click',
        formatter:'{c}',
        position: 'top'
      },
    series: [{
      symbol:'circle',
        symbolSize: 15,
        itemStyle:{
          color: '#666'
        },
        data: values,
        type: 'line',
        showBackground: true,
        backgroundStyle: {
            color: 'rgba(180, 180, 180, 0.2)'
        }
    }]
}
  }
  get recordList() {
    return (this.$store.state as RootState).recordList;
  }

  get groupedList() {
    const { recordList } = this;

    const newList = clone(recordList)
      .filter((r) => r.type === this.type)
      .sort(
        (a, b) => dayjs(b.createdAt).valueOf() - dayjs(a.createdAt).valueOf()
      );

    if (newList.length === 0) {
      return [];
    }
    type Result = {
      title: string;
      total?: number;
      items: RecordItem[];
    }[];
    const result: Result = [
      {
        title: dayjs(newList[0].createdAt).format("YYYY-MM-DD"),
        items: [newList[0]],
      },
    ];
    for (let i = 1; i < newList.length; i++) {
      const current = newList[i];
      const last = result[result.length - 1];
      if (dayjs(last.title).isSame(dayjs(current.createdAt), "day")) {
        last.items.push(current);
      } else {
        result.push({
          title: dayjs(current.createdAt).format("YYYY-MM-DD"),
          items: [current],
        });
      }
    }
    result.map((group) => {
      group.total = group.items.reduce((sum, item) => sum + item.amount, 0);
    }); 
    return result;
  }

  beforeCreate() {
    this.$store.commit("fetchRecords");
  }

  type = "-";
  interval = "day";
  intervalList = intervalList;
  recordTypeList = recordTypeList;
}
</script>

<style lang="scss" scoped>
.noResult {
  padding: 16px;
  text-align: center;
}
::v-deep .type-tabs-item {
  background: #c4c4c4;
  &.selected {
    background: white;

    &::after {
      display: none;
    }
  }
}
::v-deep .interval-tabs-item {
  height: 48px;
}
%item {
  padding: 8px 16px;
  line-height: 24px;
  display: flex;
  justify-content: space-between;
  align-content: center;
}
.title {
  @extend %item;
}
.notes {
  margin-right: auto;
  margin-left: 16px;
  color: #999;
}
.record {
  @extend %item;

  background: white;
}
.chart{
 width: 430%; 
 &-wrapper{
   overflow: auto;
   &::-webkit-scrollbar{
     display: none;
   }
 }
}
</style>