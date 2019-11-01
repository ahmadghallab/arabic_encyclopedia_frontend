<template>
  <v-app>
    <v-app-bar dark flat color="indigo accent-4" fixed app>
      <v-toolbar-items>
        <v-menu
          transition="slide-y-transition"
          bottom
        >
          <template v-slot:activator="{ on }">
            <v-btn
              text
              dark
              v-on="on"
              class="font-weight-bold"
            >
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item
              v-for="topic in topics"
              :key="topic.id"
              :to="'/topic/'+topic.id"
            >
              <v-list-item-title>{{ topic.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
          <v-list>
            <v-list-item :to="'/article/post'">
              <v-list-item-title>إنشاء مقال</v-list-item-title>
            </v-list-item>
            <v-list-item>
              <v-list-item-title>خروج</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-toolbar-items>
      <div class="flex-grow-1"></div>
      <v-toolbar-title>
        <nuxt-link to="/" class="font-weight-bold text-top">
        الموسوعة العربية
        </nuxt-link>
      </v-toolbar-title>
      <div class="flex-grow-1"></div>
      <v-toolbar-items>
        <v-btn text>
          <svg viewBox="0 0 515.558 515.558" width="18" fill="#fff"><path d="m378.344 332.78c25.37-34.645 40.545-77.2 40.545-123.333 0-115.484-93.961-209.445-209.445-209.445s-209.444 93.961-209.444 209.445 93.961 209.445 209.445 209.445c46.133 0 88.692-15.177 123.337-40.547l137.212 137.212 45.564-45.564c0-.001-137.214-137.213-137.214-137.213zm-168.899 21.667c-79.958 0-145-65.042-145-145s65.042-145 145-145 145 65.042 145 145-65.043 145-145 145z"/></svg>
        </v-btn>
      </v-toolbar-items>
    </v-app-bar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
  </v-app>
</template>
<script>
  export default {
    data: () => ({
      drawer: false,
      group: null,
      topics: [],
    }),

    watch: {
      group () {
        this.drawer = false
      },
    },

    methods: {
      async listTopics() {
        try {
          const topics = await this.$axios.$get('/topics')
          this.topics = topics
        } catch (e) {
          this.topics = []
        }
      },
    },

    created() {
      this.listTopics()
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
  .v-label {
    left: initial !important;
  }
  .v-application ul, .v-application ol {
    padding-right: 50px;
    padding-left: 0;
  }
  .v-textarea textarea, .v-application, .v-card__subtitle, .v-card__text {
    line-height: initial;
    font-size: 1rem;
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
</style>