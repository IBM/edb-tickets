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
  <div id="app">
    <v-app>
      <v-app-bar
        dark
        color="deep-orange darken-3"
        app
        clipped-left
      >
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <v-toolbar-title>EDB Tickets</v-toolbar-title>
        <v-spacer></v-spacer>

        <v-dialog
          v-model="dialog"
          max-width="600px"
          persistent
        >

          <template v-slot:activator="{ on, attrs }">
            <v-btn
              elevation="10"
              icon
              v-bind="attrs"
              v-on="on"
            >
              <v-icon v-if="isMenuDisabled">mdi-account</v-icon>
              <v-avatar v-else>{{ userInitials }}</v-avatar>
            </v-btn>
          </template>

          <v-card>
            <v-card-title>
              <span class="v-card__title">
                Sign in
              </span>
            </v-card-title>
            <v-card-text>
              <v-container dense>
                <v-row dense>
                  <v-col>
                    <v-text-field
                      v-model="userName"
                      label="User name*"
                      :rules="userNameRules"
                      required
                    >
                    </v-text-field>
                  </v-col>
                  <v-col>
                    <v-text-field
                      v-model="userEmail"
                      label="Email address*"
                      :rules="userEmailRules"
                      required
                    >
                    </v-text-field>
                  </v-col>
                </v-row>
                <v-row dense>
                  <v-col>
                    <div style="margin-top: 40px; margin-bottom: 40px; font-weight: 800">
                      NOTE: Sign-in is required to create new tickets. Data will be saved to the EDB Cloud service, so you may not want to use your real name and email address.
                    </div>
                  </v-col>
                </v-row>
              </v-container>
              <small>* required field</small>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="blue darken-1"
                text
                @click="resetUser"
              >
                Close
              </v-btn>
              <v-btn
                :disabled="isDisabled"
                color="blue darken-1"
                text
                @click="setUser"
              >
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

      </v-app-bar>
      <v-main>
        <v-container fluid>
          <v-row class="fill-height">
            <v-col>
              <transition name="fade">
                <router-view></router-view>
              </transition>
            </v-col>
          </v-row>
        </v-container>
      </v-main>
      <v-navigation-drawer
        v-model="drawer"
        app
        absolute
        temporary
      >
        <v-list dense color="deep-orange darken-3" dark>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>
                EDB Tickets
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <v-list shaped>
          <v-list-item
            v-for="item in alwaysOnItems" :key="item.title" link :to="item.href"
          >
            <v-list-item-icon>
              <v-icon color="deep-orange darken-3">{{ item.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item
            v-for="item in items" :key="item.title" link :to="item.href"
            :disabled="isMenuDisabled"
          >
            <v-list-item-icon>
              <v-icon
                v-if="isMenuDisabled"
                color="grey"
              >
                {{ item.icon }}
              </v-icon>

              <v-icon
                v-else
                color="deep-orange darken-3"
              >
                {{ item.icon }}
              </v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title
              >
                {{ item.title }}
              </v-list-item-title>
            </v-list-item-content>

          </v-list-item>
        </v-list>
      </v-navigation-drawer>
    </v-app>
  </div>

</template>

<script>
  export default {
    name: 'app',
    props: {
      source: String,
      user: String
    },

    data: () => ({
      drawer: null,
      hasAssigneeRole: false,
      userInitials: '',
      userName: '',
      userEmail: '',
      userNameRules: [
        u => !!u || 'User name is required',
        u => !u || u.length <= 20 || 'User name must be less than 20 characters',
      ],
      userEmailRules: [
        m => !!m || 'Email address is required',
        m => /.+@.+/.test(m) || 'Must be a valid email address like you@example.com',
      ],
      alwaysOnItems: [
        { title:"Home", href:"/", icon:"mdi-home-outline" },
        { title:"All Tickets", href:"/alltickets", icon:"mdi-card-search-outline" },
        { title:"Support Staff", href:"/assignees", icon:"mdi-account-multiple" },
      ],
      items: [
        { title:"New Ticket", href:"/addticket", icon:"mdi-note-plus-outline" },
        // { title:"My Tickets", href:"/mytickets", icon:"mdi-ticket-account" },
      ],
      dialog: false,
    }),

    computed: {
      isDisabled() {
        return !(this.userName && this.userName.length <= 20 && this.userEmail && /.+@.+/.test(this.userEmail))
      },
      isMenuDisabled() {
        return !(this.$store.state.user.username && this.$store.state.user.email)
      },
    },

    methods: {
      async setUser() {
        this.userInitials = this.userName.split(" ").map((n)=>n[0]).join("");
        this.$store.state.user = {
          ...this.$store.state.user,
          username: this.userName,
          email: this.userEmail,
        };
        this.dialog = false
      },
      async resetUser() {
        this.userName = this.$store.state.user.username,
        this.userEmail = this.$store.state.user.email,
        this.dialog = false
      },
    }
  }
</script>

<style scoped>
</style>
