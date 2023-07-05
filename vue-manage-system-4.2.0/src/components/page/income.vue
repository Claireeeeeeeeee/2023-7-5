<template>
<div>
  <el-row :gutter="20">
    <el-col :span="12">

      <el-row>
        <el-card shadow="hover" :body-style="{padding: '0px'}">
          <div style="height: 600px" id="income"></div>
        </el-card>
      </el-row>
    </el-col>
    <el-col :span="12">
      <el-card shadow="hover" :body-style="{padding: '0px'}">
        <div style="margin: 10px">
          <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="月份">
              <el-input v-model="formInline.date" placeholder="请输入查询的月份"></el-input>
            </el-form-item>
            <el-form-item label="支付类型">
              <el-select v-model="formInline.type" placeholder="年卡/季卡/按次">
                <el-option label="年卡" value="1888"></el-option>
                <el-option label="季卡" value="188"></el-option>
                <el-option label="按次" value="49.9"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">查询</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div style="margin: 10px;height: 550px">
          <template>
            <el-table
                :data="tableData"
                style="width: 100%"
                height="500">
              <el-table-column
                  fixed
                  prop="date"
                  label="日期"
                  width="150">
              </el-table-column>
              <el-table-column
                  prop="qqname"
                  label="公司名称">
              </el-table-column>
              <el-table-column
                  prop="type"
                  label="支付方式"
                  width="120">
              </el-table-column>
              <el-table-column
                  prop="qqdq"
                  label="地区"
                  width="120">
              </el-table-column>
            </el-table>
          </template>
          <div class="block">
            <el-pagination
                layout="prev, pager, next"
                :total="1000">
            </el-pagination>
          </div>
        </div>
      </el-card>
    </el-col>
  </el-row>
</div>
</template>

<script>
export default {
  name: "income",
  mounted() {
    this.set_income();
  },
  data() {
    return {
      tableData: [{
        date:'2023-4-4',
        qqname: '中国铝业股份公司',
        type:'年卡',
        qqdq:'北京'
      }, {
        date:'2023-4-2',
        qqname: '华能国际电力股份有限公司',
        type:'年卡',
        qqdq:'浙江'
      }, {
        date:'2023-3-10',
        qqname: '浙江浙能电力股份有限公司',
        type:'季卡',
        qqdq:'浙江'
      }, {
        date:'2023-3-7',
        qqname: '安徽海螺集团有限责任公司',
        type:'一次',
        qqdq:'安徽'
      },
        {
        date:'2023-3-20',
        qqname: '荣盛石化股份有限公司',
        type:'年卡',
        qqdq:'浙江'
      }, {
        date:'2023-3-16',
        qqname: '大唐国际发电股份有限公司',
        type:'一次',
        qqdq:'北京'
      }, {
        date:'2023-3-4',
        qqname: '中国铝业股份公司',
        type:'季卡',
        qqdq:'北京'
      },{
        date:'2023-4-5',
        qqname: '安徽海螺集团有限责任公司',
        type:'一次',
        qqdq:'安徽'
      },{
          date:'2023-4-5',
          qqname: '天山水泥股份有限公司',
          type:'一次',
          qqdq:'新疆'
        },
        {
          date:'2023-4-5',
          qqname: '华润电力控股有限公司',
          type:'一次',
          qqdq:'香港'
        },
      ],
      formInline: {
        date: '',
        type: ''
      }
    }
  },
  methods:{
    onSubmit() {
      console.log('submit!');
    },
    set_income(){
      var income = this.$echarts.init(document.getElementById("income"));
      var option_income= {
        xAxis: {
          type: 'category',
          boundaryGap: false,
          name:'日期'
        },
        yAxis: {
          type: 'value',
          boundaryGap: [0, '30%'],
          name:'金额/元'
        },
        visualMap: {
          type: 'piecewise',
          show: false,
          dimension: 0,
          seriesIndex: 0,
          pieces: [
            {
              gt: 1,
              lt: 3,
              color: 'rgba(0, 0, 180, 0.4)'
            },
            {
              gt: 5,
              lt: 7,
              color: 'rgba(0, 0, 180, 0.4)'
            }
          ]
        },
        series: [
          {
            type: 'line',
            smooth: 0.6,
            symbol: 'none',
            lineStyle: {
              color: '#5470C6',
              width: 5
            },
            markLine: {
              symbol: ['none', 'none'],
              label: { show: false },
              data: [{ xAxis: 1 }, { xAxis: 3 }, { xAxis: 5 }, { xAxis: 7 }]
            },
            areaStyle: {},
            data: [
              ['2023-03-10', 200],
              ['2023-03-11', 560],
              ['2023-03-12', 750],
              ['2023-03-13', 580],
              ['2023-03-14', 250],
              ['2023-03-15', 300],
              ['2023-03-16', 450],
              ['2023-03-17', 300],
              ['2023-03-18', 100]
            ]
          }
        ]
      };
      income.setOption(option_income)
    },
  }
}
</script>

<style scoped>
.el-row {
  margin-bottom: 20px;
}

.grid-content {
  display: flex;
  align-items: center;
  height: 100px;
}

.grid-cont-right {
  flex: 1;
  text-align: center;
  font-size: 14px;
  color: #999;
}

.grid-num {
  font-size: 30px;
  font-weight: bold;
}

.grid-con-icon {
  font-size: 50px;
  width: 100px;
  height: 100px;
  text-align: center;
  line-height: 100px;
  color: #fff;
}

.grid-con-1 .grid-con-icon {
  background: rgb(45, 140, 240);
}

.grid-con-1 .grid-num {
  color: rgb(45, 140, 240);
}

.grid-con-2 .grid-con-icon {
  background: rgb(100, 213, 114);
}

.grid-con-2 .grid-num {
  color: rgb(45, 140, 240);
}

.grid-con-3 .grid-con-icon {
  background: rgb(242, 94, 67);
}

.grid-con-3 .grid-num {
  color: rgb(242, 94, 67);
}

.user-info {
  display: flex;
  align-items: center;
  padding-bottom: 20px;
  border-bottom: 2px solid #ccc;
  margin-bottom: 20px;
}

.user-avator {
  width: 120px;
  height: 120px;
  border-radius: 50%;
}

.user-info-cont {
  padding-left: 50px;
  flex: 1;
  font-size: 14px;
  color: #999;
}

.user-info-cont div:first-child {
  font-size: 30px;
  color: #222;
}

.user-info-list {
  font-size: 14px;
  color: #999;
  line-height: 25px;
}

.user-info-list span {
  margin-left: 70px;
}

.mgb20 {
  margin-bottom: 20px;
}

.todo-item {
  font-size: 6px;
}

.todo-item-del {
  text-decoration: line-through;
  color: #999;
}

.schart {
  width: 100%;
  height: 300px;
}
</style>
