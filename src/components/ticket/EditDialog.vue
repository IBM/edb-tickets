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
            v-model="ticketCopy.subject"
            label="Subject"
          ></v-text-field>
        </v-row>
        <v-row>
          <v-text-field
            v-model="ticketCopy.text"
            label="Details"
          ></v-text-field>
        </v-row>

        <v-row>
          <v-select
            v-model="ticketCopy.Assignee"
            :items="allAssignees"
            item-text="User.name"
            label="Assigned to"
            return-object
            @change='assigneeSelected'
          ></v-select>
        </v-row>

        <v-row>
          <v-select
            v-model="ticketCopy.priority"
            :items="priorities"
            label="Priority"
          ></v-select>
        </v-row>

        <v-row>
          <v-select
            v-model="ticketCopy.state"
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
        @click="$emit('cancel')"
      >
        Cancel
      </v-btn>
      <v-btn
        color="blue darken-1"
        text
        @click="$emit('save', ticketCopy)"
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
      ticket: {},
      allAssignees: { type: Array, required: true }
    },
    data() {
      return {
        dialogEdit: false,
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
    computed: {
      ticketCopy: function () {
        return { ...this.ticket }
      }
    },
    created() {
      console.log("EditDialog created")
    },
    mounted() {
      console.log("EditDialog mounted")
    },
    updated() {
      console.log("EditDialog updated")
    },
    destroyed() {
      console.log("EditDialog destroyed")
    },
    methods: {
      // NOTE: ticket table row contains assignee_id
      //       assignee table row with that assignee_id contains user_id
      //       user table row with that id contains user name
      assigneeSelected() {
        this.ticketCopy.assignee_id = this.ticketCopy.Assignee.id;
      },
    }
  }
</script>
