<template>
  <v-container>
      <h3 class="mb-3">تعديل موضوع</h3>
    <v-card
      class="px-4 py-4"
      outlined
    >
    <form enctype="multipart/form-data">
      <v-row>
        <v-col
          md="6"
        >
          <v-text-field
            placeholder="العنوان"
            v-model="article.title"
          ></v-text-field>
        </v-col>
        <v-col
          md="2"
        >
          <v-select
            :items="topics"
            v-model="article.topic"
            item-text="title"
            item-value="id"
            placeholder="اختار تصنيف"
          ></v-select>
        </v-col>
        <v-col
          md="2"
        >
          <v-text-field
          
            placeholder="كلمات مميزه"
            v-model="article.tags"
          ></v-text-field>
        </v-col>
        <v-col
          md="2"
        >
          <v-file-input
            @change="onFileChange($event)"
            name="file"
            accept="image/*" 
            placeholder="اختار صورة">
          </v-file-input>
        </v-col>
        <v-col
        md="6"
        >
          <v-textarea
            placeholder="المحتوي"
            v-model="article.body"
          ></v-textarea>
        </v-col>
        <v-col
          md="6"
        >
          <div v-html="compiledMarkdownBody"></div>
        </v-col>
      </v-row>   
    </form>
    </v-card>
    <v-card-actions class="mt-4">
      <v-btn
        @click="updateArticle"
        text
        color="indigo darken-4"
        :disabled="updateArticleValidator"
      >نشر</v-btn>
      <v-btn
        text
        @click="compiledMarkdown()"
        color="indigo darken-4"
      >عرض</v-btn>
    </v-card-actions>
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
  async asyncData({ $axios, params }) {
    try {
      const article = await $axios.$get(`/article/${params.id}`)
      const topics = await $axios.$get('/topics')
      return { article: article,  topics: topics}
    } catch (e) {
      return { article: [], topics: [] }
    }
  },
  data () {
    return {
      topics: [],
      article: {
        id: '',
        title: '',
        tags: '',
        body: '',
        topic: '',
        image: '',
      },
      compiledMarkdownBody: '',
      title: '',
      preview: ''
    }
  },
  computed: {
    updateArticleValidator () {
      return (this.article.title && this.article.body) ? false : true
    }
  },
  methods: {
    compiledMarkdown () {
      this.compiledMarkdownBody = snarkdown(this.article.body)
    },
    onFileChange(event) {
      this.article.image = event
    },
    async updateArticle() {
      const config = {
        headers: { "content-type": "multipart/form-data" }
      };
      let formData = new FormData();
      for (let data in this.article) {
        formData.append(data, this.article[data]);
      }
      
      try {
        let response = await this.$axios.$patch(`/article/${this.article.id}`, formData, config);
        this.$router.push("/");
      } catch (e) {
        console.log(e);
      }
    }
  }
}
</script>
