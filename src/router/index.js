import Vue from 'vue'
import VueRouter from 'vue-router'
import AllTickets from '../pages/AllTicketsPage.vue'
import HomePage from '../pages/HomePage.vue'
import AddTicket from '../pages/AddTicketPage.vue'
import TicketTable from '../pages/TicketTable.vue'
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
    path: "/mytickets",
    name: "TicketTable",
    component: TicketTable,
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
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
