<template>
<div>
  <el-row gutter="20">
    <el-col :span="8">
      <el-card shadow="hover" :body-style="{padding: '0px'}">
        <div class="grid-content grid-con-1">
          <i class="el-icon-box grid-con-icon" style="background: #A0BF7B"></i>
          <div class="grid-cont-right">
            <el-col span="16">
              <div class="grid-num">{{year_pay}}</div>
              <div>年卡</div>
            </el-col>
            <el-col span="8">
              <el-button style="margin-top: 10px" @click="year()">调整</el-button>
            </el-col>
          </div>
        </div>
      </el-card>
      <el-dialog
          title="提示"
          :visible.sync="dialogVisible1"
          width="30%"
          :before-close="handleClose">
        <div>价格</div>
        <el-input v-model="input1" placeholder="请输入内容"></el-input>
        <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible1 = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible1 = false">确 定</el-button>
  </span>
      </el-dialog>
    </el-col>
    <el-col :span="8">
      <el-card shadow="hover" :body-style="{padding: '0px'}">
        <div class="grid-content grid-con-1">
          <i class="el-icon-bank-card grid-con-icon" style="background: #518055"></i>
          <div class="grid-cont-right">
            <el-col span="16">
              <div class="grid-num">{{season_pay}}</div>
              <div>季卡</div>
            </el-col>
            <el-col span="8">
              <el-button style="margin-top: 10px" @click="season()">调整</el-button>
            </el-col>
          </div>
        </div>
      </el-card>
    </el-col>
    <el-col :span="8">
      <el-card shadow="hover" :body-style="{padding: '0px'}">
        <div class="grid-content grid-con-2">
          <i class="el-icon-files  grid-con-icon" style="background: #629D6D"></i>
          <div class="grid-cont-right">
            <el-col span="16">
              <div class="grid-num">{{once_pay}}</div>
              <div>按次</div>
            </el-col>
            <el-col span="8">
              <el-button style="margin-top: 10px" @click="once()">调整</el-button>
            </el-col>
          </div>
        </div>
      </el-card>
    </el-col>
  </el-row>
  <el-row gutter="20">
    <el-card shadow="hover" :body-style="{padding: '5px'}">
      <div style="margin: 15px">
        <el-button style="margin-top: 10px" type="primary">发放优惠券</el-button>
      </div>
      <template>
        <el-table
            :data="tableData"
            border
            style="width: 100%">
          <el-table-column
              prop="id"
              label="序号"
              width="80">
          </el-table-column>
          <el-table-column
              prop="name"
              label="活动名称"
              width="180">
          </el-table-column>
          <el-table-column
              prop="begin_date"
              label="开始日期"
              width="180">
          </el-table-column>
          <el-table-column
              prop="end_date"
              label="截止日期"
              width="180">
          </el-table-column>
          <el-table-column
              prop="discount"
              label="优惠折扣">
          </el-table-column>
          <el-table-column
              prop="level"
              label="等级限制">
          </el-table-column>
          <el-table-column
              prop="type"
              label="等级限制">
          </el-table-column>
          <el-table-column
              prop="number"
              label="等级限制">
          </el-table-column>
          <el-table-column
              prop="rest"
              label="等级限制">
          </el-table-column>
          <el-table-column
              fixed="right"
              label="操作"
              width="120">
            <template slot-scope="scope">
              <el-button
                  @click.native.prevent="deleteRow(scope.$index, tableData)"
                  type="text"
                  size="small">
                移除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </el-card>
  </el-row>
</div>
</template>

<script>
export default {
  name: "income_manage",
  data() {
    return {
      input1:'',
      dialogVisible1: false,
      dialogVisible2: false,
      dialogVisible3: false,
      year_pay:'688',
      season_pay:'188',
      once_pay:'49.9',
      tableData: [{
        number:'无限',
        rest:'无限',
        id:'1',
        begin_date:'2023-3-4',
        end_date: '无',
        name: '新用户优惠',
        discount:'80%',
        level:"Lv1",
        type:"季卡"
      },{
        number:'1000',
        rest:'244',
        id:'2',
        begin_date:'2023-4-4',
        end_date: '2023-5-4',
        name: '春季碳减排优惠',
        discount:'90%',
        level:"Lv2",
        type:"按次"
      }, {
        number:'100',
        rest:'4',
        id:'3',
        begin_date:'2023-4-6',
        end_date: '2023-4-7',
        name: '限时优惠',
        discount:'70%',
        level:"Lv1",
        type:"年卡"
      }, {
        number:'600',
        rest:'600',
        id:'4',
        begin_date:'2023-5-1',
        end_date: '2023-5-2',
        name: '五一绿色出游优惠',
        discount:'80%',
        level:"Lv3",
        type:"按次"
      }]
    }
  },
  methods:{deleteRow(index, rows) {
      rows.splice(index, 1);
    },

    year(){
      this.dialogVisible1=true
    },
    season(){
      this.dialogVisible2=true
    },
    once(){
      this.dialogVisible3=true
    }
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
