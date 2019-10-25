<template>
  <v-container>
    <v-row>
      <v-col
        cols="12"
        md="6"
        >
        <v-card
          class="mx-auto mb-4"
        >
          <v-list three-line>
            <template v-for="(item, index) in topic2">
              <v-subheader
                v-if="item.header"
                :key="item.header"
                v-text="item.header"
              ></v-subheader>

              <v-divider
                v-else-if="item.divider"
                :key="index"
                :inset="item.inset"
              ></v-divider>

              <v-list-item
                v-else
                :key="item.title"
                @click=""
              >
                <v-list-item-avatar>
                  <v-img :src="item.avatar"></v-img>
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title v-html="item.title"></v-list-item-title>
                  <v-list-item-subtitle v-html="item.subtitle"></v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </template>
          </v-list>
        </v-card>
        <v-card
          class="mx-auto"
        >
          <v-list three-line>
            <template v-for="(item, index) in topic2">
              <v-subheader
                v-if="item.header"
                :key="item.header"
                v-text="item.header"
              ></v-subheader>

              <v-divider
                v-else-if="item.divider"
                :key="index"
                :inset="item.inset"
              ></v-divider>

              <v-list-item
                v-else
                :key="item.title"
                @click=""
              >
                <v-list-item-avatar>
                  <v-img :src="item.avatar"></v-img>
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title v-html="item.title"></v-list-item-title>
                  <v-list-item-subtitle v-html="item.subtitle"></v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </template>
          </v-list>
        </v-card>
      </v-col>
      <v-col
        cols="12"
        md="6"
        >
        <v-card
          class="mx-auto"
        >
          <v-list three-line>
            <v-subheader>موضوعات تهمك</v-subheader>
            <template v-for="(article, index) in articles">
              <v-list-item
                :key="index"
                @click=""
              >
                <v-list-item-avatar>
                  <v-img :src="'http://127.0.0.1:8000/api/v1/article/image/thumb_'+article.image"></v-img>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title v-html="article.title"></v-list-item-title>
                  <v-list-item-subtitle>
                    {{ strippedContent(article.body) }}
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-divider
                :inset="true"
                v-if="index + 1 < articles.length"
                :key="'line-'+index"
              ></v-divider>
            </template>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  head () {
    return {
      title: 'الصفحة الرئيسية'
    }
  },
  async asyncData ({$axios, params}) {
    try {
      const articles = await $axios.$get('/articles')
      return {
        articles: articles
      }
    } catch (e) {
      return { articles: [] }
    }
  },
  data () {
    return {
      articles: [],
      topic2: [
        { header: 'التداوي بالفلسفة' },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
          title: 'ما هي فوائد عين الجمل',
          subtitle: "إنّ ثمرة عين الجمل أو ما يُعرف ايضاً بالجوز هي عبارة عن ثمرة قابلة للأكل تنتمي لواحدة من أشجار جنس",
        },
        { divider: true, inset: true },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
          title: 'Summer BBQ <span class="grey--text text--lighten-1">4</span>',
          subtitle: "<span class='text--primary'>to Alex, Scott, Jennifer</span> &mdash; Wish I could come, but I'm out of town this weekend.",
        },
        { divider: true, inset: true },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
          title: 'Oui oui',
          subtitle: "<span class='text--primary'>Sandra Adams</span> &mdash; Do you have Paris recommendations? Have you ever been?",
        },
      ]
    }
  },
  methods: {
    strippedContent(content) {
      let regex = /(<([^>]+)>)/ig;
      return content.replace(regex, "").substr(0, 100);
    }
  }
}
</script>
