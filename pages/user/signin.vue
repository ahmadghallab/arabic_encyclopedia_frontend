<template>
  <v-container>
    <v-row justify="center">
      <v-col md="4">
        <v-alert v-if="userNotLoggedIn" border="left"
          color="pink darken-1"
          dark>
          بيانات الدخول غير صحيحة
        </v-alert>
        <div>
          <form v-on:submit.prevent="signin()">
            <v-row>
              <v-col
                class="py-0"
                md="12"
              >
                <v-text-field
                  placeholder="البريد الالكتروني"
                  v-model="email"
                  hint="اسم المستخدم او الدخول الخاص بك"
                  persistent-hint
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
                  hint="كلمة السر الخاصة بك"
                  persistent-hint
                ></v-text-field>
              </v-col>
            </v-row>
            <div class="mt-4">
              <v-btn
                type="submit"
                large depressed tile
                :loading="loggingIn"
                color="deep-purple accent-4 white--text"
                :disabled="loginValidator || loggingIn"
              >دخول</v-btn>
            </div>  
          </form>
        </div>
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