<template>
  <v-container>
    <v-row v-if="loading">
      <v-col md="6" v-for="i in [1,2,3]" :key="i">
        <v-skeleton-loader
          type="paragraph"
          class="py-4 my-4"
        >
        </v-skeleton-loader>
      </v-col>
    </v-row>
    <v-row v-else justify="center">
      <v-col md="6">
        <form>
          <v-row>
            <v-col
              class="py-0"
              cols="12" 
              md="6"
            >
              <v-text-field
                placeholder="الاسم الاول"
                hint="اسمك او اسمك واسم والدك"
                persistent-hint
                v-model="user.first_name"
              ></v-text-field>
            </v-col>
            <v-col
              class="py-0"
              cols="12" 
              md="6"
            >
              <v-text-field
                placeholder="الاسم الاخير"
                hint="اسم الجد او اللقب"
                persistent-hint
                v-model="user.last_name"
              ></v-text-field>
            </v-col>
            <v-col
              class="py-0"
              cols="12"
            >
              <v-text-field
                placeholder="الايميل"
                hint="البريد الالكتروني"
                persistent-hint
                v-model="user.email"
              ></v-text-field>
            </v-col>
            <v-col
              class="py-0"
              cols="12" 
            >
              <v-text-field
                placeholder="المؤهل"
                hint="المؤهل او الخبرات العملية"
                persistent-hint
                v-model="user.title"
              ></v-text-field>
            </v-col>
          </v-row>
          <div class="mt-4">
            <v-btn
              large depressed
              color="deep-purple accent-4 white--text"
              :disabled="updateUserValidator"
              :loading="saving"
              @click="updateUser"
            >حفظ</v-btn>
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
      title: 'تعديل بياناتي'
    }
  },
  async asyncData({ $axios, params }) {
    try {
      const user = await $axios.$get(`/user/${params.id}`)
      return { 
        user: user,
        loading: false 
      }
    } catch (e) {
      return { user: [] }
    }
  },
  data () {
    return {
      loading: true,
      saving: false,
      user: []
    }
  },
  computed: {
    updateUserValidator () {
      return (this.user.first_name && this.user.last_name && this.user.email && !this.saving) ? false : true
    }
  },
  methods: {
    async updateUser() {  
      this.saving = true    
      try {
        let response = await this.$axios.$patch(`/user/${this.user.id}`, this.user);
        this.$router.push("/user/"+this.user.id);
      } catch (e) {
        console.log(e);
      }
    }
  }
}
</script>