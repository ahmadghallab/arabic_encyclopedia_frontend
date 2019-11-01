<template>
  <v-container>
    <v-row>
      <v-col
        cols="12"
        md="8"
        >
        <v-card
          class="mx-auto mb-2"
          outlined
        >
          <v-card-text>
            <v-chip
              class="font-weight-bold"
              color="yellow lighten-1"
              label
            >
              {{ article.topic.title }}
            </v-chip>
            <h2 class="article_title">
              {{ article.title }}
            </h2>
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
        <v-card-actions>
          <v-btn
            large
            :to="`/article/${article.id}/edit`"
            color="indigo accent-4 white--text"
          >تعديل</v-btn>
        </v-card-actions>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import snarkdown from 'snarkdown';

export default {
  head () {
    return {
      title: this.article.title
    }
  },
  async asyncData({ $axios, params }) {
    try {
      const article = await $axios.$get(`/article/${params.id}`)
      return { article }
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
      }
    }
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