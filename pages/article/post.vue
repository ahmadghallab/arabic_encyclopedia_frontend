<template>
  <v-container>
    <v-row justify="center">
      <v-col md="6">
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
                placeholder="الموضوع"
                hint="اختار موضوع هذا المقال"
                persistent-hint
              ></v-select>
            </v-col>
            <v-col
              cols="12" 
              class="py-0"
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
                hint="اكتب كل المراجع ان وجدت"
                persistent-hint
                v-model="article.references"
                rows="2"
              ></v-textarea>
            </v-col>
            <v-col
              cols="12"
              class="py-0"
            >
              <v-textarea
                placeholder="ملخص أو مقدمة"
                hint="ملخص المقال او مقدمة عن المقال بدون تنسيق"
                persistent-hint
                v-model="article.summary"
                rows="2"
              ></v-textarea>
            </v-col>
            <v-col
              cols="12"
              class="py-0"
            >
              <v-textarea
                placeholder="كلمات مميزة"
                hint="الكلمات المميزة لهذا المقال استخدم  @ للفصل بين الكلمات"
                persistent-hint
                v-model="article.keywords"
                rows="2"
              ></v-textarea>
            </v-col>
          </v-row> 
          <div class="mt-4 pt-2">
            <v-btn
              @click="postArticle"
              large depressed
              color="deep-purple accent-4 white--text"
              :disabled="postArticleValidator"
              :loading="saving"
            >نشر</v-btn>
            <v-dialog v-model="dialog" max-width="600px">
              <template v-slot:activator="{ on }">
                <v-btn large depressed
                  :disabled="!article.body" 
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
      title: 'إنشاء مقال'
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
        title: null,
        keywords: null,
        body: null,
        summary: null,
        references: null,
        topic: null
      },
      compiledMarkdownBody: null,
      saving: false,
      dialog: false
    }
  },
  computed: {
    postArticleValidator () {
      return (this.article.title && this.article.body && !this.saving) ? false : true
    }
  },
  methods: {
    compiledMarkdown () {
      this.compiledMarkdownBody = snarkdown(this.article.body)
    },
    async postArticle() {
      this.saving = true
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
