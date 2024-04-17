import { createStore } from 'vuex';
import pointsModule from './points';
import linesModule from './lines';
import polygonsModule from './polygons';

const store = createStore({
  state() {
    return {
      // define your root state here if needed
    };
  },
  getters: {
    // root getters
  },
  mutations: {
    // root mutations
  },
  actions: {
    // root actions
  },
  modules: {
    points: pointsModule,
    lines: linesModule,
    polygons: polygonsModule
  }
});

export default store;
