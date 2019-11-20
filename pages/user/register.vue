<template>
  <v-container>
    <v-row justify="center">
      <v-col md="6">
        <v-alert v-if="userNotRegistered" border="left"
          color="pink darken-1"
          dark>
          عذرا عملية التسجيل لم تتم
        </v-alert>
        <form v-on:submit.prevent="register()">
          <v-row>
            <v-col
              class="py-0"
              cols="6" 
            >
              <v-text-field
                placeholder="الاسم الاول"
                v-model="user.first_name"
                hint="اسمك او اسمك واسم والدك"
                persistent-hint
              ></v-text-field>
            </v-col>
            <v-col
              class="py-0"
              cols="6"
            >
              <v-text-field
                placeholder="اسم العائلة"
                v-model="user.last_name"
                hint="اسم الجد او اللقب"
                persistent-hint
              ></v-text-field>
            </v-col>
            <v-col
              class="py-0"
              cols="12"
            >
              <v-text-field
                placeholder="البريد الالكتروني"
                v-model="user.email"
                hint="البريد الالكتروني"
                persistent-hint
              ></v-text-field>
            </v-col>
            <v-col
              class="py-0"
              cols="12" 
            >
              <v-text-field
                placeholder="المؤهل"
                hint="المؤهل او الخبرات العملية"
                persistent-hint
                v-model="user.title"
              ></v-text-field>
            </v-col>
            <v-col
              class="py-0"
              cols="12"
            >
              <v-text-field
                placeholder="كلمة المرور"
                v-model="user.password"
                hint="استخدم حروف وارقام باللغة الانجليزية"
                persistent-hint
                type="password"
              ></v-text-field>
            </v-col>
            <v-col
              class="py-0"
              cols="12"
            >
              <v-text-field
                placeholder="تأكيد كلمة المرور"
                v-model="passwordConform"
                hint="استخدم حروف وارقام باللغة الانجليزية"
                persistent-hint
                type="password"
              ></v-text-field>
            </v-col>
          </v-row>
          <div class="mt-4">
            <v-btn
              type="submit"
              large depressed tile
              color="deep-purple accent-4 white--text"
              :loading="registering"
              :disabled="registerValidator || registering"
            >تسجيل</v-btn>
          </div>  
        </form>
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
        title: null,
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