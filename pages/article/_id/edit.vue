<template>
  <v-container>
    <v-row justify="center">
      <v-col md="6">
        <div class="mb-4" v-if="article.image">
          <v-img  :src="'http://127.0.0.1:8000/api/v1/article/image/'+article.image" height="250px">
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
          <v-btn
            class="mt-4"
            @click="deleteImage"
            depressed
            color="deep-purple accent-4 white--text"
            :loading="deleting"
          >حذف
          </v-btn>
        </div>
        <div class="mb-4" v-else>
          <v-file-input 
            @change="onFileChange($event)"
            name="file"
            accept="image/*" 
            placeholder="اختار صورة"
            hint="اختار صورة ذات جودة عالية وابعاد مناسبه"
            persistent-hint>
          </v-file-input>
        </div>
        <v-overlay :value="uploading">
          <v-progress-circular indeterminate size="64"></v-progress-circular>
        </v-overlay>
        <form>
          <v-row>
            <v-col
              class="py-0"
              cols="8" 
            >
              <v-text-field
                placeholder="العنوان"
                hint="يجب ان يكون العنوان معبر ومميز"
                persistent-hint
                v-model="article.title"
              ></v-text-field>
            </v-col>
            <v-col
              class="py-0"
              cols="4"
            >
              <v-select
                :items="topics"
                v-model="article.topic"
                item-text="title"
                item-value="id"
                placeholder="الموضوعات"
                hint="اختار موضوع هذا المقال"
                persistent-hint
              ></v-select>
            </v-col>
            <v-col
              class="py-0"
              cols="12"
            >
              <v-textarea
                placeholder="المحتوي"
                v-model="article.body"
                hint="اكتب محتوي المقال بالتفصيل بالتنسيق المناسب"
                persistent-hint
              ></v-textarea>
            </v-col>
            <v-col
              cols="12"
              class="py-0"
            >
              <v-textarea
                placeholder="المراجع"
                v-model="article.references"
                hint="اكتب كل المراجع ان وجدت"
                persistent-hint
                rows="2"
              ></v-textarea>
            </v-col>
            <v-col
              cols="12"
              class="py-0"
            >
              <v-textarea
                placeholder="ملخص أو مقدمة"
                v-model="article.summary"
                hint="ملخص المقال او مقدمة عن المقال بدون تنسيق"
                persistent-hint
                rows="2"
              ></v-textarea>
            </v-col>
            <v-col
              class="py-0"
              cols="12"
            >
              <v-textarea
                placeholder="كلمات مميزة"
                v-model="article.keywords"
                hint="الكلمات المميزة لهذا المقال استخدم  @ للفصل بين الكلمات"
                persistent-hint
                rows="2"
              ></v-textarea>
            </v-col>
          </v-row> 
          <div class="mt-4 pt-2">
            <v-btn
              large depressed
              color="deep-purple accent-4 white--text"
              :disabled="updateArticleValidator"
              :loading="saving"
              @click="updateArticle"
            >نشر</v-btn>
            <v-dialog v-model="dialog" max-width="600px">
              <template v-slot:activator="{ on }">
                <v-btn :disabled="!article.body" large depressed 
                  @click="compiledMarkdown()" v-on="on">معاينة المحتوي</v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <h3 class="article_title">
                    {{ article.title }}
                  </h3>
                </v-card-title>
                <v-card-text>
                  <div class="content" v-html="compiledMarkdownBody"></div>
                </v-card-text>
              </v-card>
            </v-dialog>
          </div> 
        </form>
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
      return { 
        article: article,
        topics: topics 
      }
    } catch (e) {
      return { article: [], topics: [] }
    }
  },
  data () {
    return {
      topics: [],
      article: [],
      compiledMarkdownBody: null,
      saving: false,
      uploading: false,
      deleting: false,
      dialog: false
    }
  },
  computed: {
    updateArticleValidator () {
      return (this.article.title && this.article.body && !this.saving) ? false : true
    }
  },
  methods: {
    async deleteImage () {
      this.deleting = true
      try {
        let response = await this.$axios.$post(`/article/${this.article.id}/image`, {'action': 'delete'});
        this.article.image = null
        this.deleting = false
      } catch (e) {
        console.log(e);
      }
    },
    async uploadImage(event) {
      this.uploading = true
      const config = {
        headers: { "content-type": "multipart/form-data" }
      };
      let formData = new FormData();
      formData.append('image', event);
      try {
        let response = await this.$axios.$post(`/article/${this.article.id}/image`, formData, config);
        this.article.image = response.image
        this.uploading = false
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
      this.saving = true    
      try {
        let response = await this.$axios.$patch(`/article/${this.article.id}`, this.article);
        this.$router.push("/article/"+this.article.id);
      } catch (e) {
        console.log(e);
      }
    }
  }
}
</script>
