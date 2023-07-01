import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userList:[
      {id:1,type:0,curetype: "",username:'admin',pwd:'123',time:new Date("2020.1.1").toUTCString(),status:0,img_src:require("../assets/2.avif")},
      {id:2,type:0,curetype: "",username:'a',pwd:'123',time:new Date("2020.1.1").toUTCString(),status:0,img_src:require("../assets/1.avif")},
      {id:3,type:0,curetype: "",username:'b',pwd:'123',time:new Date("2020.1.1").toUTCString(),status:0,img_src:require("../assets/3.avif")},
      {id:4,type:0,curetype: "",username:'c',pwd:'123',time:new Date("2020.1.1").toUTCString(),status:0,img_src:require("../assets/4.avif")},
      {id:5,type:0,curetype: "",username:'d',pwd:'123',time:new Date("2020.1.1").toUTCString(),status:0,img_src:require("../assets/5.avif")},
      {id:6,type:1,curetype:1,doctorName:'杨文峰',username:'e',pwd:'123',time:new Date("2020.1.1").toUTCString(),status:1,img_src:require("../assets/6.avif")},
      {id:7,type:1,curetype:2,doctorName:'杨文峰',username:'f',pwd:'123',time:new Date("2020.1.1").toUTCString(),status:1,img_src:require("../assets/7.avif")},
      {id:8,type:1,curetype:3,doctorName:'杨文峰',username:'g',pwd:'123',time:new Date("2020.1.1").toUTCString(),status:1,img_src:require("../assets/8.avif")},
      {id:9,type:1,curetype:4,doctorName:'杨文峰',username:'h',pwd:'123',time:new Date("2020.1.1").toUTCString(),status:1,img_src:require("../assets/9.avif")},
      {id:10,type:1,curetype:5,doctorName:'杨文峰',username:'i',pwd:'123',time:new Date("2020.1.1").toUTCString(),status:1,img_src:require("../assets/10.avif")},
    ],
    user:{img:""},
    cureList:['眼科','脑科','神经科','肛肠科','牙科','内分泌科','妇科','男科','外科'],
    doctorList:[
    {id:1,curetype:0,name:'张文明医生',time:'2025-01-01',status:"上午"},
    {id:2,curetype:1,name:'李晓飞医生',time:'2024-12-01',status:"上午"},
    {id:3,curetype:2,name:'王佳琪医生',time:'2024-12-05',status:"下午"},
    {id:4,curetype:3,name:'赵建国医生',time:'2024-12-07',status:"下午"},
    {id:5,curetype:4,name:'孙雨晨医生',time:'2024-12-12',status:"下午"},
    {id:6,curetype:5,name:'周宇医生',time:'2024-12-18',status:"上午"},
    {id:7,curetype:6,name:'吴莉莉医生',time:'2024-12-20',status:"上午"},
    {id:8,curetype:7,name:'刘阳医生',time:'2024-12-23',status:"下午"},
    {id:9,curetype:8,name:'陈晓婷医生',time:'2024-12-30',status:"下午"},
    {id:10,curetype:0,name:'徐宏医生',time:'2025-01-01',status:"上午"},
    {id:11,curetype:1,name:'郑雅婷医生',time:'2024-12-01',status:"上午"},
    {id:12,curetype:8,name:'黄军医生',time:'2024-12-30',status:"下午"},
    {id:13,curetype:2,name:'高欣宇医生',time:'2024-12-05',status:"下午"},
    {id:14,curetype:3,name:'蔡美琳医生',time:'2024-12-07',status:"下午"},
    {id:15,curetype:4,name:'曾瑞芳医生',time:'2024-12-12',status:"下午"},
    {id:16,curetype:5,name:'唐伟医生',time:'2024-12-18',status:"上午"},
    {id:17,curetype:6,name:'梁婷医生',time:'2024-12-20',status:"上午"},
    {id:18,curetype:7,name:'韩明阳医生',time:'2024-12-23',status:"下午"},         
  ] },
  getters: {
    newId(state){
      return parseInt((state.userList[state.userList.length-1]).id)+1;
    },
    newId2(state){
      return parseInt((state.doctorList[state.doctorList.length-1]).id)+1;
    },
    selectUserList(state, type){
      return (type)=>state.userList.filter(u=>u.type==type);
    },
    selectDoctorList(state, type){
      return (type)=>state.doctorList.filter(u=>u.curetype===type);
    },
  },
  mutations: {
    //注册管理员账号
    add_user(state, user){
      state.userList.push({...user,type:0,curetype:-1,time:new Date().toUTCString(),status:0,img_src:require("../assets/2.avif")});
    },
    push_user(state, user){
      state.userList.push({...user,time:new Date().toUTCString(),img_src:require("../assets/2.avif")});
    },
    set_user(state, user){
      state.user=user;
    },
    push_doctor(state, doctor){
      state.doctorList.push(doctor);
    },
    change(state,id){
      if(id==0) return;
      for(var i=0;i<state.userList.length;i++){
        if(state.userList[i].id==id){
          state.userList[i].status=!state.userList[i].status;
          return;
        }
      }
    },
    // changeDoctor(state,info){
    //   if(info.attr!="")
    //   (state.doctorList.filter(d=>d.id==info.id)[0])[info.attr]=info.val; 
    // }
    changeDoctor(state,info){
      state.doctorList.forEach(doc=>{
        if(doc.id==info.id){
          doc.time=info.time;
          doc.status=info.status; 
          // console.log(doc);
          return;
        }
      });
    }
  },
  actions: {
  },
  modules: {
  }
})
