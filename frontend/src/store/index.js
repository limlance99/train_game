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
  // directions: ["e","e", "e", "s", "s", "s"],
}

const mutations = {
  startUp: (state, data) => {
    console.log(data)
    state.askingName = true;
    state.actionHistory = data.actionHistory;
    state.listOfClickedRails = data.map; 
    state.userColor = data.color;
    state.mapHeight = data.height;
    state.mapWidth = data.width;
  },
  newRail: (state, rail) => {
    // console.log(data.rail);
    // state.listOfClickedRails.push(data.rail);

    // let rail = data.rail;
    Vue.set(state.listOfClickedRails, rail.id, rail.color);
    // state.listOfClickedRails[rail.id] = rail.color;
    console.log(state.listOfClickedRails);
    // state.actionHistory.push(data.newHistory);
  },
  newActionHistory: (state, message) => {
    state.actionHistory.push(message);
  },
  moveTrain: (state, directions) => {
    state.directions = directions;
  },
  newChatMessage: (state, message) => {
    state.chatMessages.push(message); 
  },
  sendUser: (state, data) => {
    // console.log(data);
    state.chatMessages.push(data);
    state.askingName = false;
  }
}

const actions = {
  SOCKET_startUp({commit}, obj) {
    commit("startUp", obj);
  },
  SOCKET_newRail({commit}, obj) {
    console.log("I HAVE A NEW RAIL");
    commit("newRail", obj.rail);
    commit("newActionHistory", obj.newHistory);
  },
  SOCKET_moveTrain({commit}, obj) {
    commit("moveTrain", obj);
    commit("newActionHistory", obj.newHistory);
  },
  SOCKET_broadcastMessage({commit}, message) {
    commit("broadcastMessage", message);
  },
  SOCKET_sendUser({commit}, message) {
    commit("sendUser", message);
  },
  // SOCKET_newMap
}

export default new Vuex.Store({
  state,
  mutations,
  actions
})
