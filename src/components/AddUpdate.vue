<template>
    <div>
      <MenuBar/>
      <div :key="total?.id" class="add-film-container">
        <Form :validation-schema="schema" @submit="submitForm" enctype="multipart/form-data" class="add-film-form">
          <div class="form-group">
            <label for="name">Name:</label>
            <Field name="name" class="input-field" :value="total?.name" />
            <ErrorMessage name="name" class="error-message" />
          </div>
          <div class="form-group">
            <label for="actors">Actors:</label>
            <Field name="actors" class="input-field" :value="total?.actors" />
            <ErrorMessage name="actors" class="error-message" />
          </div>
          <div class="form-group">
            <label for="genre">Genre:</label>
            <Field name="genre" as="select" class="select-field" multiple>
              <option v-for="elm in staff.genre" :key="elm.id" :value="elm.id" :selected="total?.genre?.includes(elm.id)">{{ elm.name }}</option>
            </Field>
            <ErrorMessage name="genre" class="error-message" />
          </div>
          <div class="form-group">
          <label for="country">Country:</label>
          <Field  name="country" as="select" class="select-field">
            <option v-for="elm in staff.country" :key="elm.id" :value="elm.id" :selected="elm.id === total?.country?.id">{{ elm.name }}</option>
          </Field>
          <ErrorMessage name="country" class="error-message" />
        </div>
          <div class="form-group">
            <label for="year">Year:</label>
            <Field as="select" name="year" class="select-field">
              <option v-for="elm in staff.year" :key="elm.id" :value="elm.id">{{ elm.year }}</option>
            </Field>
            <ErrorMessage name="year" class="error-message" />
          </div>
          <div class="form-group">
            <label for="translation">Translation:</label>
            <Field name="translation" as="select" class="select-field">
              <option v-for="elm in staff.translation" :key="elm.id" :value="elm.id">{{ elm.name }}</option>
            </Field>
            <ErrorMessage name="translation" class="error-message" />
          </div>
          <div>            
            <label for="free">Free:</label>
            <Field :value="total?.free" v-model="isFree" name="free" type="checkbox">
            </Field>
          </div>
          <div class="form-group">
            <label v-if="!isFree" for="price">Price:</label>
            <Field v-if="!isFree" name="price" type="number" :value="total?.price" class="input-field"/>
            <ErrorMessage name="price" class="error-message" />
          </div>
          <div class="form-group">
            <label for="image">Image:</label>
            <Field name="image" type="file" class="file-field"/>
            <ErrorMessage name="image" class="error-message" />
          </div>
          <div class="form-group">
            <label for="video">Video:</label>
            <Field name="video" type="file" class="file-field" />
            <ErrorMessage name="video" class="error-message" />
          </div>
          <button v-if="!edit" type="submit" class="btn-submit">Add Film</button>
          <button v-if="edit" type="submit" class="btn-submit">Ubdate Film</button>

        </Form>
      </div>
    </div>
  </template>
  
  <script>
  import { Form, Field, ErrorMessage } from 'vee-validate';
  import { mapActions, mapState } from 'vuex';
  import * as yup from "yup";
  import MenuBar from "../components/MenuBar.vue"
  
  export default {
    data(){
      return{
        isFree: false
      }
    },
    props:[
        "total",
        "edit"
    ],
    components: {
      Form,
      Field,
      ErrorMessage,
      MenuBar
    },
    computed: {
      ...mapState(["staff"])
    },
    methods: {
      ...mapActions(["get_movie_staff", "add_film", "update_film"]),
      schema() {
        return yup.object({
          name: yup.string().required('Name is required'),
          actors: yup.string().required('Actors are required'),
          genre: yup.array().min(1, 'Genre is required'),
          year: yup.number().required('Year is required'),
          country: yup.string().required('Country is required'),
          translation: yup.string().required('Translation is required'),
          image: yup.mixed().required('Image is required').test('fileSize', 'Image size is too large', value => {
            return value && value.size <= 2000000;  
          }),
          video: yup.mixed().required('Video is required').test('fileSize', 'Video size is too large', value => {
            return value && value.size <= 50000000
          })
        });
      },
      submitForm(obj) {
        if (this.isFree) {
          obj.free = !this.isFree
        }else{
          obj.free = !!this.isFree
        }
        if (!this.edit) {
          let form = new FormData();
          for (let i in obj) {
            if (i === "genre") {
              obj[i].forEach(elm => form.append("genre", elm));
            } else {
              form.append(i, obj[i]);
            }
          } 
          this.add_film(form)
        }else{
          let form = new FormData();
          for (let key in obj) {
            if (Array.isArray(obj[key])) {
              obj[key].forEach(elm => form.append(key, elm));
            } else {
              form.append(key, obj[key]);
            }
          }
          this.update_film(form)
        }
      },
    },
    mounted() {
      this.get_movie_staff();
    }
  }
  </script>
  
  <style scoped>
  .add-film-container {
    max-width: 600px;
    margin: 20px auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 10px;
    background-color: #f9f9f9; /* Light background color */
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); /* Soft shadow */
  }
  
  .heading {
    font-size: 32px;
    text-align: center;
    margin-bottom: 20px;
    color: #333; /* Dark text color */
  }
  
  .form-group {
    margin-bottom: 20px;
  }
  
  .input-field,
  .select-field,
  .file-field {
    width: calc(100% - 22px); /* Adjust width to account for padding */
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #fff; /* White background color */
    color: #333; /* Dark text color */
    transition: border-color 0.3s ease;
  }
  
  .input-field:focus,
  .select-field:focus,
  .file-field:focus {
    border-color: #007bff; /* Focus color */
  }
  
  .error-message {
    color: red;
    font-size: 14px;
    margin-top: 5px;
  }
  
  .btn-submit {
    background-color: #007bff; /* Button background color */
    color: #fff; /* Button text color */
    border: none;
    padding: 10px 20px;
    font-size: 16px;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .btn-submit:hover {
    background-color: #0056b3; /* Hover color */
  }
  </style>
  