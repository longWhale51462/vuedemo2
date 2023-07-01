import axios from "./http";

function getTypes(){
  return axios.get("user/fun/type");
}
function getDeps(){
    return axios.get("dep/all");
  }
function getDoc(departmentId){
 return axios.get("doc/dep/"+departmentId);
}
export {
    getTypes,getDeps,getDoc
};
