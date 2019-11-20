<template>
  <v-container class="mt-4">
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
      <v-col col="12" md="4" sm="6" v-for="article in articles" :key="'ordrArticle_'+article.id">
        <nuxt-link
          :to="`/${article.id}-${article.slug}`">
          <div class="mb-4">
            <v-img v-if="article.image" 
              :src="'http://www.ma8al.com/api/v1/article/image/'+article.image"
              height="180px">
              <template v-slot:placeholder>
                <v-row
                  class="fill-height ma-0"
                  align="center"
                  justify="center"
                >
                  <v-progress-circular indeterminate color="purple accent-1"></v-progress-circular>
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
    <div class="d-flex flex-no-wrap justify-space-between my-4">
      <v-btn large depressed tile
        class="ml-2"
        color="deep-purple accent-4" 
        :to="{ path: '/', query: { page: currentPage-1 }}" 
        :disabled="currentPage == 1">السابق
      </v-btn>
      <v-btn large depressed tile
        class="mr-2"
        color="deep-purple accent-4 white--text" 
        :to="{ path: '/', query: { page: currentPage+1 }}" 
        :disabled="currentPage == lastPage">التالي
      </v-btn>
    </div>
  </v-container>
</template>
<script>
export default {
  head () {
    return {
      title: 'موسوعة عربية ترتقي لعقلك'
    }
  },
  watchQuery: ['page'],
  async asyncData ({$axios, params, query }) {
    let page = ''
    if (query.page) {
      page = `?page=${query.page}`
    }
    try {
      const articles = await $axios.$get(`/articles${page}`)
      return {
        articles: articles.data,
        currentPage: articles.current_page ,
        lastPage: articles.last_page,
        loading: false
      }
    } catch (e) {
      return { articles: [] }
    }
  },
  data () {
    return {
      loading: true,
      currentPage: null,
      lastPage: null,
      articles: []
    }
  },
}
</script>
