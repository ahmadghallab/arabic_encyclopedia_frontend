<template>
  <v-container>
    <v-row justify="center">
      <v-col md="4">
        <v-alert v-if="userNotRegistered" border="left"
          color="pink darken-1"
          dark>
          عذرا عملية التسجيل لم تتم
        </v-alert>
        <v-card
          outlined
        >
          
          <v-card-text>
            <form v-on:submit.prevent="register()">
              <v-row>
                <v-col
                  class="py-0"
                  md="6"
                >
                  <v-text-field
                    placeholder="الاسم الاول"
                    v-model="user.first_name"
                  ></v-text-field>
                </v-col>
                <v-col
                  class="py-0"
                  md="6"
                >
                  <v-text-field
                    placeholder="اسم العائلة"
                    v-model="user.last_name"
                  ></v-text-field>
                </v-col>
                <v-col
                  class="py-0"
                  md="12"
                >
                  <v-text-field
                    placeholder="البريد الالكتروني"
                    v-model="user.email"
                  ></v-text-field>
                </v-col>
                <v-col
                  class="py-0"
                  md="12"
                >
                  <v-text-field
                    placeholder="كلمة المرور"
                    v-model="user.password"
                    type="password"
                  ></v-text-field>
                </v-col>
                <v-col
                  class="py-0"
                  md="12"
                >
                  <v-text-field
                    placeholder="تأكيد كلمة المرور"
                    v-model="passwordConform"
                    type="password"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-card-actions>
                <v-btn
                  type="submit"
                  large
                  color="deep-purple accent-4 white--text"
                  :disabled="registerValidator || registering"
                >تسجيل</v-btn>
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
      registering: false,
      userNotRegistered: false,
      user: {
        first_name: null,
        last_name: null,
        email: null,
        password: null
      },
      passwordConfirm: null,
    }
  },
  head () {
    return {
      title: 'تسجيل'
    }
  },
  computed: {
    registerValidator () {
      return (this.user.first_name && this.user.last_name && this.user.email && this.user.password && this.password == this.passwordConfirm) ? false : true
    }
  },
  methods: {
    async register () {
      this.registering = true
      try {
        await this.$axios.$post("/user/register", this.user);
        this.$router.push("/user/signin");
      } catch (e) {
        this.userNotRegistered = true
      }
    }
  }
}
</script>