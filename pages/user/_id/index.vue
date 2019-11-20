<template>
  <div>
    <v-footer class="pt-4 mb-4">
      <div class="container">
        <v-row>
          <v-col col="12" md="4" sm="6">
            <div class="d-flex flex-no-wrap align-center my-4">
              <v-avatar class="ml-4" size="62" v-if="user.profile_photo">
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
                      <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                    </v-row>
                  </template>
                </v-img>
              </v-avatar>
              <v-avatar tile color="purple accent-1" class="ml-4" size="62" v-else>
                <span class="white--text font-weight-bold mb-2">{{ user.first_name.substr(0,1) + ' ' +  user.last_name.substr(0,1) }}</span>
              </v-avatar>
              <div>
                <h3 class='mb-1'>
                  {{ user.first_name + ' ' + user.last_name }}
                </h3>
                <v-subheader>
                  <span v-if="user.title">
                    {{ user.title }}
                  </span>
                  <span v-else>
                    محرر محتوي بموقع موضوع
                  </span>
                </v-subheader>
              </div>
            </div>
          </v-col>
        </v-row>
      </div>
    </v-footer>
    <v-container>
      <v-row justify="center">
        <v-col col="12" md="4" sm="6">
          <v-subheader>
            لا يوجد مقالات حاليا
          </v-subheader>
        </v-col>
      </v-row>
      <v-btn
        class="mt-3"
        depressed large tile
        color="purple accent-1 white--text"
        :to="`/user/${user.id}/edit`"
      >تعديل</v-btn>
    </v-container>
  </div>
</template>
<script>
export default {
  head () {
    return {
      title: this.pageTitle
    }
  },
  async asyncData({ $axios, params }) {
    try {
      const user = await $axios.$get(`/user/${params.id}`)
      return { 
        user: user
      }
    } catch (e) {
      return { user: [] }
    }
  },
  data () {
    return {
      user: []
    }
  },
  computed: {
    pageTitle () {
      return this.user.first_name + ' ' + this.user.last_name
    }
  }
}
</script>