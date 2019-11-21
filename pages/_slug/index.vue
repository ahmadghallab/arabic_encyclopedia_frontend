<template>
  <div>
    <v-container>
      <v-row justify="center">
        <v-col
          cols="12"
          sm="10"
          >
          <div class="font-weight-bold my-0 purple-accent-1">
            {{ article.topic.title }}
          </div>
          <h1 class="article_title">
            {{ article.title }}
          </h1>
          <div class="d-flex flex-no-wrap align-center mt-4 py-1">
            <v-avatar class="ml-4" tile v-if="article.user.profile_photo">
              <v-img
                src="https://cdn.vuetifyjs.com/images/john.jpg"
                alt="John"
              >
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
            </v-avatar>
            <v-avatar tile color="purple accent-1" class="ml-4" v-else>
              <span class="white--text font-weight-bold mb-2">{{ article.user.first_name.substr(0,1) + ' ' +  article.user.last_name.substr(0,1) }}</span>
            </v-avatar>
            <div>
              <p class='mb-0'>
                {{ article.user.first_name + ' ' + article.user.last_name }}
              </p>
              <v-subheader>
                <span v-if="article.user.title">
                  {{ article.user.title }}
                </span>
                <span v-else>
                  محرر محتوي بموقع مقال
                </span>
              </v-subheader>
            </div>
          </div>
          <p class="my-4" v-if="article.summary">
            {{ article.summary }}
          </p>
          <div v-if="article.image" class="mb-4 py-4">
            <v-img 
              :src="'http://api.ma8al.com/v1/article/image/'+article.image" height="350px">
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
          </div>
          <div class="content" v-html="compiledMarkdown(article.body)"></div>
          <v-subheader class="mt-4">
            آخر تعديل 
            {{ formatDate(article.updated_at) }}
          </v-subheader>
          <div class="mt-4" v-if="article.references">
            <v-subheader>المراجع</v-subheader>
            <div class="content" v-html="compiledMarkdown(article.references)"></div>
          </div>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col col="12" sm="10">
          <div v-if="isAuthenticated">
            <v-btn 
              :to="`/article/${article.id}/edit`"
              depressed dark fab 
              color="deep-purple accent-4 white--text">
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
            <v-btn
              depressed dark fab 
              color="pink lighten-2 white--text"
              class="mr-2"
              @click="dialog = true"
            >
            <v-icon>mdi-delete</v-icon>
            </v-btn>
            <v-dialog
              v-model="dialog"
              max-width="350"
            >
              <v-card>
                <v-card-text>
                  <h3 class="article_title py-3">هل تريد حذف مقال {{ article.title }} ؟</h3>
                  لا يمكن استرجاع هذا المقال مرة اخري! هل انت متأكد ؟
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>

                  <v-btn
                    large depressed
                    :loading="deleting"
                    @click="deleteArticle()"
                  >
                    نعم احذف
                  </v-btn>

                  <v-btn
                    large depressed
                    class="mr-2"
                    @click="dialog = false"
                  >
                    تراجع
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </div>
        </v-col>
      </v-row>
    </v-container>
    <v-footer class="py-4" v-if="relatedArticles.length">
      <div class="container">
        <v-row justify="center">
          <v-col col="12" sm="10">
            <v-subheader class="text-top ml-4 font-weight-bold mb-2">مقالات ذات صلة</v-subheader>
            <v-row>
              <v-col col="12" md="4" sm="6" v-for="article in relatedArticles" :key="'relatedArticle_'+article.id">
                <nuxt-link
                  :to="`/${article.id}-${article.slug}`">
                  <div>
                    <v-img v-if="article.image" 
                      :src="'http://api.ma8al.com/v1/article/image/'+article.image" height="170px" class="mb-2">
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
                    <h4 class="font-weight-bold mb-0">{{ article.title }}</h4>
                    <v-subheader class="mt-2">{{ article.summary.substr(0,100) }}</v-subheader>
                  </div>
                </nuxt-link>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </div>
    </v-footer>
  </div>
</template>
<script>
import * as marked from 'marked'
import { mapGetters } from 'vuex'

export default {
  head () {
    return {
      title: this.article.title
    }
  },
  async asyncData({ $axios, params }) {
    try {
      const articleId = params.slug.split('-')[0]
      const article = await $axios.$get(`/article/${articleId}/withrelated`)
      return { 
        article: article.article, 
        relatedArticles: article.related_articles
      }
    } catch (e) {
      return { article: [], relatedArticles: [] }
    }
  },
  data () {
    return {
      deleting: false,
      dialog: false,
      article: [],
      relatedArticles: []
    }
  },
  computed: {
    ...mapGetters(['isAuthenticated'])
  },
  methods: {
    async deleteArticle() {
      this.deleting = true    
      try {
        await this.$axios.$delete(`/article/${this.article.id}`);
        this.$router.push("/");
      } catch (e) {
        console.log(e);
      }
    },
    compiledMarkdown (text) {
      return marked(text)
    },
    formatDate(date) {
      const d = new Date(date)
      var ms = ['يناير', 'فبراير', 'مارس', 'ابريل', 'مايو', 'يونيو', 'يوليو', 'اغسطس', 'مارس', 'اكتوبر', 'نوفمبر', 'ديسمبر'];
      return d.getDate() + ' ' + ms[d.getMonth()] + ' ' + d.getFullYear();
    }
  }
}
</script>