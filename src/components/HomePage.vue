<template>
  <v-card
  >

     <v-parallax
      class="white--text align-end"
      src="../assets/docks.jpg"
      height="200"
    >
      <v-card-title>Welcome to the EDB Ticketing App</v-card-title>
    </v-parallax>

    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="headline mb-1">This app was built using the following components:</v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <v-list-item>
      <v-list-item-avatar tile color="blue">
        <v-icon dark>mdi-alarm></v-icon>
      </v-list-item-avatar>

      <v-list-item-content>
        <v-list-item-title>Databases for EDB</v-list-item-title>
        <v-list-item-subtitle>Provisioned on IBM Cloud (or Cloud Pak for Data)</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-list-item>
      <v-list-item-avatar tile color="blue">
        <v-icon dark>mdi-alarm></v-icon>
      </v-list-item-avatar>

      <v-list-item-content>
        <v-list-item-title>Node.js</v-list-item-title>
        <v-list-item-subtitle>JavaScript runtime environment</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-list-item>
      <v-list-item-avatar tile color="blue">
        <v-icon dark>mdi-alarm></v-icon>
      </v-list-item-avatar>

      <v-list-item-content>
        <v-list-item-title>Vue.js</v-list-item-title>
        <v-list-item-subtitle>JavaScript framework for building user interfaces</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-list-item>
      <v-list-item-avatar tile color="blue">
        <v-icon dark>mdi-alarm></v-icon>
      </v-list-item-avatar>

      <v-list-item-content>
        <v-list-item-title>Sequelize</v-list-item-title>
        <v-list-item-subtitle>Node.js ORM (Object-Relational Mapper)</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-list-item>
      <v-list-item-avatar tile color="blue">
        <v-icon dark>mdi-alarm></v-icon>
      </v-list-item-avatar>

      <v-list-item-content>
        <v-list-item-title>Vuetify</v-list-item-title>
        <v-list-item-subtitle>Material Design component for Vue.js</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
    <v-switch
            v-model="dark_theme"
            color="deep-orange darken-3"
            label="Use dark theme"
            @change="toggleDarkTheme()"
    ></v-switch>
  </v-card>
</template>
<script>
  export default {
    data: function() {
      return {
        dark_theme: this.$vuetify.theme.dark
      }
    },
    methods: {
      toggleDarkTheme() {
        this.$vuetify.theme.dark = this.dark_theme
      }
    }
  }
</script>
