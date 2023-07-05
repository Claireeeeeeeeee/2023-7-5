<template>
    <div>
      <el-row :gutter="20">
        <el-col :span="6">
          <el-card shadow="hover" :body-style="{padding: '0px'}">
            <div class="grid-content grid-con-1">
              <i class="el-icon-lx-people grid-con-icon" style="background: #A0BF7B"></i>
              <div class="grid-cont-right">
                <div class="grid-num">6</div>
                <div>参与测算企业</div>
              </div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card shadow="hover" :body-style="{padding: '0px'}">
            <div class="grid-content grid-con-1">
              <i class="el-icon-sell grid-con-icon" style="background: #518055"></i>
              <div class="grid-cont-right">
                <div class="grid-num">5%</div>
                <div>较上月新增</div>
              </div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card shadow="hover" :body-style="{padding: '0px'}">
            <div class="grid-content grid-con-2">
              <i class="el-icon-pie-chart  grid-con-icon" style="background: #629D6D"></i>
              <div class="grid-cont-right">
                <div class="grid-num">321吨</div>
                <div>本月碳排放总量</div>
              </div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card shadow="hover" :body-style="{padding: '0px'}">
            <div class="grid-content grid-con-3">
              <i class="el-icon-data-line grid-con-icon" style="background: #C0C663"></i>
              <div class="grid-cont-right">
                <div class="grid-num">50吨</div>
                <div>减排量（较上月）</div>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
        <el-row :gutter="10">
            <el-col :span="7">
                <el-card shadow="hover" style="height:403px;">
                  <el-row gutter="20">
                    <el-date-picker v-model="valueMonth1" type="month" placeholder="选择查询的月份">
                    </el-date-picker>
                    <el-button type="primary" @click="onSubmit1">查询</el-button>
                  </el-row>
                  <el-col>
                    <div style="height: 500px" id="industry_proportion"></div>
                  </el-col>
                </el-card>
            </el-col>
          <el-col :span="7">
            <el-card shadow="hover" style="height:403px;">
              <el-row gutter="20">
                <el-date-picker v-model="valueMonth2" type="month" placeholder="选择查询的月份">
                </el-date-picker>
                <el-button type="primary" @click="onSubmit2">查询</el-button>
              </el-row>
              <div style="height: 300px" id="dimension">
              </div>

            </el-card>
          </el-col>
            <el-col :span="10">
                <el-card shadow="hover" style="height:403px;">
                  <el-col style="height:370px">
                    <div style="height: 400px" id="map"></div>
                  </el-col>
                </el-card>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="12">
                <el-card shadow="hover">
                  <div id="sumDischarge" style="height:370px"></div>
                </el-card>
            </el-col>
            <el-col :span="12">
                <el-card shadow="hover">
                  <div style="height: 400px" id="sumUser"></div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>

import Schart from 'vue-schart';
import bus from '../common/bus';
import chinaMap from "@/components/common/china.json";

