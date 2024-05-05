import { createRouter, createWebHistory } from 'vue-router'
import UserRegister from '../views/UserRegister.vue'
import UserLogin from '../views/UserLogin.vue'
import UserProfile from '../views/UserProfile.vue'
import AddFilm from '../views/AddFilm.vue'
import AllFilm from '../views/AllFilm.vue'
import FilmInfo from '../views/FilmInfo.vue'
import FilmEdit from '../views/FilmEdit.vue'
import StripeCheckoutt from '../views/StripeCheckoutt.vue'
import store from "../store/index";

const user = store





const routes = [

  {
    path: '/sign_up',
    name: 'sign_up',
    component: UserRegister
  },
  {
    path: '/',
    name: 'sign_in',
    component: UserLogin,
    meta: {
      check: true
    }
   
  },
  {
    path: '/user_profile',
    name: 'profile',
    meta: {
      user: true
    },
    component: UserProfile
  },
  {
    path: '/add_film',
    name: 'addfilm',
    meta: {
      user: true
    },
    component: AddFilm
  },
  {
    path: '/all_film',
    name: 'allfilm',
    meta: {
      user: true
    },
    component: AllFilm
  },

  {
    path: "/confirm",
    name: "confirm",
    component: ()=>import("../views/ConfirmUser.vue")
  },

  {
    path: "/wait/:user_id/:confirmation_token",
    name: "wait",
    component: ()=>import("../views/WaitUser.vue")
  },
  {
    path: '/film_info/:id',
    name: 'film_info',
    meta: {
      user: true,
    },
    component: FilmInfo
  },
  {
    path: "/edit/:id",
    name: "edit",
    component: FilmEdit
  },
  {
    path: "/pay/:id",
    name: "StripeCheckoutt",
    meta: {
      user: true
    },
    component: StripeCheckoutt
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})


router.beforeEach((to, from, next) => {
  if(to.meta.user){
    if(localStorage.token){
      if(!user._state.data.user){
        user.dispatch("get_user")
        next()
      }
    }else{
      next("/")
    }
   
   

  }

  if (to.meta.check) {
    let token = localStorage.getItem("token");
    if (token) {
      next("/user_profile");
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router
