<template>
 <div>
   <vue-particles
       class="login-background"
       color="#97D0F2"
       :particleOpacity="0.7"
       :particlesNumber="50"
       shapeType="circle"
       :particleSize="4"
       linesColor="#97D0F2"
       :linesWidth="1"
       :lineLinked="true"
       :lineOpacity="0.4"
       :linesDistance="150"
       :moveSpeed="3"
       :hoverEffect="true"
       hoverMode="grab"
       :clickEffect="true"
       clickMode="push">
   </vue-particles>
   <div>
     <div class="login-other">
       <div class="loginTitle">碳核算后台管理系统</div>
       <el-form  ref="login" label-width="0px" class="loginContainer">
         <el-form-item prop="username">
           <el-input v-model="username" placeholder="username">
             <el-button slot="prepend" icon="el-icon-lx-people"></el-button>
           </el-input>
         </el-form-item>
         <el-form-item prop="password">
           <el-input
               type="password"
               placeholder="password"
               v-model="password"
               @keyup.enter.native="submitForm()"
           >
             <el-button slot="prepend" icon="el-icon-lx-lock"></el-button>
           </el-input>
         </el-form-item>
         <div class="login-btn">
           <el-button type="primary" @click="submitForm()">登录</el-button>
         </div>
       </el-form>
     </div>
   </div>
 </div>
</template>

<script>
import axios from "axios";

export default {
    // data: function() {
    //     return {
    //             username: '',
    //             password: '',
    //         rules: {
    //             username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
    //             password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
    //         },
    //     };
    // },
  data() {
    return {
      username: "",
      password:"",
    };
  },
    methods: {
        submitForm() {
          axios.post( "/api/user/getUser",
              {
                user:this.username,
              },
              {}).then(
              (res)=>{
                if(res.status==200&&res.data[0].password==this.password){
                  console.log(res.data[0].password)
                  localStorage.setItem('ms_username', this.username);
                  this.$router.push('/');
                }
          }
          ).catch(error => {
            // 请求失败，
            alert("用户不存在")
          })
        },
    },
};
</script>

<style scoped>
.loginTitle {
  margin: 15px auto 20px auto;
  text-align: center;
  color: #707070;
}
.login-background {
  background: linear-gradient(-180deg, #dcf2e6 0%, #ffffff 100%);
  width: 100%;
  height: 100%; /**宽高100%是为了图片铺满屏幕 */
  z-index: -1;
  position: absolute;
}
.login-other {
  z-index: 1;
  margin: 180px 0 0 calc(calc(100vw - 410px) / 2);
  position: absolute;
}
.loginContainer {
  border-radius: 15px;
  background-clip: padding-box;
  width: 350px;
  padding: 15px 35px 15px 35px;
  background: #fefefe;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}
.login-wrap {
    position: relative;
    width: 100%;
    height: 100%;
    background-image: url(../../assets/img/login-bg.jpg);
    background-size: 100%;
}
.ms-title {
    width: 100%;
    line-height: 50px;
    text-align: center;
    font-size: 20px;
    color: #fff;
    border-bottom: 1px solid #ddd;
}
.ms-login {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 350px;
    margin: -190px 0 0 -175px;
    border-radius: 5px;
    background: rgba(255, 255, 255, 0.3);
    overflow: hidden;
}
.ms-content {
    padding: 30px 30px;
}
.login-btn {
    text-align: center;
}
.login-btn button {
    width: 100%;
    height: 36px;
    margin-bottom: 10px;
}
.login-tips {
    font-size: 12px;
    line-height: 30px;
    color: #fff;
}
</style>
