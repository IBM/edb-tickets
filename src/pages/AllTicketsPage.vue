/**
 * Copyright 2020 IBM Corp. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the 'License'); you may not
 * use this file except in compliance with the License. You may obtain a copy of
 * the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */

<template>
  <div id="all-tickets-table">
    <v-card>
      <v-card-title>
        All Tickets
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>

    <template>
      <v-spacer></v-spacer>

      <v-dialog
              :key="componentKey"
              v-model="dialogEdit"
              max-width="600px"
      >
        <edit-ticket
                :ticket="alltickets[editedIndex]"
                :allAssignees="allAssignees"
                v-on:cancel="() => { dialogEdit = false; }"
                v-on:save="updateTicket"
        >
        </edit-ticket>

      </v-dialog>

      <v-dialog v-model="dialogDelete" max-width="500px">
        <v-card>
          <v-card-title class="headline">Are you sure you want to delete this item?</v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
            <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </template>

    <v-tabs
      color="deep-orange darken-3"
      left
    >
      <v-tab>
        <v-icon left>
          mdi-alert-decagram-outline
        </v-icon>
        Open
      </v-tab>

      <v-tab>
        <v-icon left>
          mdi-check-decagram
        </v-icon>
        Closed
      </v-tab>

      <v-tab-item>

          <v-data-table
            :headers="headers"
            :items="this.alltickets.filter((i) => { return i.state !== 'closed'; })"
            item-key="id"
            :sort-by="['createdAt']"
            :sort-desc="[true]"
            :search="search"
            show-expand
            dense>
            class="elevation-1">
              <template v-slot:item.priority="{ item }">
                <v-chip x-small :color="getColor(item.priority)" dark>{{ priorities[item.priority] || 'None' }}</v-chip>
              </template>
              <template v-slot:item.category="{ item }">
                {{ categories[item.category] }}
              </template>
              <template v-slot:item.createdAt="{ item }">
                {{ new Date(item.createdAt).toLocaleDateString() }}
              </template>
              <template v-slot:expanded-item="{ headers, item }">
                <td :colspan="headers.length">
                  {{ item.text }}
                </td>
              </template>
              <template v-slot:item.actions="{ item }">
                <v-icon
                  small
                  @click="editTicket(item)"
                >
                mdi-pencil-outline
                </v-icon>
                <v-icon
                  small
                  @click="deleteItem(item)"
                >
                  mdi-trash-can-outline
                </v-icon>
            </template>
          </v-data-table>
      </v-tab-item>

      <v-tab-item>
          <v-data-table
            :headers="headers"
            :items="this.alltickets.filter((i) => { return i.state === 'closed'; })"
            item-key="id"
            :sort-by="['createdAt']"
            :sort-desc="[true]"
            :search="search"
            show-expand
            dense>
            class="elevation-1">
              <template v-slot:item.priority="{ item }">
                <v-chip x-small :color="getColor(item.priority)" dark>{{ priorities[item.priority] || 'None' }}</v-chip>
              </template>
              <template v-slot:item.category="{ item }">
                {{ categories[item.category] }}
              </template>
              <template v-slot:item.createdAt="{ item }">
                {{ new Date(item.createdAt).toLocaleDateString() }}
              </template>
              <template v-slot:expanded-item="{ headers, item }">
                <td :colspan="headers.length">
                  {{ item.text }}
                </td>
              </template>
              <template v-slot:item.actions="{ item }">
                <v-icon
                  small
                  @click="editTicket(item)"
                >
                mdi-pencil-outline
                </v-icon>
                <v-icon
                  small
                  @click="deleteItem(item)"
                >
                  mdi-trash-can-outline
                </v-icon>
            </template>
          </v-data-table>
      </v-tab-item>

    </v-tabs>

      <v-snackbar v-model="successSnackBar" color="success"
                  transition="slide-x-reverse-transition" dense
                  outlined text>
        <v-row dense>
          <v-col cols="2">
            <v-icon color="success">mdi-check-circle</v-icon>
          </v-col>
          <v-col class="text-lg-caption">
            Success
          </v-col>
        </v-row>
      </v-snackbar>

    </v-card>
  </div>
</template>

