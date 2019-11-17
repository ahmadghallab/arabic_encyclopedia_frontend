<template>
  <v-container>
    <v-row justify="center">
      <v-col md="6">
        <form v-on:submit.prevent="updateTopic()">
          <v-text-field
            placeholder="الموضوع"
            v-model="topic.title"
            hint="تعديل الموضوع الحالي"
            persistent-hint
          ></v-text-field>
          <div class="mt-4">
            <v-btn
              type="submit"
              large depressed
              color="deep-purple accent-4 white--text"
              :disabled="validator"
              :loading="saving"
            >حفظ</v-btn>
            <v-btn
              v-if="!topic.articles_count"
              depressed large
              @click="dialog = true"
            >حذف</v-btn>
            <v-dialog
              v-model="dialog"
              max-width="350"
            >
              <v-card>
                <v-card-text>
                  <h3 class="article_title py-3">هل تريد حذف موضوع {{ topic.title }} ؟</h3>
                  لا يمكن استرجاع هذا الموضوع مرة اخري! هل انت متأكد ؟
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>

                  <v-btn
                    large text 
                    :loading="deleting"
                    @click="deleteTopic"
                  >
                    نعم احذف
                  </v-btn>

                  <v-btn
                    large depressed
                    class="mr-2"
                    color="deep-purple accent-4 white--text"
                    @click="dialog = false"
                  >
                    تراجع
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </div>
        </form>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  head () {
    return {
      title: 'تعديل موضوع'
    }
  },
  async asyncData ({$axios, params}) {
    try {
      const topic = await $axios.$get(`topic/${params.id}`)
      return {
        topic: topic
      }
    } catch (e) {
      return { topic: [] }
    }
  },
  data () {
    return {
      topic: [],
      saving: false,
      deleting: false,
      dialog: false
    }
  },
  computed: {
    validator () {
      return (this.topic.title) ? false : true
    }
  },
  methods: {
    async updateTopic() {
      this.saving = true
      try {
        await this.$axios.$patch(`/topic/${this.topic.id}`, {'title': this.topic.title});
        this.$router.push('/topic');
      } catch (e) {
        console.log(e);
      }
    },
    async deleteTopic() {
      this.deleting = true    
      try {
        await this.$axios.$delete(`/topic/${this.topic.id}`);
        this.$router.push("/topic");
      } catch (e) {
        console.log(e);
      }
    },
  }
}
</script>
