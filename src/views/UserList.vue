<template>
    <div>
    <div class="box1">
        <div class="user_mannger"><span>用户信息管理</span></div>
        <div class="box2">
            <span>用户列表:</span>
            <el-select placeholder="请选择" popper-class="select_text" v-model="type">
                <el-option v-for="item,index in types" :key="index" :value="item" :label="item"></el-option>
                <!-- <el-option value="管理员" label="管理员"></el-option>
                <el-option value="普通用户" label="普通用户"></el-option> -->
                <el-option value="" label="全部"></el-option>
            </el-select>
         
            <span style="margin-left: 40px">账号:</span>
            <el-input class="user_input" v-model="account"></el-input>
            <span style="margin-left: 40px">用户名:</span>
            <el-input class="user_input" v-model="username"></el-input>
            <el-button type="primary" style="margin-left: 40px" @click="select">查询</el-button>
        </div>
    </div>
    <div class="box1">
        <!-- <el-button style="margin: 5px;">添加</el-button> -->
            <el-table :data="pageInfo.list" style="width: 100%" height="600px">
                <el-table-column prop="uid" label="编号">
                </el-table-column>
                <el-table-column prop="userType" label="用户类型">
                    <!-- <template slot-scope="scope">
                        {{ scope.row.type?'普通用户':'管理员' }}
                    </template> -->
                </el-table-column>
                <el-table-column prop="username" label="用户名">  </el-table-column>
                <el-table-column prop="account" label="账号">
                </el-table-column>
                    <el-table-column label="就诊科室" prop="department.departmentName">
                    <!-- <template slot-scope="scope">
                        {{scope.row.curetype>=0?cureList[scope.row.curetype]:""}}
                    </template>  -->
                    </el-table-column>
                <el-table-column prop="doctor.doctorName" label="医生">
                </el-table-column>
                <el-table-column prop="time" label="创建时间">
                    <template slot-scope="scope">
                        {{$dayjs(scope.time).format("YYYY-MM-DD")}}
                    </template> 
                </el-table-column>
                <el-table-column label="状态">
                    <template slot-scope="scope">{{ scope.row.status==1?'已启用':'已禁用' }}</template>
                </el-table-column>
                <el-table-column label="操作">
                    <button slot-scope="scope" @click="changeStatus(scope.row.uid)">{{ scope.row.status==0?'启用':'禁用' }}</button>
                </el-table-column>
            </el-table>
              <div class="block">
    <el-pagination
      @current-change="handleCurrentChange"
      layout="total, prev, pager, next, jumper"
      :total="pageInfo.total"
      page-size=10
     >
    </el-pagination>
  </div>
    </div>
    </div>
</template>

<script>
import axios from '../hooks/http';
import { mapGetters, mapMutations, mapState } from 'vuex';

export default {
    data() {
        return {
            type: "",
            account:"",
            username:"",
            pageInfo:[],
            types:[],
            pageNum:1
        };
    },
    computed:{
        // ...mapState(['userList','cureList']),
        // ...mapGetters(['selectUserList'])
    },
    methods: {
        // ...mapMutations(['change']),
        select(){
             this.pageNum=1;
           this.getUser();
        },
        getUser(){
           
           axios.post("/user/fun/condition",{
             username:this.username,
             account:this.account,
             userType:this.type,
             pageNum:this.pageNum
           },{headers:{
            "Content-Type":"application/x-www-form-urlencoded"
           }}).then(res=>{
            console.log(res.data.data);
              this.pageInfo=res.data.data;
           })
        },
          handleCurrentChange(val) {
            this.pageNum=val;
        this.getUser();
      },
      getTypes(){
          axios.get("user/fun/type").then(res=>{
            console.log(res.data.data);
           this.types=res.data.data;
          })
      },
      changeStatus(uid){
         axios.put("/user/fun/status/"+uid).then(res=>{
            alert(res.data.msg);
            this.getUser();
         })
      }
    },
    beforeMount(){
        this.pageNum=1;
        this.getUser();
        this.getTypes();
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
.box2 select{
    width: 200px;
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
    width: 150px;
}
</style>