export default {
    name: 'dashboard',
  mounted() {
      this.set_dimension()
    this.$echarts.registerMap("china", { geoJSON: chinaMap });
    this.set_sumDischarge()
    this.set_sumUser()
    this.set_industry_proportion()
    this.set_map()
  },
    data() {
        return {
            name: localStorage.getItem('ms_username'),
          valueMonth1:'',
          valueMonth2:'',
          hangye: [
                { value: 40, name: '发电企业' },
      { value: 38, name: '电网企业' },
      { value: 32, name: '钢铁生产企业' },
      { value: 30, name: '化工生产企业' },
      { value: 28, name: '电解铝生产企业' },
      { value: 26, name: '镁冶炼企业' },
      { value: 22, name: '平板玻璃生产' },
      { value: 18, name: '水泥生产企业' },
      { value: 11, name: '陶瓷生产企业' },
      { value: 16, name: '民航企业' }
    ]

        };
    },
    components: {
        Schart
    },
    computed: {
        role() {
            return this.name === 'admin' ? '超级管理员' : '普通用户';
        }
    },
    // created() {
    //     this.handleListener();
    //     this.changeDate();
    // },
    // activated() {
    //     this.handleListener();
    // },
    // deactivated() {
    //     window.removeEventListener('resize', this.renderChart);
    //     bus.$off('collapse', this.handleBus);
    // },

    methods: {
      onSubmit1(){
        this.hangye=[
          { value: 50, name: '发电企业' },
          { value: 58, name: '电网企业' },
          { value: 33, name: '钢铁生产企业' },
          { value: 35, name: '化工生产企业' },
          { value: 68, name: '电解铝生产企业' },
          { value: 21, name: '镁冶炼企业' },
          { value: 29, name: '平板玻璃生产' },
          { value: 10, name: '水泥生产企业' },
          { value: 21, name: '陶瓷生产企业' },
          { value: 13, name: '民航企业' }
        ]
        this.set_industry_proportion()
      },
      onSubmit2() {
        console.log('submit!');
      },
      set_map(){
        function  dealWithData(){
          var geoCoordMap = {
            海门: [121.15, 31.89],
            鄂尔多斯: [109.781327, 39.608266],
            招远: [120.38, 37.35],
            舟山: [122.207216, 29.985295],
            齐齐哈尔: [123.97, 47.33],
            盐城: [120.13, 33.38],
            赤峰: [118.87, 42.28],
            青岛: [120.33, 36.07],
            乳山: [121.52, 36.89],
            金昌: [102.188043, 38.520089],
            泉州: [118.58, 24.93],
            莱西: [120.53, 36.86],
            日照: [119.46, 35.42],
            胶南: [119.97, 35.88],
            南通: [121.05, 32.08],
            拉萨: [91.11, 29.97],
            云浮: [112.02, 22.93],
            梅州: [116.1, 24.55],
            文登: [122.05, 37.2],
            上海: [121.48, 31.22],
            攀枝花: [101.718637, 26.582347],
            威海: [122.1, 37.5],
            承德: [117.93, 40.97],
            厦门: [118.1, 24.46],
            汕尾: [115.375279, 22.786211],
            潮州: [116.63, 23.68],
            丹东: [124.37, 40.13],
            太仓: [121.1, 31.45],
            曲靖: [103.79, 25.51],
            烟台: [121.39, 37.52],
            福州: [119.3, 26.08],
            瓦房店: [121.979603, 39.627114],
            即墨: [120.45, 36.38],
            抚顺: [123.97, 41.97],
            玉溪: [102.52, 24.35],
            张家口: [114.87, 40.82],
            阳泉: [113.57, 37.85],
            莱州: [119.942327, 37.177017],
            湖州: [120.1, 30.86],
            汕头: [116.69, 23.39],
            昆山: [120.95, 31.39],
            宁波: [121.56, 29.86],
            湛江: [110.359377, 21.270708],
            揭阳: [116.35, 23.55],
            荣成: [122.41, 37.16],
            连云港: [119.16, 34.59],
            葫芦岛: [120.836932, 40.711052],
            常熟: [120.74, 31.64],
            东莞: [113.75, 23.04],
            河源: [114.68, 23.73],
            淮安: [119.15, 33.5],
            泰州: [119.9, 32.49],
            南宁: [108.33, 22.84],
            营口: [122.18, 40.65],
            惠州: [114.4, 23.09],
            江阴: [120.26, 31.91],
            蓬莱: [120.75, 37.8],
            韶关: [113.62, 24.84],
            嘉峪关: [98.289152, 39.77313],
            广州: [113.23, 23.16],
            延安: [109.47, 36.6],
            太原: [112.53, 37.87],
            清远: [113.01, 23.7],
            中山: [113.38, 22.52],
            昆明: [102.73, 25.04],
            寿光: [118.73, 36.86],
            盘锦: [122.070714, 41.119997],
            长治: [113.08, 36.18],
            深圳: [114.07, 22.62],
            珠海: [113.52, 22.3],
            宿迁: [118.3, 33.96],
            咸阳: [108.72, 34.36],
            铜川: [109.11, 35.09],
            平度: [119.97, 36.77],
            佛山: [113.11, 23.05],
            海口: [110.35, 20.02],
            江门: [113.06, 22.61],
            章丘: [117.53, 36.72],
            肇庆: [112.44, 23.05],
            大连: [121.62, 38.92],
            临汾: [111.5, 36.08],
            吴江: [120.63, 31.16],
            石嘴山: [106.39, 39.04],
            沈阳: [123.38, 41.8],
            苏州: [120.62, 31.32],
            茂名: [110.88, 21.68],
            嘉兴: [120.76, 30.77],
            长春: [125.35, 43.88],
            胶州: [120.03336, 36.264622],
            银川: [106.27, 38.47],
            张家港: [120.555821, 31.875428],
            三门峡: [111.19, 34.76],
            锦州: [121.15, 41.13],
            南昌: [115.89, 28.68],
            柳州: [109.4, 24.33],
            三亚: [109.511909, 18.252847],
            自贡: [104.778442, 29.33903],
            吉林: [126.57, 43.87],
            阳江: [111.95, 21.85],
            泸州: [105.39, 28.91],
            西宁: [101.74, 36.56],
            宜宾: [104.56, 29.77],
            呼和浩特: [111.65, 40.82],
            成都: [104.06, 30.67],
            大同: [113.3, 40.12],
            镇江: [119.44, 32.2],
            桂林: [110.28, 25.29],
            张家界: [110.479191, 29.117096],
            宜兴: [119.82, 31.36],
            北海: [109.12, 21.49],
            西安: [108.95, 34.27],
            金坛: [119.56, 31.74],
            东营: [118.49, 37.46],
            牡丹江: [129.58, 44.6],
            遵义: [106.9, 27.7],
            绍兴: [120.58, 30.01],
            扬州: [119.42, 32.39],
            常州: [119.95, 31.79],
            潍坊: [119.1, 36.62],
            重庆: [106.54, 29.59],
            台州: [121.420757, 28.656386],
            南京: [118.78, 32.04],
            滨州: [118.03, 37.36],
            贵阳: [106.71, 26.57],
            无锡: [120.29, 31.59],
            本溪: [123.73, 41.3],
            克拉玛依: [84.77, 45.59],
            渭南: [109.5, 34.52],
            马鞍山: [118.48, 31.56],
            宝鸡: [107.15, 34.38],
            焦作: [113.21, 35.24],
            句容: [119.16, 31.95],
            北京: [116.46, 39.92],
            徐州: [117.2, 34.26],
            衡水: [115.72, 37.72],
            包头: [110, 40.58],
            绵阳: [104.73, 31.48],
            乌鲁木齐: [87.68, 43.77],
            枣庄: [117.57, 34.86],
            杭州: [120.19, 30.26],
            淄博: [118.05, 36.78],
            鞍山: [122.85, 41.12],
            溧阳: [119.48, 31.43],
            库尔勒: [86.06, 41.68],
            安阳: [114.35, 36.1],
            开封: [114.35, 34.79],
            济南: [117, 36.65],
            德阳: [104.37, 31.13],
            温州: [120.65, 28.01],
            九江: [115.97, 29.71],
            邯郸: [114.47, 36.6],
            临安: [119.72, 30.23],
            兰州: [103.73, 36.03],
            沧州: [116.83, 38.33],
            临沂: [118.35, 35.05],
            南充: [106.110698, 30.837793],
            天津: [117.2, 39.13],
            富阳: [119.95, 30.07],
            泰安: [117.13, 36.18],
            诸暨: [120.23, 29.71],
            郑州: [113.65, 34.76],
            哈尔滨: [126.63, 45.75],
            聊城: [115.97, 36.45],
            芜湖: [118.38, 31.33],
            唐山: [118.02, 39.63],
            平顶山: [113.29, 33.75],
            邢台: [114.48, 37.05],
            德州: [116.29, 37.45],
            济宁: [116.59, 35.38],
            荆州: [112.239741, 30.335165],
            宜昌: [111.3, 30.7],
            义乌: [120.06, 29.32],
            丽水: [119.92, 28.45],
            洛阳: [112.44, 34.7],
            秦皇岛: [119.57, 39.95],
            株洲: [113.16, 27.83],
            石家庄: [114.48, 38.03],
            莱芜: [117.67, 36.19],
            常德: [111.69, 29.05],
            保定: [115.48, 38.85],
            湘潭: [112.91, 27.87],
            金华: [119.64, 29.12],
            岳阳: [113.09, 29.37],
            长沙: [113, 28.21],
            衢州: [118.88, 28.97],
            廊坊: [116.7, 39.53],
            菏泽: [115.480656, 35.23375],
            合肥: [117.27, 31.86],
            武汉: [114.31, 30.52],
            大庆: [125.03, 46.58]
          };
          var data = [];
          for (var key in geoCoordMap) {
            data.push({ name: key, value: geoCoordMap[key] });
          }
          return data;
        }
        var map = this.$echarts.init(document.getElementById("map"));
        // 指定图表的配置项和数据
        var option = {
          title:{
            text:'用户分布'
          },
          tooltip: {
            show: false
          },
          geo: {
            map: "china",
            roam: false,// 一定要关闭拖拽
            zoom: 1.23,
            center: [105, 36], // 调整地图位置
            label: {
              normal: {
                show: false, //关闭省份名展示
                fontSize: "10",
                color: "rgba(0,0,0,0.7)"
              },
              emphasis: {
                show: false
              }
            },
            itemStyle: {
              normal: {
                areaColor: "#0d0059",
                borderColor: "#389dff",
                borderWidth: 1, //设置外层边框
                shadowBlur: 5,
                shadowOffsetY: 8,
                shadowOffsetX: 0,
                shadowColor: "#01012a"
              },
              emphasis: {
                areaColor: "#184cff",
                shadowOffsetX: 0,
                shadowOffsetY: 0,
                shadowBlur: 5,
                borderWidth: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          },
          series: [
            {
              type: "map",
              map: "china",
              roam: false,
              zoom: 1.23,
              center: [105, 36],
              // geoIndex: 1,
              // aspectScale: 0.75, //长宽比
              showLegendSymbol: false, // 存在legend时显示
              label: {
                normal: {
                  show: false
                },
                emphasis: {
                  show: false,
                  textStyle: {
                    color: "#fff"
                  }
                }
              },
              itemStyle: {
                normal: {
                  areaColor: "#0d0059",
                  borderColor: "#389dff",
                  borderWidth: 0.5
                },
                emphasis: {
                  areaColor: "#17008d",
                  shadowOffsetX: 0,
                  shadowOffsetY: 0,
                  shadowBlur: 5,
                  borderWidth: 0,
                  shadowColor: "rgba(0, 0, 0, 0.5)"
                }
              }
            }
          ]
        };
        map.setOption(option);
        var dataValue = dealWithData();
        var data1 = dataValue.splice(0, 6);
        var option = {
          series: [
            {
              type: "map",
              map: "china",
              roam: false,
              zoom: 1.23,
              center: [105, 36],
              // geoIndex: 1,
              // aspectScale: 0.75, //长宽比
              showLegendSymbol: false, // 存在legend时显示
              label: {
                normal: {
                  show: false
                },
                emphasis: {
                  show: false
                }
              },
              itemStyle: {
                normal: {
                  areaColor: "#94A993",
                  borderColor: "#DBE1CE",
                  borderWidth: 0.5
                },
                emphasis: {
                  areaColor: "#17008d",
                  shadowOffsetX: 0,
                  shadowOffsetY: 0,
                  shadowBlur: 5,
                  borderWidth: 0,
                  shadowColor: "rgba(0, 0, 0, 0.5)"
                }
              }
            },
            {
              name: "",
              type: "scatter",
              coordinateSystem: "geo",
              data: dataValue,
              //   symbolSize: function(val) {
              //     return val[2] / 10;
              //   },
              symbol: "circle",
              symbolSize: 8,
              hoverSymbolSize: 10,
              tooltip: {
                formatter(value) {
                  return value.data.name + "<br/>" + "入驻企业：" + "22";
                },
                show: true
              },
              encode: {
                value: 2
              },
              label: {
                formatter: "{b}",
                position: "right",
                show: false
              },
              itemStyle: {
                color: "#336E30"
              },
              emphasis: {
                label: {
                  show: false
                }
              }
            },
            {
              name: "Top 5",
              type: "effectScatter",
              coordinateSystem: "geo",
              data: data1,
              symbolSize: 15,
              tooltip: {
                show: false
              },
              encode: {
                value: 2
              },
              showEffectOn: "render",
              rippleEffect: {
                brushType: "stroke",
                color: "#336E30",
                period: 9,
                scale: 5
              },
              hoverAnimation: true,
              label: {
                formatter: "{b}",
                position: "right",
                show: true
              },
              itemStyle: {
                color: "#336E30",
                shadowBlur: 2,
                shadowColor: "#333"
              },
              zlevel: 1
            }
          ]
        };
        // 使用刚指定的配置项和数据显示图表。
        map.setOption(option);
      },
      set_dimension(){
        var dimension = this.$echarts.init(document.getElementById("dimension"));
        var option_dimension= {
          title:{
            text:"各维度碳排放统计"
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              // Use axis to trigger tooltip
              type: 'shadow' // 'shadow' as default; can also be 'line' or 'shadow'
            }
          },

          legend: {
            orient: 'vertical',
            right: 10,
            top: 'center'
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '1%',
            containLabel: true,
            x:50,
            y:50,
            x2:50,
            y2:20,
            borderWidth:10
          },
          xAxis: {
            type: 'value'
          },
          yAxis: {
            type: 'category',
            data: ['固定燃烧', '移动燃烧', '电热间接排放', '能源加工排放', '工艺排放', '差旅通勤', '新能源减排']
          },
          series: [
            {
              center:[50,60],
              barWidth: 20,
              name: 'CO2',
              type: 'bar',
              stack: 'total',
              label: {
                show: true
              },
              emphasis: {
                focus: 'series'
              },
              data: [320, 302, 301, 334, 390, 330, 320]
            },
            {
              name: 'CH4',
              type: 'bar',
              stack: 'total',
              label: {
                show: true
              },
              emphasis: {
                focus: 'series'
              },
              data: [120, 132, 101, 134, 90, 230, 210]
            },
            {
              name: 'N2O',
              type: 'bar',
              stack: 'total',
              label: {
                show: true
              },
              emphasis: {
                focus: 'series'
              },
              data: [220, 182, 191, 234, 290, 330, 310]
            },
          ]
        };
        dimension.setOption(option_dimension)
      },
      set_industry_proportion(){
        var industry_proportion = this.$echarts.init(document.getElementById("industry_proportion"));
        var option_industry_proportion ={
          title: {
            text: '各行业碳排放占比'
          },
          legend: {
            top: 'bottom'
          },
          toolbox: {
            show: true,
            feature: {
              mark: { show: true },
              saveAsImage: { show: true }
            }
          },
          grid: {
            x: 25,
            y: 45,
            x2: 5,
            y2: 25,
            borderWidth: 1,
          },
          series: [
            {
              name: 'Nightingale Chart',
              type: 'pie',
              radius: [20, 100],
              center: ['50%', '40%'],
              roseType: 'area',
              itemStyle: {
                borderRadius: 8
              },
              data: this.hangye
              //     [
              //   { value: 40, name: '发电企业' },
              //   { value: 38, name: '电网企业' },
              //   { value: 32, name: '钢铁生产企业' },
              //   { value: 30, name: '化工生产企业' },
              //   { value: 28, name: '电解铝生产企业' },
              //   { value: 26, name: '镁冶炼企业' },
              //   { value: 22, name: '平板玻璃生产' },
              //   { value: 18, name: '水泥生产企业' },
              //   { value: 11, name: '陶瓷生产企业' },
              //   { value: 16, name: '民航企业' }
              // ]
            }
          ]
        };
        industry_proportion.setOption(option_industry_proportion)
      },
      set_sumUser(){
        var sumUser = this.$echarts.init(document.getElementById("sumUser"));
        var option_sumUser = {
          title: {
            text: '本月用户情况统计'
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross',
              label: {
                backgroundColor: '#6a7985'
              }
            }
          },
          legend: {
            data: ['新增用户','活跃用户', '不活跃用户']
          },
          toolbox: {
            feature: {
              saveAsImage: {}
            }
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: [
            {
              type: 'category',
              boundaryGap: false,
              data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            }
          ],
          yAxis: [
            {
              type: 'value'
            }
          ],
          series: [
            {
              name: '新增用户',
              type: 'line',
              stack: 'Total',
              areaStyle: {},
              emphasis: {
                focus: 'series'
              },
              data: [120, 132, 101, 134, 90, 230, 210]
            },
            {
              name: '活跃用户',
              type: 'line',
              stack: 'Total',
              areaStyle: {},
              emphasis: {
                focus: 'series'
              },
              data: [220, 182, 191, 234, 290, 330, 310]
            },
            {
              name: '不活跃用户',
              type: 'line',
              stack: 'Total',
              areaStyle: {},
              emphasis: {
                focus: 'series'
              },
              data: [150, 232, 201, 154, 190, 330, 410]
            },

          ]
        };
        sumUser.setOption(option_sumUser)
      },
      set_sumDischarge() {
        const data = [["2000-06-05", 116], ["2000-06-06", 129], ["2000-06-07", 135], ["2000-06-08", 86], ["2000-06-09", 73], ["2000-06-10", 85], ["2000-06-11", 73], ["2000-06-12", 68], ["2000-06-13", 92], ["2000-06-14", 130], ["2000-06-15", 245], ["2000-06-16", 139], ["2000-06-17", 115], ["2000-06-18", 111], ["2000-06-19", 309], ["2000-06-20", 206], ["2000-06-21", 137], ["2000-06-22", 128], ["2000-06-23", 85], ["2000-06-24", 94], ["2000-06-25", 71], ["2000-06-26", 106], ["2000-06-27", 84], ["2000-06-28", 93], ["2000-06-29", 85], ["2000-06-30", 73], ["2000-07-01", 83], ["2000-07-02", 125], ["2000-07-03", 107], ["2000-07-04", 82], ["2000-07-05", 44], ["2000-07-06", 72], ["2000-07-07", 106], ["2000-07-08", 107], ["2000-07-09", 66], ["2000-07-10", 91], ["2000-07-11", 92], ["2000-07-12", 113], ["2000-07-13", 107], ["2000-07-14", 131], ["2000-07-15", 111], ["2000-07-16", 64], ["2000-07-17", 69], ["2000-07-18", 88], ["2000-07-19", 77], ["2000-07-20", 83], ["2000-07-21", 111], ["2000-07-22", 57], ["2000-07-23", 55], ["2000-07-24", 60]];
        const dateList = data.map(function (item) {
          return item[0];
        });
        const valueList = data.map(function (item) {
          return item[1];
        });
        var sumDischarge = this.$echarts.init(document.getElementById("sumDischarge"));

        var option_sumDischarge= {
          // Make gradient line here
          visualMap: [
            {
              show: false,
              type: 'continuous',
              seriesIndex: 0,
              min: 0,
              max:500
            },
          ],
          title: [
            {
              left: 'center',
              text: '本月碳排放统计'
            },
          ],
          tooltip: {
            trigger: 'axis'
          },
          xAxis: [
            {
              data:dateList
            },
          ],
          yAxis: [
            {},
          ],
          grid: [
            {
              bottom: '10%'
            },
          ],
          series: [
            {
              type: 'line',
              showSymbol: false,
              data: valueList,
              areaStyle: {
                color: {
                  type: 'linear',
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [{
                    offset: 0, color: 'rgba(210,116,106,0.5)' // 0% 处的颜色
                  }, {
                    offset: 1, color: 'rgba(210,116,106,0)' // 100% 处的颜色
                  }],
                  global: false // 缺省为 false
                }
              },
            },
          ]
        };
        sumDischarge.setOption(option_sumDischarge)
      },
    },
      changeDate() {
            const now = new Date().getTime();
            this.data.forEach((item, index) => {
                const date = new Date(now - (6 - index) * 86400000);
                item.name = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
            });
        }
        // handleListener() {
        //     bus.$on('collapse', this.handleBus);
        //     // 调用renderChart方法对图表进行重新渲染
        //     window.addEventListener('resize', this.renderChart);
        // },
        // handleBus(msg) {
        //     setTimeout(() => {
        //         this.renderChart();
        //     }, 200);
        // },
        // renderChart() {
        //     this.$refs.bar.renderChart();
        //     this.$refs.line.renderChart();
        // }
};
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
