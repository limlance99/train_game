import Vue from 'vue';
Vue.config.devtools = true;
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {
  newRail: {
    buttonID: null,
    color: null,
  },
  askingName: false,
  actionHistory: [],
  listOfClickedRails: {},
  chatMessages: [],
  directions: [],
  userColor: "",
  mapHeight: 3,
  mapWidth: 3,
  errorMessage: {},
}

const mutations = {
  startUp: (state, data) => {
    console.log(data)
    state.askingName = true;
    state.mapHeight = data.height;
    state.mapWidth = data.width;
    state.listOfClickedRails = data.map; 
    state.actionHistory = data.actionHistory;
    state.userColor = data.color;
  },
  newRail: (state, rail) => {
    Vue.set(state.listOfClickedRails, rail.id, rail.color);
    console.log(state.listOfClickedRails);
  },
  newActionHistory: (state, data) => {
    console.log(data);
    if (data.newHistory.error) {
      state.errorMessage = data.newHistory;
    } else {
      state.actionHistory.push(data.newHistory);
    }
  },
  moveTrain: (state, data) => {
    state.directions = data.directions;
  },
  newChatMessage: (state, message) => {
    state.chatMessages.push(message); 
  },
  userAccept: (state) => state.askingName = false,
  newMap: (state, data) => {
    state.mapWidth = data.width;
    state.mapHeight = data.height;
    state.listOfClickedRails = data.map;
    console.log(data);
  }
}

const actions = {
  SOCKET_startUp({commit}, obj) {
    commit("startUp", obj);
  },
  SOCKET_newRail({commit}, obj) {
    console.log("I HAVE A NEW RAIL");
    commit("newRail", obj.rail);
    commit("newActionHistory", obj);
  },
  SOCKET_moveTrain({commit}, obj) {
    commit("moveTrain", obj);
    commit("newActionHistory", obj);
  },
  SOCKET_broadcastMessage({commit}, message) {
    commit("newChatMessage", message);
  },
  SOCKET_userJoined({commit}, message) {
    commit("newChatMessage", message);
  },
  SOCKET_newMap({commit}, obj) {
    commit("newMap", obj);
  },
  SOCKET_userAccept({commit}) {
    commit("userAccept");
  }
}

export default new Vuex.Store({
  state,
  mutations,
  actions
})
