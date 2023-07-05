<template>
<div>
  <el-row :gutter="20">
    <el-col :span=12>
      <el-card style="height: 600px">
        <div style="height: 600px">
          <el-row gutter="20">
            <el-input style="width: 400px;padding: 10px" v-model="qqname" placeholder="选择查询公司">
            </el-input>
            <el-button type="primary" @click="onSubmit">查询</el-button>
          </el-row>
          <div style="padding: 5px">碳减排排名</div>
          <el-table
              :data="tableData"
              style="width: 100%">
            <el-table-column
                prop="id"
                label="排名"
                width="100">
            </el-table-column>
            <el-table-column
                prop="qqname"
                label="公司名称"
                >
            </el-table-column>
            <el-table-column
                prop="reduce"
                label="本月减排量">
            </el-table-column>
          </el-table>
          <div style="position:fixed">
            <el-pagination
                small
                layout="prev, pager, next"

                :total="50">
            </el-pagination>
          </div>
        </div>
      </el-card>
    </el-col>
    <el-col :span=12>
      <el-card style="height: 600px">
        <div style="height: 500px" id="carbon_reduction"></div>
      </el-card>
    </el-col>
  </el-row>
</div>
</template>

<script>
import axios from "axios";

export default {
  name: "rank",
  data() {
    return {
      qqname:'',
      tableData: [{
        rank: '1',
        name: '中国铝业股份有限公司',
        reduce: '10.22t'
      }, {
        rank: '2',
        name: '华能国际电力股份有限公司',
        reduce: '8.23t'
      }, {
        rank: '3',
        name: '浙江浙能电力股份有限公司',
        reduce: '7.72t'
      }, {
        rank: '4',
        name: '荣盛石化股份有限公司',
        reduce: '4.92t'
      },
        {
          rank: '5',
          name: '天山水泥股份有限公司',
          reduce: '4.91t'
        },
        {
          rank: '6',
          name: '安徽海螺集团有限责任公司',
          reduce: '3.91t'
        },
        ]
    }
  },
  mounted() {
    this.set_carbon_reduction();
  },

  methods:{
    onSubmit(){
      axios.post("/api/user/getRank",
          {
            qqname:this.qqname,
          },{}).then(res=>{
            this.tableData=res.data
            console.log(res.data)
      })
    },
    set_carbon_reduction(){
      var carbon_reduction = this.$echarts.init(document.getElementById("carbon_reduction"));
      var option_carbon_reduction =  {
        title:{
          text:'碳排放统计',
          fontSize:3
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            crossStyle: {
              color: '#999'
            }
          }
        },
        toolbox: {
          feature: {
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ['line', 'bar'] },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        legend: {
          data: ['Evaporation', 'Precipitation', 'Temperature']
        },
        xAxis: [
          {
            type: 'category',
            data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月'],
            axisPointer: {
              type: 'shadow'
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '各类气体排放量',
            min: 0,
            max: 250,
            interval: 50,
            axisLabel: {
              formatter: '{value} t'
            }
          },
          {
            type: 'value',
            name: '总排放量',
            min: 0,
            max: 400,
            interval: 50,
            axisLabel: {
              formatter: '{value} t'
            }
          }
        ],
        series: [
          {
            name: 'CO2',
            type: 'bar',
            tooltip: {
              valueFormatter: function (value) {
                return value + ' t';
              }
            },
            data: [
              2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3
            ]
          },
          {
            name: 'N2O',
            type: 'bar',
            tooltip: {
              valueFormatter: function (value) {
                return value + ' t';
              }
            },
            data: [
              2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3
            ]
          },
          {
            name: 'CH4',
            type: 'bar',
            tooltip: {
              valueFormatter: function (value) {
                return value + ' t';
              }
            },
            data: [
              4.0, 7.9, 10.0, 22.2, 24.2, 70.7, 130.2, 161.5, 30.1, 22.0, 4.4, 1.3
            ]
          },
          {
            name: '总量',
            type: 'line',
            yAxisIndex: 1,
            tooltip: {
              valueFormatter: function (value) {
                return value + ' t';
              }
            },
            data: [8, 21, 30, 60, 96, 210, 393, 488, 98, 77, 12.0, 5]
          }
        ]
      };
      carbon_reduction.setOption(option_carbon_reduction)
    }
  }
}
</script>

<style scoped>

</style>
