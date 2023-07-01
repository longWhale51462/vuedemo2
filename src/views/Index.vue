<template>
   <div class="indexBox">
       <Nav></Nav>
       <el-container>
          <el-header class="el-header">
            <span @click="$router.push('/index');" style="cursor: pointer;"><i class="el-icon-house"></i>首页</span> 
            <img :src="user.img" alt="" style="width:40px; height:40px;" @click="hide=1;">
            <span> {{ user.username }}</span>
            <span style="cursor: pointer;" v-show="hide!=0"><input type="file" @change="changeImg"> </span> 
            <span @click="out" style="cursor: pointer;">[注销] </span> 
          </el-header>
       </el-container>
       <div class="router-view">
        
       <router-view></router-view>
    </div>
   </div>
</template>

<script>
import axios from '../hooks/http'
import { mapMutations, mapState } from 'vuex'
import Nav from "./Nav.vue"

export default {
    components:{
        Nav,
    },
    data(){
        return{
            hide:0
        }
    },
   computed:{
    ...mapState(['user','userList'])
   },
   methods:{
    ...mapMutations(['set_user']),
    out(){
      this.$router.push('/login');
      localStorage.removeItem("token");
    },
    changeImg(e){
       let file= e.target.files[0];
       console.log(file);
       if(file){
       axios.post("/user/fun/img",{
         file
       },{headers:{
         "Content-Type":"multipart/form-data"
       }}).then(res=>{
          if(res.data.code==200){
             this.getUser();
          }
       })
       }
       this.hide=0;
    },
    getUser(){
      axios.get("/user/fun/info").then(res=>{
        let user=res.data.data;
         user.img="http://localhost:8080/"+user.img
         console.log(user);
         this.set_user(user);
      })
    }
   },
   beforeMount() {
   //   this.set_user(this.userList.filter(u=>u.username==sessionStorage.getItem("username"))[0]);
     this.getUser();
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
   .navBox{
       width: 200px;
       grid-row: 1/3;
       grid-column: 1/2;
   }
   .indexBox{
    /* display:flex; */
     display: grid;
     height: 100vh;
     width: 100%;
     grid-template-rows: 1fr 15fr;
     grid-template-columns: 200px auto;
     
   }
  
   .router-view{
     position: relative;
   }
   .router-view::after{
    content: "";
    display:block;
    width: 100%;
    height: 100%;
    background: url("../assets/1.avif");
    background-size: cover;
    opacity: 0.4;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -2;
 }
 .el-header {
   margin: 0;padding: 0;
      width:100%;
      height:54px;
      line-height: 54px;
      background:rgb(156,168,189);
      display: flex;
      justify-content:flex-end;
      padding: 3px;
   }
   .el-header img{
      margin:7px;
     border-radius: 100%;
     overflow: hidden;
   }
   .el-header span{
     margin-right:30px;
   }
   
</style>