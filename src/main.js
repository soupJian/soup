import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/assets/css/reset.css'
import io from 'weapp.socket.io'

const app = createApp(App)

app.config.globalProperties.$socket = io('http://175.24.116.96:3200')

app.use(store).use(router).mount('#app')

import { 
  Button,
  Form,
  Field,
  NavBar,
  Checkbox,
  Tabbar, TabbarItem,
  Icon,
  IndexBar, IndexAnchor,
  Popup,
  Search,
  Empty,
  DropdownMenu, DropdownItem,
  Uploader,
  ActionSheet,
  Picker,
  List,
  PullRefresh,
} from 'vant'

app.use(Button)
app.use(Form)
app.use(Field)
app.use(NavBar)
app.use(Checkbox)
app.use(Tabbar)
app.use(TabbarItem)
app.use(Icon)
app.use(IndexBar)
app.use(IndexAnchor)
app.use(Popup)
app.use(Search)
app.use(Empty)
app.use(DropdownMenu)
app.use(DropdownItem)
app.use(Uploader);
app.use(ActionSheet);
app.use(Picker);
app.use(List);
app.use(PullRefresh)


