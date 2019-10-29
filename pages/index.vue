<template>
  <v-container>
    <v-row>
      <v-col
        v-for="(article, index) in articles"
        :key="index"
        cols="12"
        md="4"
        >
        <nuxt-link :to="`/article/${article.id}`">
          <v-card
            class="mx-auto"
            outlined
          >
            <v-img
              :src="'http://127.0.0.1:8000/api/v1/article/image/'+article.image"
              height="250px"
            ></v-img>
            <v-card-text>
              <v-chip
                class="font-weight-bold"
                color="yellow lighten-1"
                label
                text-color=""
              >
                صحة وتغذية
              </v-chip>
              <h3 class="font-weight-bold">
                {{ article.title }}
              </h3>
            </v-card-text>
          </v-card>
        </nuxt-link>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  head () {
    return {
      title: 'الصفحة الرئيسية'
    }
  },
  async asyncData ({$axios, params}) {
    try {
      const articles = await $axios.$get('/articles')
      return {
        articles: articles
      }
    } catch (e) {
      return { articles: [] }
    }
  },
  data () {
    return {
      articles: [],
    }
  },
}
</script>
