<template>
  <div id="ticket-table">
    <p v-if="this.$store.state.tickets.length < 1" class="ticket-table">No tickets</p>
     <v-card>
      <v-card-title>
        Tickets
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
        :items="this.$store.state.tickets"
        :sort-by="['createdAt']"
        :sort-desc="[true]"
        :search="search"
        dense
        group-by="state"
        group-desc
        show-group-by
        multi-sort
        class="elevation-1">
         <template v-slot:item.priority="{ item }">
           <v-chip x-small :color="getColor(item.priority)" dark>{{ priorities[item.priority] || 'None' }}</v-chip>
         </template>
         <template v-slot:item.createdAt="{ item }">
            {{ new Date(item.createdAt).toLocaleString() }}
         </template>
      </v-data-table>
    </v-card>

  </div>
</template>

<script>

  export default {
    name: 'ticket-table',
    data() {
      return {
        search: '',
        headers: [
          {text: 'Ticket ID', value: 'id', filterable: true, groupable: false},
          {text: 'Subject', value: 'subject', filterable: true, groupable: false},
          {text: 'Category', value: 'category', filterable: true},
          {text: 'Priority', value: 'priority', filterable: true},
          {text: 'Status', value: 'state', filterable: true},
          {text: 'Created', value: 'createdAt', filterable: true, groupable: false},
          {text: 'Details', value: 'text', filterable: true, sortable: false, groupable: false},
        ],
        priorities: [
          'Urgent',
          'High',
          'Medium',
          'Low',
          'None',
        ],
        prioritiesColors: [
          'purple',
          'red lighten-2',
          'orange lighten-3',
          'yellow lighten-3',
          'blue-grey lighten-5',
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
          console.log("ROUTE PATH: " + this.$route.path);
          const userOrAssignee = this.$store.state.user.hasAssigneeRole ? 'assignee' : 'user';
          const response = await fetch('http://localhost:8080/tickets/' + userOrAssignee + '?email=' + encodeURIComponent(this.$store.state.user.email));
          console.log("RESPONSE:", response)
          const resp = await response.json()
          console.log("DATA:", resp)
          this.$store.state.tickets = resp
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
      }

    }
  }
</script>

<style scoped>
  button {
    margin: 0 0.5rem 0 0;
  }
</style>
