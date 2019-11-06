<template>
  <v-container>
    <v-row>
      <v-col
        v-for="(article, index) in articles"
        :key="index"
        cols="12"
        md="4"
        sm="6"
        >
        <nuxt-link :to="`/article/${article.id}`">
          <v-card
            class="mx-auto"
            outlined
          >
            <v-img v-if="article.image"
              :src="'http://127.0.0.1:8000/api/v1/article/image/'+article.image"
              height="180px"
            ></v-img>
            <v-card-text>
              <v-chip
                class="font-weight-bold"
                color="green lighten-5"
                text-color="green darken-4"
                label
              >
                {{ article.topic.title }}
              </v-chip>
              <h4 class="font-weight-bold">
                {{ article.title }}
              </h4>
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
      const topics = await $axios.$get('/topics')
      return {
        articles: articles.data,
        topics: topics
      }
    } catch (e) {
      return { articles: [], topics: [] }
    }
  },
  data () {
    return {
      articles: [],
      topics: []
    }
  },
}
</script>
