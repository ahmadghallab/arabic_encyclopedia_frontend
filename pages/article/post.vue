<template>
  <v-container>
    <v-row>
      <v-col md="7">
        <v-card
          outlined
        >
          <v-toolbar
            color="green lighten-1 white--text"
            flat
          >
            <v-toolbar-title>إنشاء موضوع</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <form>
              <v-row>
                <v-col
                  class="py-0"
                  md="6"
                >
                  <v-text-field
                    placeholder="العنوان"
                    v-model="article.title"
                  ></v-text-field>
                </v-col>
                <v-col
                  class="py-0"
                  md="3"
                >
                  <v-text-field
                    placeholder="كلمات مميزة"
                    v-model="article.tags"
                  ></v-text-field>
                </v-col>
                <v-col
                  class="py-0"
                  md="3"
                >
                  <v-select
                    :items="topics"
                    v-model="article.topic"
                    item-text="title"
                    item-value="id"
                    placeholder="الموضوعات"
                  ></v-select>
                </v-col>
                <v-col
                  md="12"
                  class="py-0"
                >
                  <v-textarea
                    rows="8"
                    placeholder="المحتوي"
                    v-model="article.body"
                  ></v-textarea>
                </v-col>
              </v-row> 
              <v-card-actions>
                <v-btn
                  large
                  @click="postArticle"
                  color="green darken-1 white--text"
                  :disabled="postArticleValidator"
                >نشر</v-btn>
                <v-btn
                  large
                  @click="compiledMarkdown()"
                  color="green darken-1 white--text mr-2"
                >عرض</v-btn>
              </v-card-actions>  
            </form>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col
        md="5"
        >
        <v-card outlined>
          <v-card-text>
            <p class="mb-0">معاينة التنسيق قبل النشر</p>
            <div v-html="compiledMarkdownBody"></div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import snarkdown from 'snarkdown';

export default {
  head () {
    return {
      title: 'إنشاء موضوع'
    }
  },
  async asyncData ({$axios, params}) {
    try {
      const topics = await $axios.$get('/topics')
      return {
        topics: topics
      } 
           
    } catch (e) {
      return { topics: [] }
    }
  },
  data () {
    return {
      topics: [],
      article: {
        title: '',
        tags: '',
        body: '',
        topic: ''
      },
      compiledMarkdownBody: '',
    }
  },
  computed: {
    postArticleValidator () {
      return (this.article.title && this.article.body) ? false : true
    }
  },
  methods: {
    compiledMarkdown () {
      this.compiledMarkdownBody = snarkdown(this.article.body)
    },
    async postArticle() {
      try {
        let response = await this.$axios.$post("/articles", this.article);
        this.$router.push("/article/" + response.article_id);
      } catch (e) {
        console.log(e);
      }
    }
  }
}
</script>
