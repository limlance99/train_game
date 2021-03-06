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
  mapHeight: null,
  mapWidth: null,
  errorMessage: {},
  users: {},
}

const getters = {
  latestActionHistory: (state) => {
    let arr = state.actionHistory;
    // arr.reverse();
    arr = arr.slice(Math.max(arr.length - 15, 0));
    return arr;
  }
}

const mutations = {
  startUp: (state, data) => {
    console.log("startup:", data)
    state.askingName = true;
    state.mapHeight = data.height;
    state.mapWidth = data.width;
    state.listOfClickedRails = data.map; 
    state.actionHistory = data.actionHistory;
    state.userColor = data.color;
    state.users = data.users;
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
  userJoined: (state, obj) => {
    let user = {
      name: obj.name,
      color: obj.color
    }
    Vue.set(state.users, obj.id, user);
  },
  userLeft: (state, obj) => {
    console.log("IM HERE YO")
    console.log(obj.id);
    Vue.delete(state.users, obj.id);
  },
  newMap: (state, data) => {
    state.mapWidth = data.width;
    state.mapHeight = data.height;
    state.listOfClickedRails = data.map;
    console.log(data);
  }
}

const actions = {
  // SERVER TO CLIENT
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
  SOCKET_userJoined({commit}, obj) {
    commit("userJoined", obj);
    commit("newChatMessage", obj);
  },
  SOCKET_newMap({commit}, obj) {
    commit("newMap", obj);
    if (obj.newHistory) commit("newActionHistory", obj);
  },
  SOCKET_userAccept({commit}) {
    commit("userAccept");
  },
  SOCKET_userLeft({commit}, obj) {
    commit("userLeft", obj);
    commit("newChatMessage", obj);
  }
}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})
