<template>
  <v-app>
    <v-app-bar flat app>
      <div class="flex-grow-1"></div>
      <v-toolbar-title class="font-weight-bold">
        <!-- <nuxt-link to="/" class="font-weight-bold text-top"> -->
          {{ logo }}
        <!-- </nuxt-link> -->
      </v-toolbar-title>
      <div class="flex-grow-1"></div>
      <!-- <v-toolbar-items>
        <v-switch v-model="$vuetify.theme.dark" label="الوضع الليلي"></v-switch>
      </v-toolbar-items> -->
    </v-app-bar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <v-footer
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
                depressed large
                to="/article/post">مقال جديد
              </v-btn>
              <v-btn 
                depressed large
                class="mr-1"
                to="/topic">الموضوعات
              </v-btn>
              <v-btn
                depressed large
                class="mr-1" @click="logout">خروج
              </v-btn>
            </span>
            <span v-else>
              <v-btn 
                depressed large
                to="/user/signin">دخول
              </v-btn>
              <v-btn 
                depressed large
                to="/user/register">تسجيل
              </v-btn>
            </span>
            <v-chip large>
            <v-switch v-model="$vuetify.theme.dark" label="وضع ليلي"></v-switch>
            </v-chip>
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
    logo: 'مقــــال'
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
    toggleTheme() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark
    }
  },
  created() {
    console.log(this.$vuetify.theme.dark);
    
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
  a {
    text-decoration: none;
  }
  a:hover {
    opacity: 0.9;
  }
  .v-textarea textarea, .v-application, .v-card__subtitle, .v-card__text {
    line-height: initial;
    font-size: 1.2rem;
  }
  .theme--light.v-card.v-card--outlined, .theme--dark.v-card.v-card--outlined {
    border: 0;
    border-radius: 10px;
  }
  .theme--dark.v-card > .v-card__text, .theme--dark.v-card .v-card__subtitle {
    color: rgba(255, 255, 255, 1);
  }
  .theme--light.v-card > .v-card__text, .theme--light.v-card .v-card__subtitle {
    color: rgba(0, 0, 0, 1);
  }
  .v-input--selection-controls:not(.v-input--hide-details) .v-input__slot {
    direction: ltr;
    margin-left: 8px;
    margin-right: 0;
  }
  .v-application--is-ltr .v-divider--inset:not(.v-divider--vertical) {
    margin-right: 72px;
    margin-left: 0;
  }
  .v-application ul, .v-application ol {
    padding-right: 50px;
    padding-left: 0;
  }
  ul {
    list-style: none;
  }
  ul li::before {
    content: "\2022";
    /* color: #2ce080; */
    font-weight: bold;
    display: inline-block; 
    width: 1em;
    margin-right: -1em;
  }
  /* .theme--light.v-application {
    background-color: #f7f8fa;
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
  .v-card__text {
    color: #000 !important;
  }
  .v-toolbar__title a {
    color: #fff !important;
  }
  .line-height-18 {
    line-height: 1.8;
  }
  .text-top {
    vertical-align: text-top;
  }
  .v-input .v-label {
    line-height: 1;
    left: initial !important;
    right: 0;
  }
  .v-text-field input {
    line-height: initial;
  }
   */
</style>