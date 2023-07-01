import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import { Button, Select ,Table,TableColumn} from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import ElementUI from 'element-ui';
import dayjs from 'dayjs';
Vue.prototype.$dayjs=dayjs;
Vue.use(ElementUI);
// Vue.component(Button.name, Button);
// Vue.component(Select.name, Select);
// Vue.component(Table.name, Table);
// Vue.component(TableColumn.name, TableColumn);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
