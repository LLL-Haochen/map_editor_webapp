import PointMarker from '@/models/PointMarker';

export default {
  state: {
    points: []
  },
  mutations: {
    ADD_POINT(state, point) {
      state.points.push(point);
    },
    TOGGLE_SELECTION(state, index) {
      state.points[index].toggleSelection();
    },
    CLEAR_POINTS(state) {
      state.points = [];
    }
  },
  actions: {
    addPoint({ commit }, { x, y }) {
      commit('ADD_POINT', new PointMarker(x, y));
    },
    toggleSelection({ commit }, index) {
      commit('TOGGLE_SELECTION', index);
    },
    clearPoints({ commit }) {
      commit('CLEAR_POINTS');
    }
  },
  getters: {
    points: state => state.points
  }
};
