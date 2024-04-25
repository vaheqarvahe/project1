<template>
  <div class="movie-page">
    <MenuBar />
    <div class="film-list-container">
      <h1 class="film-title">Discover Latest Films</h1>
      <div class="filter-section">
        <h2 class="filter-title">Filter By Genre</h2>
        <ul class="genre-list">
          <li v-for="genre in staff.genre" :key="genre.id">
            <button @click="filterByGenre(genre.id)" class="genre-button">{{ genre.name }}</button>
          </li>
        </ul>
      </div>
      <div class="film-list">
        <div v-for="film in all_film" :key="film.id" class="film-card">
          <h1 v-if="film.free"> free </h1>
          <h1 v-if="!film.free"> pay: {{ film.price }} </h1>
          <div class="film-image-container">
            <img :src="url + film.image" alt="Film Poster" class="film-image">
          </div>
          <div class="film-details">
            <h2 class="film-title">{{ film.name }}</h2>
            <div class="genre-tags">
              <span v-for="genre in film.genre" :key="genre.id" class="genre-tag">{{ genre.name }}</span>
            </div>
            <router-link v-if="film.free" :to="{ name: 'film_info', params: { id: film.id } }" class="details-link">View Details</router-link>
            <router-link v-if="!film.free" :to="{ name: 'StripeCheckoutt', params: { id: film.id } }" class="details-link">Pay</router-link>
            <button v-if="user.is_staff" @click="deleteFilm(film.id)" class="delete-button">Delete</button>
            <router-link :to="{ name: 'edit', params: { id: film.id } }" class="details-link">Edit Film</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import MenuBar from "../components/MenuBar.vue";

export default {
  components: {
    MenuBar
  },
  computed: {
    ...mapState(["all_film", "url", "staff", "user"])
  },
  methods: {
    ...mapActions(["get_all_films", "get_movie_staff", "get_search_by_genre", "delete_film"]),
    filterByGenre(genreId) {
      this.get_search_by_genre(genreId);
    },
    async deleteFilm(filmId) {
      await this.delete_film(filmId);
      await this.get_all_films();
    }
  },
  mounted() {
    this.get_all_films();
    this.get_movie_staff();
  }
}
</script>

<style scoped>
.movie-page {
  background-color: #121212; /* Dark background color */
  color: #ffffff; /* White text color */
  padding: 20px;
}

.film-title {
  font-size: 32px;
  margin-bottom: 20px;
  text-align: center;
}

.filter-section {
  background-color: #1b1b1b;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.5);
}

.filter-title {
  color: #ffffff;
}

.genre-list {
  list-style-type: none;
  padding: 0;
}

.genre-button {
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 8px 16px;
  margin: 5px;
  border-radius: 5px;
  cursor: pointer;
}

.film-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
}

.film-card {
  background-color: #1b1b1b;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.5);
}

.film-details {
  margin-top: 20px;
}

.film-title {
  font-size: 24px;
  margin-bottom: 10px;
}

.genre-tags {
  margin-bottom: 10px;
}

.genre-tag {
  background-color: #007bff;
  color: #fff;
  padding: 2px 8px;
  border-radius: 5px;
  margin-right: 5px;
}

.details-link {
  color: #007bff;
  text-decoration: none;
  margin-right: 10px;
}

.delete-button {
  background-color: #dc3545;
  color: #fff;
  border: none;
  padding: 8px 16px;
  border-radius: 5px;
  cursor: pointer;
}

.film-image {
  width: 100%; /* Make the image fill its container */
  height: auto; /* Maintain aspect ratio */
  border-radius: 10px;
}

@media (max-width: 768px) {
  .film-card {
    width: 100%; /* Make cards full width on smaller screens */
  }
}
</style>
