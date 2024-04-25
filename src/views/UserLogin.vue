<template>
  <div v-if="error" class="for_error">
    <h1>
      {{ error }}
    </h1>
  </div>
  <div class="sign-in-container">
    <h1 class="heading">Sign In</h1>
    <Form :validation-schema="schema" @submit="get_info" class="form">
      <div class="form-group">
        <Field name="username" placeholder="Username" class="input-field" />
        <ErrorMessage name="username" class="error-message" />
      </div>
      <div class="form-group">
        <Field name="password" type="password" placeholder="Password" class="input-field" />
        <ErrorMessage name="password" class="error-message" />
      </div>
      <button type="submit" class="btn-submit">Sign In</button>
    </Form>
    <router-link to="/sign_up" class="link">Don't have an account yet?</router-link>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import { Form, Field, ErrorMessage } from 'vee-validate';
import * as yup from "yup";

export default {
  components: {
    Form,
    Field,
    ErrorMessage
  },
  computed: {
    ...mapState(["error"]),
    schema() {
      return yup.object({
        username: yup.string().required("Username is required"),
        password: yup.string().min(8).max(20).required("Password is required"),
      });
    }
  },
  methods: {
    ...mapActions(["user_signin"]),
    get_info(obj){
      console.log(obj);
      this.user_signin(obj)
    }
  }
}
</script>

<style scoped>
.sign-in-container {
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.heading {
  font-size: 24px;
  text-align: center;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 20px;
}

.input-field {
  width: 100%;
  padding: 12px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  transition: border-color 0.3s ease;
}

.input-field:focus {
  border-color: #007bff;
}

.error-message {
  color: red;
  font-size: 14px;
  margin-top: 5px;
}

.btn-submit {
  width: 100%;
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 12px;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn-submit:hover {
  background-color: #0056b3;
}

.link {
  display: inline-block;
  padding: 10px 20px;
  margin: 5px;
  background-color: #007bff; 
  color: #fff; 
  text-decoration: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.link:hover {
  background-color: #0056b3;
}

.for_error {
  max-width: 500px;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #dc3545;
  border-radius: 10px;
  background-color: #f8d7da;
  color: #721c24;
}

.for_error h1 {
  font-size: 24px;
  margin-bottom: 20px;
  color: #721c24;
}
</style>
