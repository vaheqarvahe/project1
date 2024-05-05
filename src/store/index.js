import { createStore } from 'vuex'
import axios from 'axios';
import router from '@/router';


export default createStore({
  state: {
    url: "http://127.0.0.1:8000/",
    staff:{},
    all_film: [],
    one_film: null,
    user: null,
    error: null
  },
  getters: {
  },
  mutations: {
    change_staff(state, obj){
      state.staff = obj
      console.log("staff1",state.staff);
    },
    change_all_film(state, obj){
      state.all_film = obj
    },
    change_one_film(state, obj){
      state.one_film = obj
      console.log("hello,", state.one_film);
    },
    change_user(state, user){
      console.log(user);
      state.user = user
    },
    change_error(state, pk){
      state.error = pk
    }


  },
  actions: {
    async user_register({state},info){
      try{
        await axios.post(state.url + "sign_up/", info);
        router.push({name: "confirm"})
      }
      catch(err){
        console.log("barev");
      }
    },
    async user_signin({state,commit},obj){
      try{
        let data =await axios.post(state.url + "sign_in/", obj)
        localStorage.token = data.data.token
        router.push({name: "profile"})
      }
      catch(err){
        commit("change_error", err.response.data.massage)
        console.log("err", err.response.data.massage);
      }
    },
    async get_user({state, commit}){
      let config = {
        headers: {
          "Authorization": `Token ${localStorage.token}`
        }
      }
      let {data} = await axios.get(state.url + "user/", config)
      commit("change_user", data.user);
    },
    async get_movie_staff({state, commit}){
      try{
        let config = {
          headers: {
            "Authorization": `Token ${localStorage.token}`
          }
        }
        let genre = await axios.get(state.url + "genres/", config)
        let year = await axios.get(state.url + "years/", config)
        let translation = await axios.get(state.url + "translations/", config)
        let country = await axios.get(state.url + "countries/", config)
        let total = {
          genre: genre.data.genre,
          year: year.data.year,
          translation: translation.data.translation,
          country: country.data.country
        }
        commit("change_staff", total)
      }
      catch(err){
        console.error(err);
      }
    },
    async add_film({state},obj){
      try{
        let config = {
          headers: {
            "Authorization": `Token ${localStorage.token}`
          }
        }
      await axios.post(state.url + "add_films/", obj, config)


      }
      catch(err){
        console.log(err);
      }
    },
    async update_film({state},obj){
      try{
        let config = {
          headers: {
            "Authorization": `Token ${localStorage.token}`
          }
        }
      await axios.put(state.url + "add_update/", obj, config)


      }
      catch(err){
        console.error(err);
      }
    },
    async get_all_films({state, commit}){
      try{
        let config = {
          headers: {
            "Authorization": `Token ${localStorage.token}`
          }
        }
        let data = await axios.get(state.url + "get_all_films/", config)
        commit("change_all_film", data.data.films)
      }catch(err){
      console.error(err);
      }
    },
    async get_one_film({state, commit}, pk){
      try{
        let config = {
          headers: {
            "Authorization": `Token ${localStorage.token}`
          }
        }
        let data = await axios.get(state.url + `get_one_films/${pk}/`, config)
        commit("change_one_film", data.data.film)
      }catch(err){
        console.error(err);
      }
    },
    async get_search({state,commit}, text){
      try{
        let config = {
          params: {
            text: text
          },
          headers: {
            "Authorization": `Token ${localStorage.token}`
          }
        }
        let data = await axios.get(state.url + `get_search/`, config)
        commit("change_all_film", data.data.film)
      }catch(err){
        console.error(err);
      }
    },
    async get_search_by_genre({state, commit}, genre){
      let config = {
        params: {
          genre: genre
        },
        headers: {
          "Authorization": `Token ${localStorage.token}`
        }
      }
      let data = await axios.get(state.url + "get_search/genre/", config)
      commit("change_all_film", data.data.film)

    },
    async delete_film({state, commit}, pk){
      let config = {
        headers: {
          "Authorization": `Token ${localStorage.token}`
        }
      }
      let {data} = await axios.delete(state.url + `delete/film/${pk}`, config)
      commit("change_all_film", data.film)
    },
    async logout({state}) {
      let config = {
        headers: {
          "Authorization": `Token ${localStorage.token}`
        }
      }
      await axios.delete(state.url + "log_out/", config);
      localStorage.removeItem('token');
    }

  },
  modules: {
  }
})
