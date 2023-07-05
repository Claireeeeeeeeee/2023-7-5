<template>
<div>

  <el-row gutter="20">
    <el-col span="12">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="图片标题">
          <el-input v-model="formInline.user" placeholder="请输入标题"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search">搜索</el-button>
          <el-button type="primary" @click="onSubmit()">上传<i class="el-icon-upload el-icon--right"></i></el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>

  <el-dialog title="图片上传" :visible.sync="dialogFormVisible">
    <el-row gutter="20">
      <el-upload
          class="upload-demo"
          action="https://jsonplaceholder.typicode.com/posts/"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :on-success="handleSuccess"
          :file-list="fileList"
          list-type="picture">
        <el-button size="small" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>
    </el-row>
    <el-row gutter="20" style="margin-top: 10px">
      <el-form :model="form">
        <el-form-item label="标题" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="描述" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-row>
  </el-dialog>

  <el-row gutter="20">
    <el-col >
     <el-card shadow="hover" :body-style="{padding: '0px'}">
       <template >
         <el-table
             :data="tableData"
             style="width: 100%">
           <el-table-column prop="address" label="图片" sortable width="180" align="center" header-align="center">
             <template slot-scope="scope">
               <el-popover
                   placement="right"
                   width="200"
                   trigger="hover">
                 <img :src="scope.row.pic" class="imgStyle"/>
                 <img slot="reference" :src="scope.row.pic" style="max-height: 50px;max-width: 150px">
               </el-popover>
             </template>
           </el-table-column>
           <el-table-column
               prop="name"
               label="标题"
               width="180">
           </el-table-column>
           <el-table-column
               prop="info"
               label="使用描述">
           </el-table-column>
           <el-table-column label="操作">
             <template slot-scope="scope">
               <el-button
                   size="mini"
                   @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
               <el-button
                   size="mini"
                   type="danger"
                   @click="handleDelete(scope.$index, scope.row)">删除</el-button>
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
export default {
  name: "pic",
  data() {
    return {
      dialogFormVisible: false,
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      formLabelWidth: '120px',
      formInline: {
        user: '',
        region: ''
      },
      fileList: [{name:'P1',url:'/pic/1.jpg'}],
      tableData: [{
        id:1,
        pic: './pic/1.jpg',
        name: 'CO2',
        info: '选择绿色低碳，为创造美好未来贡献一份力量！'
      }, {
        id:2,
        pic: './pic/2.jpg',
        name: '碳减排',
        info: '节能减排，绿色生活，为未来子孙创造清洁蓝天！'
      }, {
        id:3,
        pic:'./pic/3.jpg',
        name: '碳汇',
        info: '低碳生活，健康共赢，助力减少碳排放，共建可持续未来'
      },{
        id:4,
        pic: './pic/4.jpg',
        name: '碳中和',
        info: '每度温暖都有责任，共同行动，建设低碳生活'
      },
        {
          id:5,
          pic: './pic/5.jpg',
          name: '碳达峰',
          info: '勇敢踏出减碳第一步，为地球的未来贡献一份可持续的力量'
        }]
    }
  },

  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    onSubmit() {
      console.log('submit!');
      this.dialogFormVisible=true;
    },

    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    // handleSuccess(response){
    //   //拼接得到图片信息对象
    //   const picInfo = {pic:response.data.tmp_path};
    //   //将图片信息对象，push到pics数组中
    //   this.addForm.pics.push(picInfo);
    //   //console.log(this.addForm)
    // }
  }
}
</script>

<style scoped>

</style>
