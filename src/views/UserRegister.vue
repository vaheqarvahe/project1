<template>
    <div>
      <h1 class="heading"> Sign Up </h1>
      <div class="form-container">
        <Form @submit="get_info" :validation-schema="schema" class="form">
          <div class="form-group">
            <Field name="first_name" placeholder="First Name" class="input-field"/>
            <ErrorMessage name="first_name" class="error-message"/>
          </div>
  
          <div class="form-group">
            <Field name="last_name" placeholder="Last Name" class="input-field"/>
            <ErrorMessage name="last_name" class="error-message"/>
          </div>
  
          <div class="form-group">
            <Field name="username" placeholder="Username" class="input-field"/>
            <ErrorMessage name="username" class="error-message"/>
          </div>
  
          <div class="form-group">
            <Field name="email" placeholder="Email" class="input-field"/>
            <ErrorMessage name="email" class="error-message"/>
          </div>
  
          <div class="form-group">
            <Field name="password1" type="password" placeholder="Password" class="input-field"/>
            <ErrorMessage name="password1" class="error-message"/>
          </div>
  
          <div class="form-group">
            <Field name="password2" type="password" placeholder="Confirm Password" class="input-field"/>
            <ErrorMessage name="password2" class="error-message"/>
          </div>
  
          <button type="submit" class="btn-submit">Register</button>
        </Form>
      </div>
    </div>
  </template>
  
  <script>
  import { mapActions } from 'vuex';
  import { Form, Field, ErrorMessage } from 'vee-validate';
  import * as yup from "yup";
  
  export default {
    components: {
      Form,
      Field,
      ErrorMessage
    },

    methods: {
      ...mapActions(["user_register"]),
      get_info(formData) {
        console.log(formData);
        this.user_register(formData)
      }
    },



    computed: {
        schema() {
       return yup.object({
          first_name: yup.string().required("First name is required"),
          last_name: yup.string().required("Last name is required"),
          username: yup.string().required("Username is required"),
          email: yup.string().email("Invalid email").required("Email is required"),
          password1: yup.string().min(8).max(20).required("Password is required"),
          password2: yup.string().required("Confirm password is required")
       })
      }
    },
  };
  </script>
  
  <style scoped>
  .heading {
    font-size: 24px;
    text-align: center;
    margin-bottom: 20px;
  }
  
  .form-container {
    max-width: 400px;
    margin: 0 auto;
  }
  
  .form-group {
    margin-bottom: 1rem;
  }
  
  .input-field {
    width: 100%;
    padding: 10px;
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
    background-color: #007bff;
    color: #fff;
    border: none;
    padding: 10px 20px;
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
  </style>
  