import LineMarker from '@/models/LineMarker';

export default {
  state: () => ({
    lines: []
  }),
  mutations: {
    ADD_LINE(state, line) {
      state.lines.push(line);
    },
    TOGGLE_SELECTION(state, index) {
      if (state.lines[index]) {
        state.lines[index].toggleSelection();
      }
    },
    CLEAR_LINES(state) {
      state.lines = [];
    }
  },
  actions: {
    addLine({ commit }, { startX, startY, endX, endY }) {
      const line = new LineMarker(startX, startY, endX, endY);
      commit('ADD_LINE', line);
    },
    toggleSelection({ commit }, index) {
      commit('TOGGLE_SELECTION', index);
    },
    clearLines({ commit }) {
      commit('CLEAR_LINES');
    }
  },
  getters: {
    getLines: state => state.lines
  }
};
