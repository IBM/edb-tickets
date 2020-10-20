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
    </v-card>

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
        <v-card>

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
              <template v-slot:top>
                <v-spacer></v-spacer>

                <v-dialog
                  :key="componentKey"
                  v-model="dialogEdit"
                  max-width="600px"
                  persistent
                >
                  <edit-ticket
                    :editTicket="editedItem"
                    :allUsers="allUsers"
                    :allAssignees="allAssignees"
                    v-on:cancel="cancel"
                    v-on:save="save"
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

              <template v-slot:item.user_id="{ item }">
                {{ getUserName(item.user_id) }}
              </template>

              <template v-slot:item.assignee_id="{ item }">
                {{ getAssigneeName(item.assignee_id) }}
              </template>

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
                mdi-pencil
                </v-icon>
                <v-icon
                  small
                  @click="deleteItem(item)"
                >
                  mdi-delete
                </v-icon>
            </template>
          </v-data-table>
        </v-card>
      </v-tab-item>

      <v-tab-item>
        <v-card>
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
              <template v-slot:top>
                <v-spacer></v-spacer>

                <v-dialog
                  :key="componentKey"
                  v-model="dialogEdit"
                  max-width="600px"
                  persistent
                >
                  <edit-ticket
                    :editTicket="editedItem"
                    :allUsers="allUsers"
                    :allAssignees="allAssignees"
                    v-on:cancel="cancel"
                    v-on:save="save"
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

              <template v-slot:item.user_id="{ item }">
                {{ getUserName(item.user_id) }}
              </template>

              <template v-slot:item.assignee_id="{ item }">
                {{ getAssigneeName(item.assignee_id) }}
              </template>

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
                mdi-pencil
                </v-icon>
                <v-icon
                  small
                  @click="deleteItem(item)"
                >
                  mdi-delete
                </v-icon>
            </template>
          </v-data-table>
        </v-card>
      </v-tab-item>

    </v-tabs>
  </div>
</template>

<script>
  import EditTicketComponent from '../components/ticket/EditDialog.vue'
  export default {
    name: 'all-tickets-table',
    components: {
      'editTicket': EditTicketComponent
    },
    data() {
      return {
        tab: null,
        tabItems: [ 'Open', 'Closed'],
        alltickets: [],
        allUsers: [],
        allAssignees: [],
        userName: '',
        dialogEdit: false,
        dialogDelete: false,
        editedIndex: -1,
        editedItem: {},
        cachedTicket: {},
        componentKey: 0,
        search: '',
        headers: [
          {text: 'Ticket ID', value: 'id', filterable: true, groupable: false},
          {text: 'Created by', value: 'user_id', filterable: true, groupable: false},
          {text: 'Assigned to', value: 'assignee_id', filterable: true, groupable: false},
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
      this.getTickets()
      this.getUsers()
      this.getAssignees()
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
      async getUsers() {
        try {
          console.log("ALLUSERS ROUTE PATH: " + this.$route.path);
          const response = await fetch('/api/v1/users/');
          console.log("RESPONSE:", response)
          const resp = await response.json()
          console.log("DATA:", resp)
          this.allUsers = resp
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
      getUserName(id) {
        let name = "undefined";
        this.allUsers.forEach((user) => {
          if (user.id === id) {
            name = user.name;
          }
        });
        return name;
      },
      getAssigneeName(id) {
        let name = "undefined";
        this.allAssignees.forEach((assignee) => {
          if (assignee.id === id) {
            this.allUsers.forEach((user) => {
              if (user.id === assignee.user_id) {
                name = user.name;
              }
            });
          }
        });
        return name;
      },
      editMode(ticket) {
        this.cachedTicket = Object.assign({}, ticket);
      },
      cancelEdit(ticket) {
        Object.assign(ticket, this.cachedTicket);
        this.alltickets.splice(this.editedIndex, 1, this.cachedTicket);
        this.dialogEdit = false;
        this.forceRerender();
      },

      editTicket(ticket) {
        this.editMode(ticket);
        this.editedIndex = this.alltickets.indexOf(ticket);
        this.editedItem = ticket;
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
      save: function(updatedTicket) {
        console.log('Updated ticket: ' + JSON.stringify(updatedTicket, null, 2));
        this.updateTicket(updatedTicket);
        this.dialogEdit = false;
      },
      cancel (ticket) {
        this.cancelEdit(ticket)
      },
      open () {
        console.log("open()");
      },
      close () {
        console.log('Dialog closed')
        this.dialogEdit = false;
        console.log("close()");
      },
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
      async updateTicket(updatedTicket) {
        try {
          const response = await fetch(`/api/v1/tickets/${updatedTicket.id}`, {
            method: 'PUT',
            body: JSON.stringify(updatedTicket),
            headers: { "Content-type": "application/json; charset=UTF-8" }
          })
          const data = await response.json()
          let ticket = data[0];
          ticket.user_id = ticket.user_id || ticket.UserId;
          ticket.assignee_id = ticket.assignee_id || ticket.AssigneeId;
          this.alltickets.splice(this.editedIndex, 1, ticket);
        } catch (error) {
          console.error(error)
        }
      },
    }
  }
</script>

<style scoped>
</style>
