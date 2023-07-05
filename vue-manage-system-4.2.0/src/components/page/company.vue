<template>
<div>
  <el-row gutter="20">
    <el-col span="12">
      <el-form :inline="true" :model="form" class="demo-form-inline">
        <el-form-item label="公司名称">
          <el-input placeholder="请输入公司名称"></el-input>
        </el-form-item>
        <el-form-item label="核算时间">
          <el-col :span="11">
            <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-time-picker type="date" placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search">搜索</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
  <el-row gutter="20">
    <el-card shadow="hover" style="height:800px;">
      <template>
        <el-table
            :data="tableData"
            style="width: 100%">
          <el-table-column
              prop="date"
              label="日期"
              width="180">
          </el-table-column>
          <el-table-column
              prop="name"
              label="公司名称"
              >
          </el-table-column>
          <el-table-column
              prop="address"
              label="所在地">
          </el-table-column>
          <el-table-column
              fixed="right"
              label="操作"
              width="120">
            <template slot-scope="scope">
              <el-button
                  @click.native.prevent="see()"
                  type="text">
                查看记录
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
      <el-dialog title="历史记录" :visible.sync="dialogFormVisible" @open="open()">
        <el-row gutter="20" style="margin: 20px">
          <el-col span="20">
            <el-descriptions class="margin-top" title="数据统计" :column="3" :size="size" border style="width: 700px">
              <el-descriptions-item>
                <template slot="label">
                  <i class="el-icon-user"></i>
                  选择行业
                </template>
                民航企业
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">
                  所在地
                </template>
                浙江
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">
                  总排放量
                </template>
                20吨
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">
                  <i class="el-icon-user"></i>
                  选择维度
                </template>
                '固定燃烧', '移动燃烧', '电热间接排放', '能源加工排放', '工艺排放', '差旅通勤', '新能源减排'
              </el-descriptions-item>
            </el-descriptions>
              <div id="one" style="height: 400px"></div>
            <div id="two" style="height: 400px"></div>
            <div id="three" style="height: 400px"></div>
          </el-col>
<!--          <el-row gutter="20">-->
<!--            <el-col >-->
<!--              <div id="one" style="height: 400px"></div>-->
<!--            </el-col>-->
<!--            <el-col >-->
<!--              <div id="two" style="height: 400px"></div>-->
<!--            </el-col>-->
<!--            <el-col >-->
<!--              <div id="three" style="height: 400px"></div>-->
<!--            </el-col>-->
<!--          </el-row>-->
        </el-row>


      </el-dialog>

    </el-card>
  </el-row>
</div>
</template>

<script>
export default {
  name: "company",
    data() {
      return {
        dialogFormVisible:false,
        tableData: [{
          date: '2023-05-02',
          name: '中国铝业股份有限公司',
          address: '北京'
        }, {
          date: '2023-05-04',
          name: '华能国际电力股份有限公司',
          address: '浙江'
        }, {
          date: '2023-05-01',
          name: '荣盛石化股份有限公司',
          address: '浙江'
        }, {
          date: '2023-04-03',
          name: '华能国际电力股份有限公司',
          address: '浙江'
        }],
        activeNames: ['1'],
        form:[{
          date1:'',
          date2:'',
        }],

      };
    },
  methods: {
    open() {
      this.$nextTick(() => {
        //  执行echarts方法
        this.set_one()
        this.set_two()
        this.set_three()
      });
    },
    see(){
        this.dialogFormVisible=true
    },
      set_one(){
        var one = this.$echarts.init(document.getElementById("one"));
        var option_one= {
          title:{
            text:'范围一（直接排放）',
            fontSize:3
          },
          tooltip: {
            trigger: 'item'
          },
          legend: {
            top: '5%',
            left: 'center'
          },
          series: [
            {
              name: 'Access From',
              type: 'pie',
              radius: ['40%', '70%'],
              avoidLabelOverlap: false,
              itemStyle: {
                borderRadius: 10,
                borderColor: '#fff',
                borderWidth: 2
              },
              label: {
                show: false,
                position: 'center'
              },
              emphasis: {
                label: {
                  show: true,
                  fontSize: 40,
                  fontWeight: 'bold'
                }
              },
              labelLine: {
                show: false
              },
              data: [
                { value: 150, name: '固定燃烧' },
                { value: 32, name: '移动燃烧' },
                { value: 62, name: '能源加工转换' },
                { value: 100, name: '工艺排放' },
              ]
            }
          ]
        };
        one.setOption(option_one)
      },
    set_two(){
      var two= this.$echarts.init(document.getElementById("two"));
      var option_two= {
        title:{
          text:'范围二',
          fontSize:3
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          top: '5%',
          left: 'center'
        },
        series: [
          {
            name: 'Access From',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: '#fff',
              borderWidth: 2
            },
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: 40,
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: [
              { value: 20, name: '购入电力' },
              { value:20, name: '售出电力' },
              { value: 20, name: '购入热力' },
              { value: 20, name: '售出热力' },
            ]
          }
        ]
      };
      two.setOption(option_two)
    },
    set_three(){
      var three= this.$echarts.init(document.getElementById("three"));
      var option_three= {
        title:{
          text:'范围三',
          fontSize:3
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          top: '5%',
          left: 'center'
        },
        series: [
          {
            name: 'Access From',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: '#fff',
              borderWidth: 2
            },
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: 40,
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: [
              { value: 1048, name: '员工差旅' },
              { value: 735, name: '员工通勤' },

            ]
          }
        ]
      };
      three.setOption(option_three)
    },
    }
}
</script>

<style scoped>

</style>
