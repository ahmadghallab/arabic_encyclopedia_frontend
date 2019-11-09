<template>
  <v-container>
    <v-row>
      <v-col
        cols="12"
        sm="8"
        >
        <v-card
          class="mx-auto mb-2"
          outlined
        >
          <v-card-text>
            <v-chip
              
            >
              {{ article.topic.title }}
            </v-chip>
            <h3 class="article_title">
              {{ article.title }}
            </h3>
          </v-card-text>
          <v-img v-if="article.image" 
            :src="'http://127.0.0.1:8000/api/v1/article/image/'+article.image" height="350px">
          </v-img>
          <v-divider v-else inset></v-divider>
          <v-card-text>
            <div v-html="compiledMarkdown(article.body)"></div>
          </v-card-text>
          <v-subheader>
            {{'من قبل ' + article.user.first_name + ' ' + article.user.last_name + ' - ' + formatDate(article.created_at) }} 
          </v-subheader>
        </v-card>
        <v-card-actions v-if="isAuthenticated">
          <v-btn
            depressed large
            :to="`/article/${article.id}/edit`"
          >تعديل</v-btn>
        </v-card-actions>
      </v-col>
      <v-col sm="4">
        <nuxt-link
          v-for="article in relatedArticles" :key="'relatedArticle_'+article.id" 
          :to="`/article/${article.id}`">
          <v-card
            class="mx-auto mb-4"
            outlined
          >
            <v-img v-if="article.image"
              :src="'http://127.0.0.1:8000/api/v1/article/image/'+article.image"
              height="150px"
            ></v-img>
            <v-card-text>
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
import snarkdown from 'snarkdown';
import { mapGetters } from 'vuex'

export default {
  head () {
    return {
      title: this.article.title
    }
  },
  async asyncData({ $axios, params }) {
    try {
      const article = await $axios.$get(`/article/${params.id}`)
      return { article: article.article, relatedArticles: article.related_articles }
    } catch (e) {
      return { article: [] }
    }
  },
  data () {
    return {
      article: {
        title: '',
        body: '',
        image: ''
      },
      relatedArticles: []
    }
  },
  computed: {
    ...mapGetters(['isAuthenticated'])
  },
  methods: {
    compiledMarkdown (text) {
      return snarkdown(text)
    },
    formatDate(date) {
      const d = new Date(date)
      var ms = ['يناير', 'فبراير', 'مارس', 'ابريل', 'مايو', 'يونيو', 'يوليو', 'اغسطس', 'مارس', 'اكتوبر', 'نوفمبر', 'ديسمبر'];
      return d.getDate() + ' ' + ms[d.getMonth()] + ' ' + d.getFullYear();
    }
  }
}
</script>