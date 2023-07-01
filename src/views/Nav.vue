<template>
    <div class="navBox">
     <el-container style="height: 100vh; border: 1px solid #eee">
   <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
     <div style="text-align: center;">
         <h3 style="margin:40px 0;">
             <i class="el-icon-first-aid-kit"></i><span>青芽在线医疗</span>
         </h3>
         <div style="width:100px; height:100px; border-radius: 50%;margin: 15px auto;overflow:hidden">
             <img :src="user.img" alt="" style="width:100%; height:100%;" >
         </div>
         <div style="margin:15px">
             welcome,{{ user.username }}
         </div>
     </div>
     <el-menu >
       <el-submenu index="1">
         <template slot="title"><i class="el-icon-user-solid"></i>用户管理</template>
           <el-menu-item index="1-1" @click="$router.push('/index/userlist');">用户列表</el-menu-item>
           <el-menu-item index="1-2" @click="$router.push('/index/adduser');">添加用户</el-menu-item>  
       </el-submenu>
       <el-submenu index="2">
         <template slot="title"><i class="el-icon-s-tools"></i>系统管理</template>
           <el-menu-item index="2-1" @click="$router.push('/index/doctorlist');">出诊管理</el-menu-item>
           <el-menu-item index="2-2" @click="$router.push('/index/adddoctor');">添加出诊</el-menu-item>
       </el-submenu>
       
     </el-menu>
   </el-aside>
 </el-container>
     
    </div>
 </template>
 
 <script>
 import { mapMutations, mapState } from 'vuex'
 export default {
    computed:{
     ...mapState(['user','userList'])
    },
    methods:{
     ...mapMutations(['set_user'])
    },
    mounted() {
      this.set_user(this.userList.filter(u=>u.username==sessionStorage.getItem("username"))[0]);
    },
 }
 </script>
 
 <style>
    h1{
     color:white;
    }
    .el-submenu__title, .el-menu{
    
     background-color: rgb(238, 241, 246);
   
 }
    .el-submenu__title:hover,.el-menu .el-menu-item:hover{
     background-color: white;
 }
    
 </style>