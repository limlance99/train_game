import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {
  newRail: {
    buttonID: null,
    color: null,
  },
  askingName: false,
  actionHistory: [
    "Lance moved here",
    "Lance moved here",
    "Lance moved here","Lance moved here",
    "Lance moved here",
    "Lance moved here",
  ],
  listOfClickedRails: {
    0: "#142323",
    1: "#243213",
    4: "#00c6d7",
  },
  chatMessages: [],
}

const mutations = {
  startUp: (state, data) => {
    console.log(data)
    state.askingName = true;
    // state.actionHistory = data.actionHistory;
    // state.listOfClickedRails = data.map; 
  },
  newRail: (state, data) => {
    console.log(data.rail);
    // state.listOfClickedRails.push(data.rail);

    state.rail = data.rail;
    state.actionHistory.push(data.newHistory);
  },
  moveTrain: (state, data) => {
    state.directions = data.directions;
    state.actionHistory.push(data.newHistory);
  },
  broadcastMessage: (state, message) => {
    state.chatMessages.push(message); 
  },
}

const actions = {
  SOCKET_startUp({commit}, obj) {
    commit("startUp", obj);
  },
  SOCKET_newRail({commit}, obj) {
    commit("newRail", obj);
  },
  SOCKET_moveTrain({commit}, obj) {
    commit("moveTrain", obj);
  },
  SOCKET_broadcastMessage({commit}, message) {
    commit("broadcastMessage", message);
  },
  SOCKET_sendUser({commit}, message) {
    commit("sendUser", message);
    state.askingName = false;
  },
}

export default new Vuex.Store({
  state,
  mutations,
  actions
})
