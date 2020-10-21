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
            :items="assigneeNames"
            label="Assigned to"
            @change='assigneeSelected'
          ></v-select>
        </v-row>

        <v-row>
          <v-select
            v-model="ticket.priority"
            :items="priorities"
            label="Priority"
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
        assigneeNames: [],
        states: [ 'open', 'closed' ],
        priorities: [
          { text: 'Urgent', value: 0 },
          { text: 'High',   value: 1 },
          { text: 'Medium', value: 2 },
          { text: 'Low',    value: 3 },
          { text: 'None',   value: 4 },
        ],
        selectedName: ''
      }
    },
    mounted() {
      this.getUserNames()
      this.getAssigneeName()
    },
    methods: {
      // NOTE: ticket table row contains assignee_id
      //       asssignee table row with that assignee_id contains user_id
      //       user table row with that id contains user name
      getUserNames() {
        this.allAssignees.forEach((assignee) => {
          // assignee.user_id points to id in user file
          let user = this.allUsers.find(u => u.id === assignee.user_id);
          this.assigneeNames.push(user.name);
        });
      },
      getAssigneeName() {
        this.allAssignees.forEach((assignee) => {
          if (assignee.id === this.ticket.assignee_id) {
            this.allUsers.forEach((user) => {
              if (user.id === assignee.user_id) {
                this.selectedName = user.name;
              }
            });
          }
        });
      },
      assigneeSelected() {
        this.allUsers.forEach((user) => {
          if (this.selectedName === user.name) {
            this.allAssignees.forEach((assignee) => {
              if (assignee.user_id === user.id) {
                this.ticket.assignee_id = assignee.id;
              }
            });
          }
        });
      },
    }
  }
</script>

<style scoped>
</style>
