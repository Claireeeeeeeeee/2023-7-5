<template>
  <div>
    <el-row :gutter="20">
        <el-col :span="12">
          <el-input v-model="name" placeholder="请输入企业名称"></el-input>
        </el-col>
        <el-col span="12">
          <el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>
          <el-button @click="dialogFormVisible = true">增加</el-button>
        </el-col>
    </el-row>

    <el-dialog title="公司信息" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="企业名称" :label-width="formLabelWidth">
          <el-input v-model="form.qqname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="注册时间" :label-width="formLabelWidth">
          <el-input v-model="form.time_zz" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="注册手机号" :label-width="formLabelWidth">
          <el-input v-model="form.sjh" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth">
          <el-input v-model="form.yx" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="企业邮箱" :label-width="formLabelWidth">
          <el-input v-model="form.qyyx" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="代理人" :label-width="formLabelWidth">
          <el-input v-model="form.dlr" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="联系方式" :label-width="formLabelWidth">
          <el-input v-model="form.lxfs" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="企业地址" :label-width="formLabelWidth">
          <el-input v-model="form.qqdq" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false;onSubmit()">确 定</el-button>
      </div>
    </el-dialog>

    <el-row gutter="20">
      <el-col span="24">
        <el-card shadow="hover" :body-style="{padding: '3px'}">
          <template>
            <el-table
                :data="tableData"
                style="width: 100%">
              <el-table-column type="expand" >
                <template slot-scope="props" >
                    <el-form ref="form" label-width="300px" size="mini" style="width: 900px">
                      <el-form-item label="企业名称">
                        <el-input v-bind:value=props.row.qqname></el-input>
                      </el-form-item>
                      <el-form-item label="企业地区">
                        <el-input v-bind:value=props.row.qqdq></el-input>
                      </el-form-item>
                      <el-form-item label="企业代理人名字">
                        <el-input v-bind:value=props.row.dlr></el-input>
                      </el-form-item>
                      <el-form-item label="注册手机号">
                        <el-input v-bind:value=props.row.sjh></el-input>
                      </el-form-item>
                      <el-form-item label="联系方式">
                        <el-input v-bind:value=props.row.lxfs></el-input>
                      </el-form-item>
                      <el-form-item label="注册邮箱">
                        <el-input v-bind:value=props.row.yx></el-input>
                      </el-form-item>
                      <el-form-item label="企业邮箱">
                        <el-input v-bind:value=props.row.qyyx></el-input>
                      </el-form-item>
                      <el-form-item>
                        <el-button type="primary" >确认修改</el-button>
                        <el-button>取消</el-button>
                      </el-form-item>
                    </el-form>
                </template>


              </el-table-column>
              <el-table-column
                  label="企业 ID"
                  prop="id">
              </el-table-column>
              <el-table-column
                  label="注册时间"
                  prop="time_zz">
              </el-table-column>
              <el-table-column
                  label="企业名称"
                  prop="qqname">
              </el-table-column>
              <el-table-column
                  prop="tag"
                  label="等级"
                  width="100"
                  :filters="[]"
                  :filter-method="filterTag"
                  filter-placement="bottom-end">
                <template slot-scope="scope">
                  <el-tag
                      disable-transitions>{{scope.row.tag}}</el-tag>
                </template>
              </el-table-column>
              <el-table-column
                  label="操作">
                <template slot-scope="scope">
                  <el-button type="text" size="small">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </template>

        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import router from "@/router";
import axios from "axios";

export default {
  name: "info",
  methods:{
    filterTag(value, row) {
      return row.tag === value;
    },
    select(){
      router.push('/company')
    },
    onSubmit() {
      axios.post("/api/user/addCompany", {
        time_zz: this.form.time_zz,
        qqname: this.form.qqname,
        sjh: this.form.sjh,
        yx: this.form.yx,
        qyyx: this.form.qyyx,
        dlr: this.form.dlr,
        lxfs: this.form.lxfs,
        qqdq: this.form.qqdq,
        tag:"Lv1"
      }, {}).then(res => {
        if (res.status == 200) {
          console.log("1")
          this.tableData.push(this.form)
        }

      }).catch(
          console.log("2")
      )
    },
    search(){
      axios.post("/api/user/searchCompany",{name:this.name},{}).then(
          res=>{
        console.log(res)
        this.tableData=res.data
      })
    }
  },
  data() {
    return {
      formLabelWidth: '120px',
      name: '',
      dialogFormVisible: false,
      tableData: [],
      form:{
        id:'',
        time_zz:'',
        qqname:'',
        sjh:'',
        yx:'',
        qyyx:'',
        dlr:'',
        lxfs:'',
        qqdq:'',
        tag:''
      }
    }
  },
  created() {
    axios.get("/api/user/getCompany", {}).then(
        res=>{
          console.log(res)
          this.tableData=res.data
        }
    )
  }
}
</script>

<style scoped>
.el-row {
  margin-bottom: 20px;&:last-child {
   margin-bottom: 0;}
}
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}


</style>
