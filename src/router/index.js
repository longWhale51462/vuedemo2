import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path:'/',
    meta:{flag:true},
  },
  {
    path:'/login',
    component:()=>import("../views/Login.vue")
  },{
    path:'/reg',
    component:()=>import("../views/Reg.vue")
  },{
    path:'/index',
    component:()=>import("../views/Index.vue"),
    meta:{flag:true},
    children:[
       {
        path:'userlist',
        component:()=>import("../views/UserList.vue"),
       },
       {
        path:'adduser',
        component:()=>import("../views/AddUser.vue"),
       },
       {
        path:'doctorlist',
        component:()=>import("../views/DoctorList.vue"),
       },
       {
        path:'adddoctor',
        component:()=>import("../views/AddDoctor.vue"),
       }
    ]
  }
]

const router = new VueRouter({
  routes
})

// router.beforeEach((to,from,next)=>{
//     // if(to.path=="/"&&!from.meta.flag){
//     //   if(localStorage.getItem('token')&&localStorage.getItem('token')!="null"){ 
//     //     router.push("/index");
//     //   }else
//     //     router.push("/login");
//     // }
//     // else
//       next();
// })
export default router
