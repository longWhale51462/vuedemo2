<template>
    <div>
        <div class="box1">
            <div class="user_mannger"><span>医生出诊信息管理</span></div>
            <el-form class="box2" style="width: 100%">
                <!-- <el-form-item class="txt-input">医生：<el-input v-model="username"></el-input></el-form-item>
                <el-form-item>科室：<el-select placeholder="请选择" popper-class="select_text" v-model="curetype">
                        <el-option v-for="(item, index) in cureList" :key="index" :value="index" :label="item"></el-option>
                    </el-select></el-form-item> -->
                      <el-form-item>就诊科室：<el-select placeholder="请选择" popper-class="select_text" v-model="departmentId">
                        <el-option v-for="item in deps" :key="item.departmentId" 
                        :value="item.departmentId" :label="item.departmentName"></el-option>
                </el-select></el-form-item>
                <el-form-item>出诊医生：<el-select placeholder="请选择" popper-class="select_text" v-model="visit.doctor.doctorId">
                        <el-option v-for="item in docs" :key="item.doctorId" :value="item.doctorId" :label="item.doctorName"></el-option>
                </el-select></el-form-item>
                <el-form-item class="txt-input">时间：<el-input type="date" v-model="visit.callTime"></el-input></el-form-item>
                <!-- <el-form-item label="时间段">
    <el-radio-group v-model="morning">
      <el-radio label="上午"></el-radio>
      <el-radio label="下午"></el-radio>
    </el-radio-group>
  </el-form-item> -->
            </el-form>
            <el-button style="margin:0 50px 30px;" @click="add">
              <span v-if="flag">修改</span><span v-else>添加</span>  
            </el-button>
        </div>
    </div>
</template>

<script>
import axios from '../hooks/http';
import {  mapGetters, mapMutations, mapState } from "vuex";
import {  getDeps,getDoc} from "../hooks/getTypes";
import dayjs from 'dayjs';

export default {
    data() {
        return {
            visit:{
               doctor:{
                 doctorId:""
               },
               callTime:""
            },
            deps:[],
            docs:[],
            departmentId:"",
            flag:null
        };
    },
    computed: {
        // ...mapState(["cureList"]),
        // ...mapGetters(['newId2'])
    },
    methods: {
        // ...mapMutations(['push_doctor']),
        add(){
            if(this.flag){
            axios.post("/doctorCall/update",this.visit).then(res=>{
            alert(res.data.msg);
            if(res.data.code==200){
                this.$router.push("/index/doctorlist");
            }});
            }else
           axios.post("/doctorCall/add",this.visit).then(res=>{
            alert(res.data.msg);
            if(res.data.code==200){
            this.visit.doctor.doctorId="";
            this.departmentId="";
            this.visit.callTime="";
         
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
    beforeMount(){
        getDeps().then(res=>{
            this.deps=res.data.data;
        })
        console.log(this.$route.query);
        this.flag=this.$route.query.flag;
        this.departmentId=this.$route.query.doctor.department.departmentId;
        this.visit.doctor=this.$route.query.doctor;
        this.visit.callTime=this.$route.query.callTime;
        this.visit.timeId=this.$route.query.timeId;
         this.flag=this.$route.query.timeId;
    },
    watch:{
        departmentId:{
            handler(newval,oldval){
                if(oldval){
                  this.visit.doctor.doctorId=null;
                }
               this.getDocs();
            }
        }
    },
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