import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    tickets: [],
    alltickets: [],
    user: {
      username: '',
      email: '',
      hasAssigneeRole: false,
    }
  },
  getters: {},
  mutations: {},
  actions: {}
});

