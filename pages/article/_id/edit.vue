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
            <v-toolbar-title>تعديل موضوع</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <form enctype="multipart/form-data">
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
                  class="py-0"
                  md="12"
                >
                  <v-textarea
                    placeholder="المحتوي"
                    v-model="article.body"
                    rows="10"
                  ></v-textarea>
                </v-col>
              </v-row>  
            </form>
          </v-card-text>
        </v-card>
        <v-card-actions class="mt-4">
          <v-btn
            large
            color="green darken-1 white--text"
            :disabled="updateArticleValidator"
            @click="updateArticle"
          >نشر</v-btn>
          <v-btn
            large
            @click="compiledMarkdown()"
            color="green darken-1 white--text mr-2"
          >معاينة</v-btn>
        </v-card-actions> 
      </v-col>
      <v-col md="5">
        <v-card outlined class="mb-4" v-if="article.image">
          <v-img  :src="'http://127.0.0.1:8000/api/v1/article/image/'+article.image" height="180px">
          </v-img>
          <v-card-text>
            <v-btn
              @click="deleteImage"
              color="green darken-1 white--text"
            >حذف
            </v-btn>
          </v-card-text>
        </v-card>
        <v-card outlined class="mb-4" v-else>
          <v-card-text>
            <v-file-input 
              @change="onFileChange($event)"
              name="file"
              accept="image/*" 
              placeholder="اختار صورة">
            </v-file-input>
          </v-card-text>
        </v-card>
        <v-card outlined>
          <v-card-text>
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
  async asyncData({ $axios, params }) {
    try {
      const article = await $axios.$get(`/article/${params.id}`)
      const topics = await $axios.$get('/topics')
      return { article: article.article,  topics: topics}
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
        image: ''
      },
      compiledMarkdownBody: ''
    }
  },
  computed: {
    updateArticleValidator () {
      return (this.article.title && this.article.body) ? false : true
    }
  },
  methods: {
    async deleteImage () {
      try {
        let response = await this.$axios.$post(`/article/${this.article.id}/image`, {'action': 'delete'});
        this.article.image = ''
      } catch (e) {
        console.log(e);
      }
    },
    async uploadImage(event) {
      const config = {
        headers: { "content-type": "multipart/form-data" }
      };
      let formData = new FormData();
      formData.append('image', event);
      try {
        let response = await this.$axios.$post(`/article/${this.article.id}/image`, formData, config);
        this.article.image = response.image        
      } catch (e) {
        console.log(e);
      }
    },
    compiledMarkdown () {
      this.compiledMarkdownBody = snarkdown(this.article.body)
    },
    onFileChange(event) {
      this.uploadImage(event)
    },
    async updateArticle() {      
      try {
        let response = await this.$axios.$patch(`/article/${this.article.id}`, this.article);
        this.$router.push("/");
      } catch (e) {
        console.log(e);
      }
    }
  },
  created () {
    this.compiledMarkdown ()
  }
}
</script>
