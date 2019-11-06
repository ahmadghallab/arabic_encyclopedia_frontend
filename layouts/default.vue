<template>
  <v-app>
    <v-app-bar light flat color="deep-purple accent-4" app>
      <div class="flex-grow-1"></div>
      <v-toolbar-title>
        <nuxt-link to="/" class="font-weight-bold text-top">
          {{ logo }}
        </nuxt-link>
      </v-toolbar-title>
      <div class="flex-grow-1"></div>
    </v-app-bar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <v-footer 
      padless
      color="white"
      class="py-2"
    >
      <v-container>
        <v-row>
          <v-col
            md="auto"
          >
            <v-subheader>
              المواد الطبية المنشورة في الموقع هي بمثابة معلومات فقط ولا يجوز اعتبارها استشارة طبية أو توصية علاجية
              <br />
              حقوق الطبع محفوظة {{ logo }} - {{ new Date().getFullYear() }}
            </v-subheader>
          </v-col>
          <v-col class="text-left">
            <span v-if="isAuthenticated">
              <v-btn 
                large depressed
                color="deep-purple accent-4 white--text"
                to="/article/post">مقال جديد
              </v-btn>
              <v-btn large depressed 
                color="green lighten-3 white--text mr-2" @click="logout">خروج
              </v-btn>
            </span>
            <span v-else>
              <v-btn 
                large depressed
                color="deep-purple accent-4 white--text"
                to="/user/signin">دخول
              </v-btn>
            </span>
          </v-col>
        </v-row>
      </v-container>
    </v-footer>
  </v-app>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  data: () => ({
    logo: 'نبــاتي'
  }),
  computed: {
    ...mapGetters(['isAuthenticated'])
  },
  methods: {
    ...mapActions({
      logout: 'logout'
    }),
    logout () { 
      this.$store.dispatch('logout').then(() => { 
        this.$router.push('/')
      })
    },
  }
}
</script>
<style>
  @font-face {
  font-family: 'HelveticaNeue';
  font-style: normal;
  font-weight: normal;
  src: url('../static/HelveticaNeueRegular.woff') format('woff');
  }
  @font-face {
  font-family: 'HelveticaNeue';
  font-style: bold;
  font-weight: bold;
  src: url('../static/HelveticaNeueBold.woff') format('woff');
  }
  .v-application {
    direction: rtl;
    font-family: 'HelveticaNeue', sans-serif !important;
  }
  .theme--light.v-application {
    background-color: #f3f3f3;
  }
  a {
    text-decoration: none;
  }
  a:hover {
    opacity: 0.9;
  }
  .v-application--is-ltr .v-list-item__avatar:first-child {
    margin-left: 24px;
    margin-right: 0;
  }
  .v-list-item__title, .v-list-item__subtitle {
    overflow: initial;
  }
  .article_title {
    font-size: 1.5rem;
    font-weight: bold;
  }
  .v-application--is-ltr .v-divider--inset:not(.v-divider--vertical) {
    margin-right: 72px;
    margin-left: 0;
  }
  .v-application ul, .v-application ol {
    padding-right: 50px;
    padding-left: 0;
  }
  .v-textarea textarea, .v-application, .v-card__subtitle, .v-card__text {
    line-height: initial;
    font-size: 1.2rem;
  }
  .v-card__text {
    color: #000 !important;
  }
  .v-toolbar__title a {
    color: #fff !important;
  }
  .line-height-18 {
    line-height: 1.8;
  }
  .theme--light.v-card.v-card--outlined {
    border: 0;
    border-radius: 10px;
  }
  .text-top {
    vertical-align: text-top;
  }
  .v-input .v-label {
    line-height: 1;
    left: initial !important;
    right: 0;
  }
  .v-application .primary--text {
    color: #66BB6A !important;
    caret-color: #66BB6A !important;
  }
  .v-text-field input {
    line-height: initial;
  }
</style>