<template>
  <div>
    <v-footer class="pt-4 mb-4" v-if="random_articles.length">
      <div class="container">
        <v-row v-if="loading">
          <v-col col="12" md="4" sm="6" v-for="i in [1,2,3]" :key="i">
            <v-skeleton-loader
              type="paragraph"
              class="py-4 my-4"
            >
            </v-skeleton-loader>
          </v-col>
        </v-row>
        <v-row v-else>
          <v-col col="12" md="4" sm="6" v-for="article in random_articles" :key="'randArticle_'+article.id">
            <nuxt-link
              :to="`/article/${article.id}`">
              <div class="mb-4">
                <v-img v-if="article.image" 
                  :src="'http://127.0.0.1:8000/api/v1/article/image/'+article.image" height="180px">
                  <template v-slot:placeholder>
                    <v-row
                      class="fill-height ma-0"
                      align="center"
                      justify="center"
                    >
                      <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                    </v-row>
                  </template>
                </v-img>
                <div class="font-weight-bold my-1 purple-accent-1">
                  <small>
                    {{ article.topic.title }}
                  </small>
                </div>
                <h4 class="font-weight-bold mb-2">{{ article.title }}</h4>
                <v-subheader>{{ article.summary.substr(0,100) }}</v-subheader>
              </div>
            </nuxt-link>
          </v-col>
        </v-row>
      </div>
    </v-footer>
    <v-container>
      <v-row justify="center" v-if="loading">
        <v-col col="12" md="4" sm="6" v-for="i in [1,2,3]" :key="i">
          <v-skeleton-loader
            class="py-4 my-4"
            type="paragraph"
          >
          </v-skeleton-loader>
        </v-col>
      </v-row>
      <v-row v-else>
        <v-col col="12" md="4" sm="6" v-for="article in ordered_articles" :key="'ordrArticle_'+article.id">
          <nuxt-link
            :to="`/article/${article.id}`">
            <div class="mb-4">
              <v-img v-if="article.image" 
                :src="'http://127.0.0.1:8000/api/v1/article/image/'+article.image" height="180px">
                <template v-slot:placeholder>
                  <v-row
                    class="fill-height ma-0"
                    align="center"
                    justify="center"
                  >
                    <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                  </v-row>
                </template>
              </v-img>
              <div class="font-weight-bold my-1 purple-accent-1">
                <small>
                  {{ article.topic.title }}
                </small>
              </div>
              <h4 class="font-weight-bold mb-2">{{ article.title }}</h4>
              <v-subheader>{{ article.summary.substr(0,100) }}</v-subheader>
            </div>
          </nuxt-link>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
export default {
  head () {
    return {
      title: 'موسوعة عربية ترتقي لعقلك'
    }
  },
  async asyncData ({$axios, params}) {
    try {
      const articles = await $axios.$get('/articles')
      return {
        ordered_articles: articles.ordered_articles.data,
        random_articles: articles.random_articles,
        loading: false
      }
    } catch (e) {
      return { articles: [], topics: [] }
    }
  },
  data () {
    return {
      loading: true,
      ordered_articles: [],
      random_articles: []
    }
  },
}
</script>
