<template>
  <div>
    <el-row gutter="20">
      <el-col span="24">
        <el-card shadow="hover" :body-style="{padding: '0px'}">
          <el-table
              :data="tableData"
              style="width: 100%">
            <el-table-column
                label="日期"
                width="300"
            >
              <template slot-scope="scope">
                <i class="el-icon-time"></i>
                <span style="margin-left: 10px">{{ scope.row.date }}</span>
              </template>
            </el-table-column>
            <el-table-column
                label="标题"
                prop="name"
            >
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
        </el-card>
      </el-col>
    </el-row>
    <el-row>
      <el-col span="24">
        <div>
          <div class="container">
            <quill-editor ref="myTextEditor" v-model="content" :options="editorOption"></quill-editor>
            <el-button class="editor-btn" type="primary" @click="submit">提交</el-button>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
    import 'quill/dist/quill.core.css';
    import 'quill/dist/quill.snow.css';
    import 'quill/dist/quill.bubble.css';
    import { quillEditor } from 'vue-quill-editor';
    export default {
        name: 'editor',
        data: function(){
            return {
                content: '',
                editorOption: {
                    placeholder: '请输入内容'
                },
              tableData: [{
                date: '2023-03-02',
                name: '《博鳌论“碳”:寻找碳减排路径上的“最优解”》',
              }, {
                date: '2023-03-04',
                name: '《宁高宁:碳关税并不会促进碳减排,反而会带来新一轮贸易战》',
              }, {
                date: '2023-03-01',
                name: '《秸秆上做文章,找到农业减碳新路》',
              }, {
                date: '2023-03-03',
                name: '《中国正积极推进建设全国统一的温室气体自愿减排交易市场》',
              }]
            }
        },
        components: {
            quillEditor
        },
        methods: {
            onEditorChange({ editor, html, text }) {
                this.content = html;
            },
            submit(){
                console.log(this.content);
                this.$message.success('提交成功！');
            }
        }
    }
</script>
<style scoped>
    .editor-btn{
        margin-top: 20px;
    }
</style>
