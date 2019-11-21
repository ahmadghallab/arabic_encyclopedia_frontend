<template>
  <v-app>
    <v-app-bar dark flat color="deep-purple accent-4" app>
      <v-app-bar-nav-icon to="/topic"></v-app-bar-nav-icon>
      <v-toolbar-title>
        <nuxt-link to="/" class="font-weight-bold text-top">
          {{ logo }}
        </nuxt-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click="$vuetify.theme.dark = !$vuetify.theme.dark">
        <v-icon v-if="$vuetify.theme.dark">mdi-brightness-4</v-icon>
        <v-icon v-else>mdi-brightness-7</v-icon>
      </v-btn>
      <v-menu v-if="isAuthenticated"
        transition="slide-y-transition"
        bottom>
        <template v-slot:activator="{ on }">
          <v-btn
            dark
            icon
            v-on="on"
          >
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item :to="'/user/'+userId">
            <v-list-item-title>صفحتي</v-list-item-title>
          </v-list-item>
          <v-list-item to="/article/post">
            <v-list-item-title>إضافة مقال</v-list-item-title>
          </v-list-item>
          <v-list-item @click="logout">
            <v-list-item-title>خروج</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    <v-content>
      <nuxt />
    </v-content>
    <div
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
        </v-row>
      </v-container>
    </div>
  </v-app>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  data: () => ({
    logo: 'مقال'
  }),
  computed: {
    ...mapGetters(['isAuthenticated', 'userId'])
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
  .v-application a {
    color: inherit !important;
    text-decoration: none;
  }
  .v-application, .v-card__subtitle, .v-card__text {
    line-height: 1.6;
    font-size: 1.1rem;
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
    color: #EA80FC;
    font-weight: bold;
    display: inline-block; 
    width: 1em;
    margin-right: -1em;
  }
  .secondary-color {
    color: #F50057;
  }
  .content, .v-textarea textarea {
    line-height: 2 !important;
  }
  .v-subheader {
    height: initial;
    padding: 0;
    font-size: 0.9rem;
  }
  .v-application--is-ltr .v-skeleton-loader__article .v-skeleton-loader__heading {
    margin-right: 16px;
  }
  .v-toolbar__title a {
    color: #fff !important;
    padding-right: 20px;
  }
  .text-top {
    vertical-align: text-top;
  }
  .v-messages__wrapper {
    text-align: right;
  }
  .v-input__slot {
    margin-bottom: 0;
  }
  .v-list-item .v-list-item__title, .v-list-item .v-list-item__subtitle, .v-text-field input {
    line-height: initial;
  }
  .v-select__selection--comma {
    overflow: initial;
  }
  .v-footer {
    padding: 0;
  }
  .v-toolbar__content, .v-toolbar__extension {
    padding-left: 0;
    padding-right: 0;
  }
  .purple-accent-1, a {
    color: #EA80FC;
  }
</style>