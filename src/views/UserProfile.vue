<template>
    <div>
      <MenuBar />
      <div class="user-info">
        <h1>User Information</h1>
        <div v-if="user" class="user-details">
          <div class="user-detail">
            <label>First Name:</label>
            <span>{{ user.first_name }}</span>
          </div>
          <div class="user-detail">
            <label>Last Name:</label>
            <span>{{ user.last_name }}</span>
          </div>
          <div class="user-detail">
            <label>Username:</label>
            <span>{{ user.username }}</span>
          </div>
          <div class="user-detail">
            <label>Email:</label>
            <span>{{ user.email }}</span>
          </div>
          <div class="user-detail">
            <label>Role:</label>
            <span>{{ user.is_staff ? 'Admin' : 'User' }}</span>
          </div>
        </div>
        <div v-else>
          <p>Loading user information...</p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { mapActions, mapState } from "vuex";
  import MenuBar from "../components/MenuBar.vue";
  
  export default {
    components: {
      MenuBar
    },
    computed: {
      ...mapState(["user"])
    },
    methods: {
      ...mapActions(["get_user"])
    },
    mounted() {
      this.get_user();
    }
  };
  </script>
  
  <style scoped>
  .user-info {
    max-width: 600px;
    margin: 20px auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 10px;
    background-color: #f9f9f9; /* Light background color */
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); /* Soft shadow */
  }
  
  .user-info h1 {
    font-size: 24px;
    margin-bottom: 20px;
  }
  
  .user-details {
    margin-top: 20px;
  }
  
  .user-detail {
    margin-bottom: 10px;
  }
  
  .user-detail label {
    font-weight: bold;
  }
  
  .user-detail span {
    margin-left: 10px;
  }
  
  .user-info p {
    margin-bottom: 10px;
  }
  
  .user-info strong {
    font-weight: bold;
  }
  
  .user-info p:last-child {
    margin-bottom: 0;
  }
  </style>
  