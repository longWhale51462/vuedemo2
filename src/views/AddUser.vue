<template>
    <div>
        <div class="box1">
            <div class="user_mannger"><span>用户信息管理</span></div>
            <el-form class="box2" style="width: 100%">
                <el-form-item class="txt-input">用户账号：<el-input v-model="account"></el-input></el-form-item>
                 <el-form-item class="txt-input">用户名：<el-input v-model="username"></el-input></el-form-item>
                <el-form-item class="txt-input">用户密码：<el-input v-model="pwd" type="password"></el-input></el-form-item>
                <el-form-item class="txt-input">确认密码：<el-input v-model="pwd2" type="password"></el-input></el-form-item>
                <el-form-item>用户类型：<el-select placeholder="请选择" popper-class="select_text" v-model="userType">
                        <!-- <el-option value="0" label="系统管理员"></el-option>
                        <el-option value="1" label="普通用户"></el-option> -->
                         <el-option v-for="item,index in types" :key="index" :value="item" :label="item"></el-option>
                    </el-select></el-form-item>
                <template v-if="userType=='普通用户'">
                    <el-form-item>就诊科室：<el-select placeholder="请选择" popper-class="select_text" v-model="departmentId">
                        <el-option v-for="item in deps" :key="item.departmentId" 
                        :value="item.departmentId" :label="item.departmentName"></el-option>
                </el-select></el-form-item>
                <el-form-item>出诊医生：<el-select placeholder="请选择" popper-class="select_text" v-model="doctorId">
                        <el-option v-for="item in docs" :key="item.doctorId" :value="item.doctorId" :label="item.doctorName"></el-option>
                </el-select></el-form-item>
                </template>
               
            </el-form>
            <el-button style="margin:0 50px 30px;" @click="add">添加</el-button>
        </div>
    </div>
</template>

<script>
import axios from '../hooks/http';
import {  mapGetters, mapMutations, mapState } from "vuex";
import {getTypes,getDeps,getDoc} from "../hooks/getTypes";
export default {
    data() {
        return {
            // curetype: "",
            // doctorName:"",
            account:"",
            username:"",
            pwd:"",
            pwd2:"",
            userType: "",
            doctorId:"",
            departmentId:"",
            types:[],
            deps:[],
            docs:[]
           
        };
    },
    computed: {
    },
    methods: {
        // ...mapMutations(['push_user']),
        add(){
             if(this.pwd!=this.pwd2) return;  
            // this.push_user({id:this.newId,pwd:this.pwd,username:this.username,
            //     type:this.type,curetype:this.curetype,doctorName:this.doctorName, status:this.type});
            axios.post("user/fun/add",{
                "userType":this.userType,
                "account":this.account,
                "username":this.username,
                "pwd":this.pwd,
                "doctor":{
                    "doctorId":this.doctorId
                },
                "department":{
                    "departmentId":this.departmentId
                }
            }).then(res=>{
                alert(res.data.msg);
                if(res.data.code==200){
                this.account="";
                this.username="";
                this.pwd="";
                this.pwd2="";
                this.userType="";
                this.doctorId="";
                this.departmentId="";
                }
            })
        },
        getDocs(){
               if(!this.departmentId||this.departmentId=="")
            return;
        else
            getDoc(this.departmentId).then(res=>{
                if(res.data.code==200){
                   this.docs=res.data.data;
                }
            })
        }
    },
    watch:{
        departmentId:{
            handler(newval,oldval){
               this.doctorId=null;
               this.getDocs();
            }
        }
    },
    beforeMount(){
        getTypes().then(res=>{
            console.log(res.data.data);
            this.types=res.data.data;
        });
        getDeps().then(res=>{
            this.deps=res.data.data;
        })
    }
};
</script>

<style scoped>
.box1 {
    color: black;
    width: 1000px;
    position: relative;
    margin: 0 auto 20px;
}

.box1::after {
    content: "";
    display: block;
    width: 100%;
    height: 100%;
    opacity: 0.8;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    background: white;
}

.box2 {
    width: fit-content;
    margin: 20px 20px 0;
    padding-bottom: 20px;
}

.user_mannger {
    text-align: center;
    font-size: 25px;
    font-weight: 600;
    line-height: calc(138px * 0.4);
    border-bottom: 1px solid rgb(221, 209, 207);
}

.txt-input .el-input {
    width: 40%;
}

.el-select {
    width: 25%;
}

.select_text {
    color: black;
    font-weight: 500;
}
</style>