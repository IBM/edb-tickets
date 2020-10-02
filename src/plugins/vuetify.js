import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

const opts = {
  theme: {
    dark: true
  },
  options: {
    customProperties: true
  },
  icons: {
    iconfont: "mdi"
  }
};

export default new Vuetify(opts);
