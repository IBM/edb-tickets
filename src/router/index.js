import Vue from 'vue'
import VueRouter from 'vue-router'
import AllTickets from '../components/AllTickets.vue'
import HomePage from '../components/HomePage.vue'
import TicketForm from '../components/TicketForm.vue'
import TicketTable from '../components/TicketTable.vue'
import Analytics from '../components/Analytics.vue'

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
    name: "TicketForm",
    component: TicketForm,
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
    path: "/analytics",
    name: "Analytics",
    component: Analytics,
    props: true
  },]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
