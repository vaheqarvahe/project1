<template>
    <div class="menu-bar">
      <div class="menu-links">
        <router-link to="/" class="menu-link">Home</router-link>
        <router-link to="/all_film" class="menu-link">All Films</router-link>
        <router-link v-if="user?.is_staff" to="/add_film" class="menu-link">Add Film</router-link>

      </div>
      <div class="search-logout">
        <input type="text" placeholder="Search by title" v-model="searchText" class="search-input">
        <button @click="search" class="search-btn">Search</button>
        <button @click="logout" class="logout-btn">Log Out 📤</button>
      </div>
    </div>
  </template>
  

<script>
import { mapActions, mapState } from 'vuex';

export default {
    data() {
        return {
            searchText: '' 
        };
    },
    computed:{
      ...mapState(["user"])
    },
    methods: {
        ...mapActions(['get_search',"get_staff"]),
        search() {
            this.get_search(this.searchText)
            this.$router.push({ query: { searchText: this.searchText } });
        },
    },
}
</script>

<style scoped>
.menu-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  background-color: #222; 
  color: #fff;
  font-family: 'Arial', sans-serif;
}

.menu-links {
  display: flex;
}

.menu-link {
  margin-right: 20px;
  text-decoration: none;
  color: #fff;
  transition: color 0.3s;
}

.menu-link:hover {
  color: #ffd700; 
}

.search-logout {
  display: flex;
  align-items: center;
}

.search-input {
  padding: 8px;
  margin-right: 10px;
  border: none;
  border-radius: 4px;
  background-color: #333; 
  color: #fff;
}

.search-btn,
.logout-btn {
  padding: 8px 12px;
  border: none;
  border-radius: 4px;
  background-color: #ffd700;
  color: #222;
  cursor: pointer;
  transition: background-color 0.3s;
}

.search-btn:hover,
.logout-btn:hover {
  background-color: #ffc107;
}
</style>

