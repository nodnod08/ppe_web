<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-4 col-md-6">
        <br />
        <br />
        <br />
        <div
          v-if="message != ''"
          class="alert alert-danger alert-dismissible fade show"
          role="alert"
        >
          <strong>Ooopps</strong>
          {{message}}
          <button
            type="button"
            class="close"
            data-dismiss="alert"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <article class="mx-auto" style="max-width: 600px;">
          <h4 class="mt-3 text-center">Create Account</h4>
          <p class="text-center">Get started with your free account</p>
          <p>
            <a href class="btn btn-block btn-google">
              <i class="fa fa-google"></i> Login via Google
            </a>
            <a href class="btn btn-block btn-facebook">
              <i class="fa fa-facebook-f"></i> Login via facebook
            </a>
          </p>
          <p class="divider-text">
            <span class="bg-light">OR</span>
          </p>
          <form @submit.prevent="submitRegister">
            <div class="form-group input-group">
              <div class="input-group-prepend">
                <span class="input-group-text">
                  <i class="fa fa-user"></i>
                </span>
              </div>
              <input
                name
                :class="$v.first_name.$error ? 'form-control is-invalid' : 'form-control'"
                v-model.trim="$v.first_name.$model"
                placeholder="First name"
                type="text"
              />
              <div
                v-if="$v.first_name.$error"
                class="invalid-feedback"
              >Please provide a valid first name</div>
            </div>
            <div class="form-group input-group">
              <div class="input-group-prepend">
                <span class="input-group-text">
                  <i class="fa fa-user"></i>
                </span>
              </div>
              <input
                name
                :class="$v.last_name.$error ? 'form-control is-invalid' : 'form-control'"
                v-model.trim="$v.last_name.$model"
                placeholder="Last name"
                type="text"
              />
              <div
                v-if="$v.last_name.$error"
                class="invalid-feedback"
              >Please provide a valid last name</div>
            </div>
            <!-- form-group// -->
            <div class="form-group input-group">
              <div class="input-group-prepend">
                <span class="input-group-text">
                  <i class="fa fa-envelope"></i>
                </span>
              </div>
              <input
                name
                :class="$v.your_email.$error ? 'form-control is-invalid' : 'form-control'"
                v-model.trim="$v.your_email.$model"
                placeholder="Email address"
                type="email"
              />
              <div v-if="$v.your_email.$error" class="invalid-feedback">Please provide a valid email</div>
            </div>
            <!-- form-group end.// -->
            <div class="form-group input-group">
              <div class="input-group-prepend">
                <span class="input-group-text">
                  <i class="fa fa-lock"></i>
                </span>
              </div>
              <input
                :class="$v.password.$error ? 'form-control is-invalid' : 'form-control'"
                v-model.trim="$v.password.$model"
                placeholder="Create password"
                type="password"
              />
              <div
                v-if="$v.password.$error"
                class="invalid-feedback"
              >This is required with atleast 8 characters length</div>
            </div>
            <!-- form-group// -->
            <div class="form-group input-group">
              <div class="input-group-prepend">
                <span class="input-group-text">
                  <i class="fa fa-lock"></i>
                </span>
              </div>
              <input
                :class="$v.repeat_password.$error ? 'form-control is-invalid' : 'form-control'"
                v-model.trim="$v.repeat_password.$model"
                placeholder="Repeat password"
                type="password"
              />
              <div
                v-if="$v.repeat_password.$error"
                class="invalid-feedback"
              >This is required and same as your password</div>
            </div>
            <!-- form-group// -->
            <div class="form-group">
              <button type="submit" class="btn btn-primary btn-block">Create Account</button>
            </div>
            <!-- form-group// -->
            <div
              v-if="message != ''"
              class="alert alert-danger alert-dismissible fade show"
              role="alert"
            >
              <strong>Ooopps</strong>
              {{message}}
              <button
                type="button"
                class="close"
                data-dismiss="alert"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <p class="text-center">
              Have an account?
              <a href>Log In</a>
            </p>
          </form>
        </article>
        <br />
        <br />
        <br />
      </div>
    </div>
  </div>
</template>

<script>
import {
  required,
  email,
  sameAs,
  minLength,
  alpha,
} from "vuelidate/lib/validators";
import axios from "axios";

export default {
  data() {
    return {
      first_name: "",
      last_name: "",
      your_email: "",
      password: "",
      repeat_password: "",
      message: "",
    };
  },
  validations: {
    your_email: {
      required,
      email,
    },
    first_name: {
      required,
      alpha,
    },
    last_name: {
      required,
      alpha,
    },
    password: {
      required,
      minLength: minLength(8),
    },
    repeat_password: {
      required,
      sameAsPassword: sameAs("password"),
    },
  },
  methods: {
    submitRegister: function () {
      this.$store.commit("setConfig", { property: "loading", data: true });
      this.$v.$touch();
      if (!this.$v.$invalid) {
        axios
          .post("/api-user/register-user", {
            email: this.your_email,
            username: this.your_email,
            first_name: this.first_name,
            last_name: this.last_name,
            password: this.password,
          })
          .then((result) => {
            this.$store.commit("setConfig", {
              property: "loading",
              data: false,
            });
            if (result.data.success) {
              this.message = "";
              window.location = "/";
            } else {
              this.message = result.data.message;
            }
          });
      } else {
        this.$store.commit("setConfig", { property: "loading", data: false });
      }
    },
  },
};
</script>

<style></style>
