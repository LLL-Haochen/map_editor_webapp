import PolygonMarker from '@/models/PolygonMarker';

export default {
  state: () => ({
    polygons: []
  }),
  mutations: {
    ADD_POLYGON(state, { vertices }) {
      state.polygons.push(new PolygonMarker(vertices));
    },
    ADD_VERTEX(state, { polygonIndex, x, y }) {
      if (state.polygons[polygonIndex]) {
        state.polygons[polygonIndex].addVertex(x, y);
      }
    },
    TOGGLE_SELECTION(state, polygonIndex) {
      if (state.polygons[polygonIndex]) {
        state.polygons[polygonIndex].toggleSelection();
      }
    },
    CLEAR_POLYGONS(state) {
      state.polygons = [];
    }
  },
  actions: {
    addPolygon({ commit }, vertices = []) {
      commit('ADD_POLYGON', { vertices });
    },
    addVertex({ commit, state }, { x, y }) {
      const polygonIndex = state.polygons.length - 1; // Assumes new vertices go to the most recently created polygon
      if (polygonIndex >= 0) {
        commit('ADD_VERTEX', { polygonIndex, x, y });
      }
    },
    toggleSelection({ commit }, polygonIndex) {
      commit('TOGGLE_SELECTION', polygonIndex);
    },
    clearPolygons({ commit }) {
      commit('CLEAR_POLYGONS');
    }
  },
  getters: {
    getPolygons: state => state.polygons
  }
};