<script>
  import EditDialog from '../components/ticket/EditDialog.vue'

  export default {
    name: 'all-tickets-table',
    components: {
      'edit-ticket': EditDialog
    },
    data() {
      return {
        tab: null,
        tabItems: [ 'Open', 'Closed'],
        alltickets: [],
        allAssignees: [],
        dialogEdit: false,
        dialogDelete: false,
        successSnackBar: false,
        editedIndex: -1,
        componentKey: 0,
        search: '',
        headers: [
          {text: 'Ticket ID', value: 'id', filterable: true, groupable: false},
          {text: 'Created by', value: 'User.name', filterable: true, groupable: false},
          {text: 'Assigned to', value: 'Assignee.User.name', filterable: true, groupable: false},
          {text: 'Subject', value: 'subject', filterable: true, groupable: false},
          {text: 'Category', value: 'category', filterable: true, groupable: false},
          {text: 'Priority', value: 'priority', filterable: true, groupable: false},
          {text: 'Created', value: 'createdAt', filterable: true, groupable: false},
          {text: 'Actions', value: 'actions', filterable: false, groupable: false},
        ],
        priorities: [
          'Urgent',
          'High',
          'Medium',
          'Low',
          'None',
        ],
        categories: [
          'Equipment',
          'Service Access',
          'Facilities',
          'Other',
        ],
        prioritiesColors: [
          'deep-orange accent-4',
          'deep-orange accent-2',
          'deep-orange accent-1',
          'deep-orange lighten-4',
          'deep-orange lighten-5',
        ],
      }
    },
    mounted() {
      this.getTickets();
      this.getAssignees();
    },
    methods: {
      getColor(priority) {
        return this.prioritiesColors[priority] || 'white'
      },
      forceRerender() {
        // force Vue component to be destroyed
        this.componentKey += 1;
      },
      async getTickets() {
        try {
          console.log("ALLTICKETS ROUTE PATH: " + this.$route.path);
          const response = await fetch('/api/v1/tickets/');
          console.log("RESPONSE:", response)
          const resp = await response.json()
          console.log("DATA:", resp)
          this.alltickets = resp
        } catch (error) {
          console.error(error)
        }
      },
      async getAssignees() {
        try {
          console.log("ALLASSIGNEES ROUTE PATH: " + this.$route.path);
          const response = await fetch('/api/v1/assignees/');
          console.log("RESPONSE:", response)
          const resp = await response.json()
          console.log("DATA:", resp)
          this.allAssignees = resp
        } catch (error) {
          console.error(error)
        }
      },
      editTicket(ticket) {
        this.editedIndex = this.alltickets.indexOf(ticket);
        this.dialogEdit = true;
        this.forceRerender();
      },
      async deleteTicket(id) {
        try {
          console.log("deleteTicket...");
          const response = await fetch(`/api/v1/tickets/${id}`, {
            method: 'DELETE'
          })
          console.log("RESPONSE:", response)
          const data = await response.json()
          console.log("DATA:", data)
        } catch (error) {
          console.error(error)
        }
      },
      deleteItem (item) {
        this.editedIndex = this.alltickets.indexOf(item)
        this.dialogDelete = true
      },
      deleteItemConfirm () {
        let ticket = this.alltickets[this.editedIndex];
        this.deleteTicket(ticket.id);
        this.alltickets.splice(this.editedIndex, 1);
        this.closeDelete();
      },
      closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedIndex = -1;
        })
      },
      /* Assign me feature is currently not used.
      async assignMe () {
        let response = await this.addAssignee();
        const r = await response.json();
        this.editedItem.assignee_id = r[0].id;
      },
      async addAssignee() {
          return fetch('/api/v1/tickets/assignee', {
            method: 'POST',
            body: JSON.stringify({
              name: this.$store.state.user.username,
              email: this.$store.state.user.email,
            }),
            headers: { "Content-type": "application/json; charset=UTF-8" }
          });
      },
      */
      updateTicket(updatedTicket) {
        this.alltickets.splice(this.editedIndex, 1, updatedTicket);
        this.dialogEdit = false;
        this.successSnackBar = true;
      },
    }
  }
</script>

<style scoped>
</style>
