<template>
   <div class="logBox">
    <h2>青芽医疗登录</h2>
    <el-form  status-icon  ref="ruleForm" label-width="100px" class="demo-ruleForm">
  <el-form-item label="用户名" prop="pass">
    <el-input type="text"  autocomplete="off" v-model="username"></el-input>
  </el-form-item>
  <el-form-item label="密码" prop="checkPass">
    <el-input type="password"  autocomplete="off" v-model="pwd"></el-input>
  </el-form-item>
  <el-form-item >
    <el-button type="primary" style="margin-right: 70px;" @click="login()">登录</el-button>
    <el-button  @click="$router.push('/reg')">注册</el-button>
  </el-form-item>
</el-form>
   </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
import axios from "../hooks/http";
export default {
      data() {
        return {
            username: '',
            pwd:'',
            files:null
        };
      },
      computed:{
        // ...mapState(['userList'])
      },
      methods:{
        // ...mapMutations(['set_user']),
         login(){
            axios.post("/user/log",{
               account:this.username,
               pwd:this.pwd
            },{headers:{
              "Content-Type":"application/x-www-form-urlencoded"
              }}).then(res=>{
                if(res.data.code==200){
                  localStorage.setItem("token",res.data.data);
                 
                    this.$router.push("/index");
                }else
                alert( res.data.msg);
              
            })
         }
      }
}
</script>

<style scoped>
   .logBox{
    width: 400px;
    height: 250px;
    border: 1px solid;
    padding: 30px;
    margin: 30vh auto;
    border-radius: 10px;
    background: white;
   }

  
   
</style>