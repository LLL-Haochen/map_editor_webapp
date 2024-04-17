// src/store/modules/polygons.js
import PolygonMarker from '@/models/PolygonMarker';

export default {
  state: () => ({
    polygons: []
  }),
  mutations: {
    ADD_POLYGON(state, polygon) {
      state.polygons.push(polygon);
    },
    ADD_VERTEX(state, { index, x, y }) {
      if (state.polygons[index]) {
        state.polygons[index].addVertex(x, y);
      }
    },
    TOGGLE_SELECTION(state, index) {
      if (state.polygons[index]) {
        state.polygons[index].toggleSelection();
      }
    },
    CLEAR_POLYGONS(state) {
      state.polygons = [];
    }
  },
  actions: {
    createPolygon({ commit }) {
      const polygon = new PolygonMarker();
      commit('ADD_POLYGON', polygon);
      return state.polygons.length - 1;  // return the index of the new polygon
    },
    addVertex({ commit }, payload) {
      commit('ADD_VERTEX', payload);
    },
    toggleSelection({ commit }, index) {
      commit('TOGGLE_SELECTION', index);
    },
    clearPolygons({ commit }) {
      commit('CLEAR_POLYGONS');
    }
  },
  getters: {
    polygons: state => state.polygons
  }
};
