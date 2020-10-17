<template>
  <div id="support-staff-table">
    <v-card>
      <v-card-title>
        Support Staff
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>

      <v-data-table
        :headers="headers"
        :items="this.allassignees"
        item-key="id"
        :sort-by="['id']"
        :sort-desc="[true]"
        :search="search"
        dense>
        class="elevation-1">
          <template v-slot:item.id="{ item }">
            {{ getUserName(item.id) }}
          </template>
          <template v-slot:item.createdAt="{ item }">
            {{ new Date(item.createdAt).toLocaleDateString() }}
          </template>
      </v-data-table>
    </v-card>

  </div>
</template>

<script>

  export default {
    name: 'all-assignees-table',
    data() {
      return {
        allassignees: [],
        allusers: [],
        search: '',
        headers: [
          {text: 'User ID', value: 'id', filterable: true, groupable: false},
          {text: 'Department', value: 'dept', filterable: true, groupable: false},
          {text: 'Manager', value: 'manager', filterable: true, groupable: false},
          {text: 'Created', value: 'createdAt', filterable: true, groupable: false},
        ],
      }
    },
    mounted() {
      this.getAssignees()
      this.getUsers()
    },
    methods: {
      async getAssignees() {
        try {
          console.log("ALLASSIGNEES ROUTE PATH: " + this.$route.path);
          const response = await fetch('/api/v1/assignees/');
          console.log("RESPONSE:", response)
          const resp = await response.json()
          console.log("DATA:", resp)
          this.allassignees = resp
        } catch (error) {
          console.error(error)
        }
      },
      async getUsers() {
        try {
          console.log("ALLUSERS ROUTE PATH: " + this.$route.path);
          const response = await fetch('/api/v1/users/');
          console.log("RESPONSE:", response)
          const resp = await response.json()
          console.log("DATA:", resp)
          this.allusers = resp
        } catch (error) {
          console.error(error)
        }
      },
      getUserName(id) {
        let name = "undefined";
        this.allusers.forEach((user) => {
          if (user.id === id) {
            name = user.name;
          }
        });
        return name;
      },
    }
  }
</script>

<style scoped>
  .v-data-table{
    margin-top: 50px;
  }
</style>
