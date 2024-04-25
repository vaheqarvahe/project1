<template>
    <div>
      <h1 class="film-title">Film Info</h1>
      <div v-if="one_film" class="film-info-container">
        <h2>{{ one_film.name }}</h2>
        <div class="film-details">
          <p><strong>Actors:</strong> {{ one_film.actors }}</p>
          <p><strong>Country:</strong> {{ one_film.country.name }}</p>
          <p><strong>Genre:</strong> 
            <span v-for="(genre, index) in one_film.genre" :key="index">
              {{ genre.name }}{{ index !== one_film.genre.length - 1 ? ', ' : '' }}
            </span>
          </p>
          <div class="film-media">
            <img :src="url + one_film.image" alt="Film Poster" class="film-image">
            <video controls :src="url + one_film.video" class="film-video"></video>
          </div>
        </div>
      </div>
      <div v-else class="loading-message">
        <p>Loading...</p> 
      </div> 
    </div>
  </template>
  
  <script>
  import { mapActions, mapState } from 'vuex';
  
  export default {
    computed: {
      ...mapState(["one_film", "url"])
    },
    methods: {
      ...mapActions(["get_one_film"])
    },
    mounted() {
      const filmId = this.$route.params.id;
      this.get_one_film(filmId);
    }
  }
  </script>
  
  <style scoped>
  .film-title {
    font-size: 32px;
    margin-bottom: 20px;
    text-align: center;
  }
  
  .film-info-container {
    background-color: #1b1b1b;
    padding: 30px;
    border-radius: 10px;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.5);
  }
  
  .film-details {
    margin-top: 30px;
    color: #ffffff;
  }
  
  .film-details p {
    margin-bottom: 15px;
  }
  
  .film-media {
    display: flex;
    justify-content: center;
    margin-top: 30px;
  }
  
  .film-image {
    width: 400px;
    height: auto;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  }
  
  .loading-message {
    text-align: center;
    margin-top: 30px;
    color: #ffffff;
  }
  
  body {
    background-color: #000000;
  }

  .film-video {
  width: 100%;
  max-width: 800px;
  height: auto;
  margin-top: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}
  </style>
  