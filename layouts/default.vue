<template>
  <v-app>
    <v-app-bar dark flat color="indigo accent-4" fixed app>
      <v-toolbar-title class="font-weight-bold">الموسوعة العربية</v-toolbar-title>
      <div class="flex-grow-1"></div>
      <v-toolbar-items>
        <v-btn text >الموضوعات</v-btn>
        <v-btn to="/article/post" text exact>إنشاء موضوع</v-btn>
      </v-toolbar-items>
      <div class="flex-grow-1"></div>
      <v-toolbar-items>
        <v-btn text >خروج</v-btn>
      </v-toolbar-items>
    </v-app-bar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
  </v-app>
</template>
<style>
  @font-face {
  font-family: 'HelveticaNeue';
  font-style: normal;
  font-weight: normal;
  src: url('../static/HelveticaNeueRegular.woff') format('woff');
  }
  @font-face {
  font-family: 'HelveticaNeue';
  font-style: bold;
  font-weight: bold;
  src: url('../static/HelveticaNeueBold.woff') format('woff');
  }
  .v-application {
    direction: rtl;
    font-family: 'HelveticaNeue', sans-serif !important;
  }
  .v-application--is-ltr .v-list-item__avatar:first-child {
    margin-left: 24px;
    margin-right: 0;
  }
  .v-list-item__title, .v-list-item__subtitle {
    overflow: initial;
  }
  .v-application--is-ltr .v-divider--inset:not(.v-divider--vertical) {
    margin-right: 72px;
    margin-left: 0;
  }
  .v-label {
    left: initial !important;
  }
  .v-text-field .v-label {
      -webkit-transform-origin: top right;
      transform-origin: top right;
  }
</style>