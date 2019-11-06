<template>
  <v-container>
    <v-row justify="center">
      <v-col md="4">
        <v-card
          outlined
        >
          <v-toolbar
            color="green lighten-3 white--text"
            flat
          >
            <v-toolbar-title>تستجيل دخول</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <form v-on:submit.prevent="signin()">
              <v-row>
                <v-col
                  class="py-0"
                  md="12"
                >
                  <v-text-field
                    placeholder="البريد الالكتروني"
                    v-model="email"
                  ></v-text-field>
                </v-col>
                <v-col
                  class="py-0"
                  md="12"
                >
                  <v-text-field
                    placeholder="كلمة المرور"
                    v-model="password"
                    type="password"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-card-actions>
                <v-btn
                  type="submit"
                  large
                  color="deep-purple accent-4 white--text"
                  :disabled="loginValidator || loggingIn"
                >دخول</v-btn>
              </v-card-actions>  
            </form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      loggingIn: false,
      userNotLoggedIn: false,
      email: null,
      password: null,
    }
  },
  head () {
    return {
      title: 'تسجيل دخول'
    }
  },
  computed: {
    loginValidator () {
      return (this.email && this.password) ? false : true
    }
  },
  methods: {
    signin () {
      this.loggingIn = true
      this.$store.dispatch('signin', {
        email: this.email,
        password: this.password
      })
      .then(() => {
        this.$router.push('/')
      })
      .catch(() => {
        this.userNotLoggedIn = true
        this.password = null
        this.loggingIn = false
      })
    }
  }
}
</script>