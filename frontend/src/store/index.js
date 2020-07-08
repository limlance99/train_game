import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {
  rail: {
    buttonID: null,
    color: null,
  },
  actionHistory: [],
}

const mutations = {
  newRail: (state, data) => {
    // NOT YET FINAL, ONLY FOR TESTING
    state.rail = data;
  }
}

const actions = {
  SOCKET_newRail({commit}, obj) {
    console.log(obj);
    commit("newRail", obj);
  }
}

export default new Vuex.Store({
  state,
  mutations,
  actions
})
