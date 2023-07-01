<template>
    <div class="logBox">
     <h2>青芽医疗注册</h2>
     <el-form  status-icon  ref="ruleForm" label-width="100px" class="demo-ruleForm">
   <el-form-item label="用户名" prop="pass">
     <el-input type="text"  autocomplete="off" v-model="username"></el-input>
   </el-form-item>
   <el-form-item label="密码" prop="checkPass">
     <el-input type="password"  autocomplete="off" v-model="pwd"></el-input>
   </el-form-item>
   <el-form-item >
     <el-button type="primary" style="margin-right: 70px;" @click="reg()">注册</el-button>
     <el-button  @click="$router.push('/login')">返回登录</el-button>
   </el-form-item>
 </el-form>
    </div>
 </template>
 
 <script>
 import { mapGetters, mapMutations, mapState } from 'vuex';
 export default {
       data() {
         return {
             username: '',
             pwd:''
         };
       },
       computed:{
         ...mapState(['userList']),
         ...mapGetters(['newId'])
       },
       methods:{
          reg(){
             let arr=this.userList.filter(u=>u.username==this.username);
            if(arr.length){
                alert("用户名已占用");
            }else{
               this.add_user({id:newId,username:this.username,pwd:this.pwd});
               this.$router.push('/login')
            }
          },
          ...mapMutations(['add_user'])
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