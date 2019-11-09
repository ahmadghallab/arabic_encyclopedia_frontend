<template>
  <v-container>
    <v-row justify="center">
      <v-col md="6">
        <v-card outlined>
          <v-list two-line>
              <template v-for="(topic, index) in topics">
                <v-list-item :key="topic.title">
                  <v-list-item-content>
                    <nuxt-link :to="'/topic/'+topic.id">
                      <v-list-item-title v-text="topic.title"></v-list-item-title>
                    </nuxt-link>
                  </v-list-item-content>
                  <v-list-item-action>
                    <v-menu bottom left>
                      <template v-slot:activator="{ on }">
                        <v-btn
                          icon
                          v-on="on"
                        >
                          <v-icon>mdi-dots-vertical</v-icon>
                        </v-btn>
                      </template>
                      <v-list>
                        <v-list-item>
                          <v-list-item-title>تعديل</v-list-item-title>
                        </v-list-item>
                        <v-list-item>
                          <v-list-item-title>حذف</v-list-item-title>
                        </v-list-item>
                      </v-list>
                    </v-menu>
                  </v-list-item-action>
                </v-list-item>
              </template>
          </v-list>
        </v-card>
        <v-card
          outlined
          class="mt-4"
        >
          <v-card-text>
            <form v-on:submit.prevent="postTopic()">
              <v-row>
                <v-col
                  class="py-0"
                  md="12"
                >
                  <v-text-field
                    placeholder="الموضوع"
                    v-model="title"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-card-actions>
                <v-btn
                  type="submit"
                  large
                  color="deep-purple accent-4 white--text"
                  :disabled="validator || saving"
                >حفظ</v-btn>
              </v-card-actions>  
            </form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
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
      saving: false
    }
  },
  computed: {
    validator () {
      return (this.title) ? false : true
    }
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
