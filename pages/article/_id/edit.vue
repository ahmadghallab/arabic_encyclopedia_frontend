<template>
  <v-container>
    <v-row justify="center">
      <v-col md="8">
        <div class="mb-4" v-if="article.image">
          <v-img :src="'https://www.ma8al.com/api/v1/article/image/'+article.image" height="300px">
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
          <v-btn
            class="mt-4"
            @click="deleteImage"
            depressed large tile
            :loading="deleting"
          >حذف الصورة
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
        <div class="d-flex flex-no-wrap align-center mt-4 py-1">
          <v-subheader class="font-weight-bold pl-4 mb-2">
            تعديل المحتوي
          </v-subheader>
          <v-divider></v-divider>
        </div>
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
                v-model="articleTopic"
                item-text="title"
                item-value="id"
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
              large depressed tile
              color="purple accent-1 white--text"
              :disabled="updateArticleValidator"
              :loading="saving"
              @click="updateArticle"
              class="ml-2"
            >نشر</v-btn>
            <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
              <template v-slot:activator="{ on }">
                <v-btn :disabled="!article.body" large depressed tile 
                  @click="compiledMarkdown()" v-on="on">معاينة المحتوي</v-btn>
              </template>
              <v-card>
                <v-row justify="center">
                  <v-col
                    cols="12"
                    sm="8"
                    >
                    <div class="content" v-html="compiledMarkdownBody"></div>
                    <v-btn large depressed tile class="my-4"
                      @click="dialog = false">تمت المعاينة</v-btn>
                  </v-col>
                </v-row>
              </v-card>
            </v-dialog>
          </div> 
        </form>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import * as marked from 'marked'

export default {
  head () {
    return {
      title: 'تعديل مقال'
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
    },
    articleTopic() {
      return parseInt(this.article.topic)
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
      this.compiledMarkdownBody = marked(this.article.body)
    },
    onFileChange(event) {
      this.uploadImage(event)
    },
    async updateArticle() {
      this.saving = true    
      try {
        let response = await this.$axios.$patch(`/article/${this.article.id}`, this.article);
        this.$router.push(`/${response.article_id}-${response.article_slug}`);
      } catch (e) {
        console.log(e);
      }
    }
  }
}
</script>
