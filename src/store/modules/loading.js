const state = {
  isLoading: false
};

const mutations = {
  setIsLoading: (state, payload) => {
    state.isLoading = payload;
  }
};

const actions = {};

const getters = {
  getIsLoading: state => state.isLoading
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
