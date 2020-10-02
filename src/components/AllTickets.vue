<template>
  <div id="all-tickets-table">
      <!-- <p v-if="this.$store.state.alltickets.length < 1" class="all-tickets-table">No tickets</p> -->
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

      <v-data-table
        :headers="headers"
        :items="this.alltickets"
        item-key="text"
        :sort-by="['createdAt']"
        :sort-desc="[true]"
        :search="search"
        show-expand
        dense
        group-by="state"
        group-desc
        show-group-by
        multi-sort>
        class="elevation-1">
          <template v-slot:top>
                  <v-spacer></v-spacer>
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

         <template v-slot:item.priority="{ item }">
           <v-chip x-small :color="getColor(item.priority)" dark>{{ priorities[item.priority] || 'None' }}</v-chip>
         </template>
         <template v-slot:item.createdAt="{ item }">
            {{ new Date(item.createdAt).toLocaleString() }}
         </template>
         <template v-slot:expanded-item="{ headers, item }">
              <td :colspan="headers.length">
                  {{ item.text }}
              </td>
         </template>
         <template v-slot:item.actions="{ item }">
           <v-icon
             small
             class="mr-2"
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

  </div>
</template>

<script>

  export default {
    name: 'all-tickets-table',
    data() {
      return {
        alltickets: [],
        dialogDelete: false,
        editedIndex: -1,
        search: '',
        headers: [
          {text: 'Ticket ID', value: 'id', filterable: true, groupable: false},
          {text: 'User ID', value: 'user_id', filterable: true, groupable: false},
          {text: 'Assigned to', value: 'assignee_id', filterable: true, groupable: false},
          {text: 'Subject', value: 'subject', filterable: true, groupable: false},
          {text: 'Category', value: 'category', filterable: true},
          {text: 'Priority', value: 'priority', filterable: true},
          {text: 'Status', value: 'state', filterable: true},
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
        prioritiesColors: [
          'purple lighten-2',
          'red lighten-1',
          'blue-grey darken-1',
          'grey darken-3',
          'grey darken-3',
        ],
      }
    },
    mounted() {
      this.getTickets()
    },
    methods: {
      getColor(priority) {
        return this.prioritiesColors[priority] || 'white'

      },
      async getTickets() {
        try {
          console.log("ALLTICKETS ROUTE PATH: " + this.$route.path);
          const response = await fetch('http://localhost:8080/tickets/');
          console.log("RESPONSE:", response)
          const resp = await response.json()
          console.log("DATA:", resp)
          this.alltickets = resp
        } catch (error) {
          console.error(error)
        }
      },
      editMode(ticket) {
        this.cachedTicket = Object.assign({}, ticket)
        this.editing = ticket.id
      },
      cancelEdit(ticket) {
        Object.assign(ticket, this.cachedTicket)
        this.editing = null;
      },

      editTicket(ticket) {
        if (ticket.subject === '' || ticket.text === '') return
        this.$emit('edit:ticket', ticket.id, ticket)
        this.editing = null
      },

      async deleteTicket(id) {
        try {
          console.log("deleteTicket...");
          const response = await fetch(`http://localhost:8080/tickets/${id}`, {
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
        this.closeDelete()
      },
      closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedIndex = -1
        })
      },

    }
  }
</script>

<style scoped>
</style>
