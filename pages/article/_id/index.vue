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
          <v-list-item>
            <v-list-item-content>
              <p
                class="grey--text font-weight-bold mb-0"
              > 
                صحة وتغذية
              </p>
              <v-list-item-title class="my-3">{{ article.title }}</v-list-item-title>
              <v-list-item-subtitle class="mb-3">
                بواسطة أحمد غلاب
                - اخر تعديل {{ article.updated_at }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-img :src="'http://127.0.0.1:8000/api/v1/article/image/'+article.image"></v-img>
          <v-card-text v-html="compiledMarkdown(article.body)"></v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn icon>
              <v-icon>mdi-share-variant</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
        <v-card-actions>
          <v-btn
            text
            :to="`/article/${article.id}/edit`"
            color="indigo darken-4"
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
  }
}
</script>