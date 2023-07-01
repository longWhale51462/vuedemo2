<template>
    <div  style="height: 100vh">
        <div class="box1">
            <div class="user_mannger"><span>医生出诊信息管理</span></div>
            <div class="box2">
                  就诊科室：<el-select placeholder="请选择" popper-class="select_text" v-model="departmentId">
                    <el-option value="">全部</el-option>
                        <el-option v-for="item in deps" :key="item.departmentId" 
                        :value="item.departmentId" :label="item.departmentName"></el-option>
                </el-select>
                出诊医生：<el-select placeholder="请选择" popper-class="select_text" v-model="doctorName">
                        <el-option v-for="item in docs" :key="item.doctorId" :value="item.doctorName" :label="item.doctorName"></el-option>
                </el-select>
                <el-button type="primary" style="margin-left: 40px" @click="handleCurrentChange(1)">查询</el-button>
            </div>
        </div>
        <div class="box1">
            <!-- <el-button style="margin: 5px;">添加</el-button> -->
            <el-table :data="pageInfo.list" style="width: 100%" height="500px">
                <el-table-column prop="doctor.doctorId" label="编号"> </el-table-column>

                <el-table-column prop="doctor.doctorName" label="医生"> </el-table-column>

                <el-table-column label="科室" prop="doctor.department.departmentName">
                </el-table-column>
                <el-table-column  label="出诊时间"> 
                    <template slot-scope="scope">
                       {{timefmt(scope.row.callTime)}}
                    </template>
                </el-table-column>
                <el-table-column label="操作" style="position: relative">
                    <template slot-scope="scope2">
                        <button @click="update(scope2.row)">编辑</button>
                    </template>

                        <!-- <div v-if="scope.row.isShow" class="changeBox" @click.stop>
                            <el-form class="box2" style="width: 100%">
                                <el-form-item class="txt-input">医生：{{scope.row.name}}</el-form-item>
                                <el-form-item>科室： 
                                        {{ scope.row.curetype >= 0 ? cureList[scope.row.curetype] : "无" }}
                                </el-form-item>
                                <el-form-item class="txt-input">时间：<el-input type="date"
                                        v-model="time"></el-input></el-form-item>
                                <el-form-item label="时间段">
                                    <el-radio-group v-model="morning">
                                        <el-radio label="上午"></el-radio>
                                        <el-radio label="下午"></el-radio>
                                    </el-radio-group>
                                </el-form-item>
                            </el-form>
                            <el-button style="margin: 0 50px 30px" @click="changeDoctor({
                                id:scope.row.id,time,status:morning
                            }); hide();">修改</el-button>
                        </div> -->
                   
                </el-table-column>
            </el-table>

                <el-pagination
      @current-change="handleCurrentChange"
      layout="total, prev, pager, next, jumper"
      :total="pageInfo.total"
      page-size="5"
     >
    </el-pagination>
        </div>

    </div>
</template>

<script>
import axios from '../hooks/http';
import { mapGetters, mapMutations, mapState } from "vuex";
import dayjs from 'dayjs';
import {getDeps,getDoc} from "../hooks/getTypes";
export default {
    data() {
        return {
            pageInfo: [],
            pageNum:"",
            docs:[],
            deps:[],
            departmentId:"",
            doctorName:""
        };
    },
    computed: {
        timefmt(){
            return date=>dayjs(date).format("YYYY-MM-DD");
        }
    },
    methods: {
        ...mapMutations(["changeDoctor"]),
        handleCurrentChange(val) {
            this.pageNum=val;
            this.getPage();
        },
        getPage(){
            axios.post("/doctorCall/all/"+this.pageNum,{
                doctorName:this.doctorName,
                department:{
                    departmentId:this.departmentId
                }
            }).then(res=>{
            this.pageInfo=res.data.data;
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
        },
        update(doctorCall){
          this.$router.push({
            path:"/index/adddoctor",
            query:{
                doctorCall,
                flag:true
            }
            })
        }
    },    
    watch:{
        departmentId:{
            handler(newval,oldval){
               this.doctorName="";
               this.getDocs();
            }
        }
    },
    beforeMount() {
       this.handleCurrentChange(1);
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
    height: 138px;
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
    margin: 20px 40px;
}

.user_mannger {
    text-align: center;
    font-size: 25px;
    font-weight: 600;
    line-height: calc(138px * 0.4);
    border-bottom: 1px solid rgb(221, 209, 207);
}

.select_text {
    color: black;
    font-weight: 500;
}

.user_input {
    width: 250px;
}

.changeBox {
    position: fixed;
    top: 20%;
    left: 40%;
    background: white;
    height: 350px;
    width: 400px;
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

.el-table::before{
    height: 0;
}
.el-table{
    background: none;
}
</style>