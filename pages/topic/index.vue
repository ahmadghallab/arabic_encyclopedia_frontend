<template>
  <v-container>
    <v-row justify="center">
      <v-col md="6">
        <v-card outlined class="mb-4" v-for="topic in topics" :key="topic.name">
          <div class="d-flex flex-no-wrap justify-space-between">
            <v-card-text>
              <h3 class="article_title">
                {{ topic.title }}
              </h3>
              <v-subheader class="mt-1">
                <span v-if="topic.articles_count">
                  {{ topic.articles_count }} مقال
                </span>
                <span v-else>
                  لا يوجد مقالات لهذا الموضوع
                </span>
              </v-subheader>
            </v-card-text>
            <v-card-actions v-if="isAuthenticated">
              <v-btn 
                :to="'/topic/'+topic.id+'/edit'" 
                depressed small dark fab 
                color="deep-purple accent-4 white--text">
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
            </v-card-actions>
          </div>
        </v-card>
        <form v-on:submit.prevent="postTopic()" v-if="isAuthenticated">
          <v-text-field
            placeholder="الموضوع"
            hint="اضف موضوع جديد"
            persistent-hint
            v-model="title"
          ></v-text-field>
          <div class="mt-4">
            <v-btn
              type="submit"
              large depressed
              color="deep-purple accent-4 white--text"
              :disabled="newTopicValidator"
              :loading="saving"
            >أضف</v-btn>
          </div>
        </form>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  head () {
    return {
      title: 'الموضوعات'
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
      title: null,
      saving: false,
      dialog: false
    }
  },
  computed: {
    newTopicValidator () {
      return (this.title) ? false : true
    },
    ...mapGetters(['isAuthenticated'])
  },
  methods: {
    async postTopic() {
      this.saving = true
      try {
        let response = await this.$axios.$post('/topics', {'title': this.title});
        this.topics.push(response);
        this.saving = false
        this.title = null
      } catch (e) {
        console.log(e);
      }
    }
  }
}
</script>
