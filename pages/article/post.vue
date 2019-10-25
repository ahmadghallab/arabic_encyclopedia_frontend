<template>
    <v-container>
    <h3 class="my-4">إنشاء موضوع</h3>
    <v-row>
      <v-col
        col="12"
        md="6"
      >
        <form>
          <v-select
            solo
            :items="topics"
            v-model="article.topic"
            item-text="title"
            item-value="id"
            placeholder="اختار تصنيف"
          ></v-select>
          <v-text-field
            solo
            placeholder="العنوان"
            v-model="article.title"
          ></v-text-field>
          <v-textarea
            solo
            placeholder="المحتوي"
            v-model="article.body"
          ></v-textarea>
          <v-text-field
            solo
            placeholder="كلمات مميزه"
            v-model="article.tags"
          ></v-text-field>
          <v-file-input
            accept="image/*" 
            placeholder="اختار صورة">
          </v-file-input>
          <v-card-actions>
            <v-btn
              @click="postArticle"
              large
              color="indigo accent-4 white--text"
              :disabled="postArticleValidator"
            >نشر</v-btn>
          </v-card-actions>
        </form>
      </v-col>
      <v-col
        col="12"
        md="6"
      >
        <v-card outlined class="px-4 py-4">
          <p class="mb-0 text-center">عرض مبدي للموضوع</p>
        </v-card>
      </v-col>
      <v-snackbar
        v-model="snackbar"
      >
        {{ text }}
        <v-btn
          color="pink"
          text
          @click="snackbar = false"
        >
          الغاء
        </v-btn>
      </v-snackbar>
    </v-row>
  </v-container>
</template>
<script>

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
      snackbar: false,
      text: '',
      article: {
        title: '',
        tags: '',
        body: '',
        topic: '',
        image: '',
      },
      valid: true,
      title: '',
    }
  },
  computed: {
    postArticleValidator () {
      return (this.article.title && this.article.body) ? false : true
    }
  },
  methods: {
    async postArticle () {
      try {
        await this.$axios.$post('/articles', this.article)
        this.dialog = false
        this.snackbar = true
        this.text = 'تم نشر الموضوع'
        this.article.title = ''
        this.article.tags = ''
        this.article.body = ''
        this.article.topic = ''
        this.article.image = ''
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>
