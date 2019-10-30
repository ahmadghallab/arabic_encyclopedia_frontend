<template>
  <v-container>
    <v-card
      outlined
    >
    <v-toolbar
      color="yellow"
      flat
    >
      <v-toolbar-title>إنشاء موضوع</v-toolbar-title>
    </v-toolbar>
    <v-card-text>
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
        <v-card-actions>
          <v-btn
            large
            @click="postArticle"
            color="indigo accent-4 white--text"
            :disabled="postArticleValidator"
          >نشر</v-btn>
          <v-btn
            large
            @click="compiledMarkdown()"
            color="indigo accent-4 white--text mr-2"
          >عرض</v-btn>
        </v-card-actions>  
      </form>
    </v-card-text>
    </v-card>
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
        topic: '',
        image: '',
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
    onFileChange(event) {
      this.article.image = event
    },
    async postArticle() {
      const config = {
        headers: { "content-type": "multipart/form-data" }
      };
      let formData = new FormData();
      for (let data in this.article) {
        formData.append(data, this.article[data]);
      }
      try {
        let response = await this.$axios.$post("/articles", formData, config);
        this.$router.push("/");
      } catch (e) {
        console.log(e);
      }
    }
  }
}
</script>
