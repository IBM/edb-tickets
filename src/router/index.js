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

import Vue from 'vue'
import VueRouter from 'vue-router'
import AllTickets from '../pages/AllTicketsPage.vue'
import HomePage from '../pages/HomePage.vue'
import AddTicket from '../pages/AddTicketPage.vue'
import Assignees from '../pages/SupportStaffPage.vue'

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "HomePage",
    component: HomePage,
    props: true
  },
  {
    path: "/addticket",
    name: "AddTicket",
    component: AddTicket,
    props: true
  },
  {
    path: "/alltickets",
    name: "AllTickets",
    component: AllTickets,
    props: true
  },
  {
    path: "/assignees",
    name: "Assignees",
    component: Assignees,
    props: true
  }
];

const router = new VueRouter({
  mode: 'history',
  routes
});

export default router
