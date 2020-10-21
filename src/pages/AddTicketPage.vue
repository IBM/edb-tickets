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
  <div id="addTicket">
    <v-form
      @submit.prevent="addTicket"
      id="addTicket"
    >

      <v-text-field
        v-model="subject"
        label="Ticket subject"
        outlined
        :rules="[ v => !!v || 'Subject is required' ]"
      ></v-text-field>

      <v-select
        v-model="category"
        :items="categories"
        :rules="[v => !!v || 'Category is required']"
        label="Category"
        outlined
      ></v-select>

      <v-select
        v-model="priority"
        :items="priorities"
        :rules="[v => !!v || 'Priority is required']"
        label="Priority"
        outlined
      ></v-select>

      <v-textarea
        v-model="text"
        label="Detailed description"
        :rules="[v => !!v || 'Description is required']"
        outlined
      />

      <v-btn :disabled="isDisabled" type="submit">submit ticket</v-btn>
    </v-form>
  </div>
</template>

<script>

  export default {
    name: 'ticket-form',
    data: function() {
      return {
        name: this.$store.state.user.username,
        email: this.$store.state.user.email,
        subject: '',
        text: '',
        category: '',
        priority: '',

        categories: [
          'Equipment',
          'Service Access',
          'Facilities',
          'Other',
        ],

        priorities: [
          'Urgent',
          'High',
          'Medium',
          'Low',
          'None',
        ],

      }
    },
    computed: {
      isDisabled() {
        return !(this.name && this.email && this.subject && this.text && this.category && (this.priorities.indexOf(this.priority) > -1))
      }
    },
    methods: {
      async addTicket() {
        try {
          const response = await fetch('/api/v1/tickets', {
            method: 'POST',
            body: JSON.stringify({
              name: this.$store.state.user.username,
              email: this.$store.state.user.email,
              subject: this.subject,
              text: this.text,
              category: this.categories.indexOf(this.category),
              priority: this.priorities.indexOf(this.priority),
            }),
            headers: { "Content-type": "application/json; charset=UTF-8" }
          });
          const r = await response.json();
          console.log("INSERTED:", r)
        } catch (error) {
          console.error(error)
        }
      },
    },
  }
</script>

<style scoped>
</style>
