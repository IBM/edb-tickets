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

      <v-layout align-end justify-end>
          <v-btn style="margin-right:20px"
            rounded
            color="deep-orange darken-3"
            dark
            @click="addStaff()"
        >
            <v-icon left>
              mdi-plus
            </v-icon>
            Add
          </v-btn>
      </v-layout>

      <v-dialog v-model="dialogAdd" max-width="500px">
        <v-card>
          <v-card-title>
            <span class="headline">Add Support Staff Personnel</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col>
                  <v-text-field
                    v-model="name"
                    label="Name*"
                    :rules="userNameRules"
                    required
                  >
                  </v-text-field>
                </v-col>
                <v-col>
                  <v-text-field
                    v-model="email"
                    label="Email address*"
                    :rules="userEmailRules"
                    required
                  >
                  </v-text-field>
                </v-col>
              </v-row>

              <v-row>
                <v-select
                  v-model="department"
                  :items="deptNames"
                  label="Department*"
                  required
                ></v-select>
              </v-row>

              <v-row>
                <v-text-field
                  v-model="manager"
                  label="Manager Name*"
                  :rules="userNameRules"
                  required
                >
                </v-text-field>
              </v-row>

            </v-container>
            <small>* required field</small>
          </v-card-text>
          
          
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn 
              color="blue darken-1" 
              text 
              @click="close"
            >
              Cancel
            </v-btn>
            <v-btn 
              color="blue darken-1" 
              text 
              @click="save"
            >
              Save
            </v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-data-table
        :headers="headers"
        :items="this.allassignees"
        item-key="id"
        :sort-by="['id']"
        :sort-desc="[true]"
        :search="search"
        dense>
        class="elevation-1">
          <template v-slot:item.user_id="{ item }">
            {{ getUserName(item.user_id) }}
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
        dialogAdd: false,
        name: '',
        email: '',
        manager: '',
        department: '',
        deptNames: [
          "Maintenance",
          "Networking",
          "IT Support",
          "Site Mgmt"
        ],
        headers: [
          {text: 'Name', value: 'user_id', filterable: true, groupable: false},
          {text: 'Department', value: 'dept', filterable: true, groupable: false},
          {text: 'Manager', value: 'manager', filterable: true, groupable: false},
          {text: 'Created', value: 'createdAt', filterable: true, groupable: false},
        ],
        userNameRules: [
          u => !!u || 'User name is required',
          u => !u || u.length <= 20 || 'User name must be less than 20 characters',
        ],
        userEmailRules: [
          m => !!m || 'Email address is required',
          m => /.+@.+/.test(m) || 'Must be a valid email address like you@example.com',
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
          console.log("RESPONSE:", response);
          const resp = await response.json();
          console.log("DATA:", resp);
          this.allassignees = resp;
        } catch (error) {
          console.error(error);
        }
      },
      async getUsers() {
        try {
          console.log("ALLUSERS ROUTE PATH: " + this.$route.path);
          const response = await fetch('/api/v1/users/');
          console.log("RESPONSE:", response);
          const resp = await response.json();
          console.log("DATA:", resp);
          this.allusers = resp;
        } catch (error) {
          console.error(error);
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
      addStaff() {
        this.dialogAdd = true;
      },
      async save() {
        try {
          const response = await fetch('/api/v1/assignees', {
            method: 'POST',
            body: JSON.stringify({
              name: this.name,
              email: this.email,
              dept: this.department,
              manager: this.manager,
            }),
            headers: { "Content-type": "application/json; charset=UTF-8" }
          });
          const r = await response.json();
          console.log("Supprt Staff INSERTED:", r);
          this.dialogAdd = false;

          // reload data
          this.getAssignees();
          this.getUsers();
        } catch (error) {
          console.error(error);
        }
      },
      close () {
        this.dialogAdd = false;
      },
    }
  }
</script>

<style scoped>
  .v-data-table{
    margin-top: 50px;
  }
</style>
