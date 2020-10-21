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
      ref="form"
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
      ></v-textarea>

      <v-alert v-model="errorAlert" type="error" @input="this.closeAlert"
               transition="scale-transition" outlined dismissible dense text prominent>
          <v-row dense>
              <v-col class="text-lg-caption">
                  {{ errorTitle }}
              </v-col>
          </v-row>
          <v-row dense>
              <v-col class="text-sm-caption">
                  {{ errorSubTitle }}
              </v-col>
          </v-row>
      </v-alert>
      <v-alert v-model="successAlert" type="success" @input="this.doReset"
               transition="slide-x-reverse-transition" outlined dismissible dense text>
          Success
      </v-alert>

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

        successAlert: false,
        errorAlert: false,
        errorTitle: '',
        errorSubTitle: '',

      }
    },
    computed: {
      isDisabled() {
        return !(this.name && this.email && this.subject && this.text && this.category && (this.priorities.indexOf(this.priority) > -1))
      }
    },
    methods: {
      closeAlert() {
        this.successAlert = false;
        this.errorAlert = false;
        this.errorTitle = '';
        this.errorSubTitle = '';
      },
      doReset() {
        this.closeAlert();
        this.$refs.form.reset()
      },
      async addTicket() {
        this.closeAlert();
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
          if (response.status >= 200 && response.status < 300) {
            this.successAlert = true;
          } else {
            this.errorAlert = true;
            this.errorTitle = response.statusText;
            this.errorSubTitle = `HTTP Status Code: ${response.status}`;
          }
        } catch (error) {
          console.error(error);
          this.errorAlert = true;
          this.errorTitle = 'ERROR';
          this.errorSubTitle = error;
        }
      },
    },
  }
</script>

<style scoped>
</style>
