<template>
  <v-card>
    <v-card-title>
      <span class="headline">Edit Ticket</span>
    </v-card-title>

    <v-card-text>
      <v-container>
        <v-row>
          <v-text-field
            v-model="ticket.subject"
            label="Subject"
          ></v-text-field>
        </v-row>
        <v-row>
          <v-text-field
            v-model="ticket.text"
            label="Details"
          ></v-text-field>
        </v-row>

        <v-row>
          <v-select
            v-model="selectedName"
            :items="userNames"
            label="Assigned to"
            @change='userSelected'
          ></v-select>
        </v-row>

        <v-row>
          <v-select
            v-model="ticket.state"
            :items="states"
            label="Status"
          ></v-select>
        </v-row>

      </v-container>
    </v-card-text>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
        color="blue darken-1"
        text
        @click="$emit('cancel', ticket)"
      >
        Cancel
      </v-btn>
      <v-btn
        color="blue darken-1"
        text
        @click="$emit('save', ticket)"
      >
        Save
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
  export default {
    name: 'edit-ticket-dialog',
    props: {
      editTicket: {},
      allUsers: { type: Array, required: true },
      allAssignees: { type: Array, required: true }
    },
    data() {
      return {
        ticket: this.editTicket,
        cachedTicket: {},
        dialogEdit: false,
        users: this.allUsers,
        assignees: this.allAssignees,
        userNames: [],
        states: [ 'open', 'closed' ],
        selectedName: ''
      }
    },
    mounted() {
      this.getUserNames()
    },
    methods: {
      getUserNames() {
        this.allAssignees.forEach((assignee) => {
          let user = this.allUsers.find(u => u.id === assignee.id);
          this.userNames.push(user.name);
          if (user.id === this.editTicket.assignee_id) {
            this.selectedName = user.name;
          }
        });
      },
      userSelected() {
        this.allUsers.forEach((user) => {
          if (this.selectedName === user.name) {
            this.ticket.assignee_id = user.id;
          }
        });
      },
    }
  }
</script>

<style scoped>
</style>
