<template>
  <div id="app">
    <div class="header"></div>
    <Name />
    <div class="d-flex flex-row">
      <div class="col-md-auto container ml-5 mr-5">
        <Train />
        <div v-for="row in height" class="row justify-content-center ml-5 mr-5" :key="row">
          <div v-for="col in width" class="col col-md-auto" :key="col">
            <div class="row">
              <div class="col-md-auto rail-vertical-invis"></div>
              <div
                @click="send_button(row, col, 0)"
                class="col-md-auto rail rail-vertical"
                :style="`background-color: ${(listOfClickedRails[((row-1) * width + (col-1)) * 4 + 0 - '']) ? listOfClickedRails[((row-1) * width + (col-1)) * 4 + 0 - ''] : '#FFFFFF'}`"
              ></div>
              <div class="col-md-auto rail-vertical-invis"></div>
            </div>
            <div class="row">
              <div
                @click="send_button(row, col, 3)"
                class="col-md-auto rail rail-horizontal"
                 :style="`background-color: ${(listOfClickedRails[((row-1) * width + (col-1)) * 4 + 3 - '']) ? listOfClickedRails[((row-1) * width + (col-1)) * 4 + 3 - ''] : '#FFFFFF'}`"
              ></div>
              <div class="col-md-auto center-box"></div>
              <div
                @click="send_button(row, col, 1)"
                class="col-md-auto rail rail-horizontal"
                 :style="`background-color: ${(listOfClickedRails[((row-1) * width + (col-1)) * 4 + 1 - '']) ? listOfClickedRails[((row-1) * width + (col-1)) * 4 + 1 - ''] : '#FFFFFF'}`"
              ></div>
            </div>
            <div class="row">
              <div class="col-md-auto rail-vertical-invis"></div>
              <div
                @click="send_button(row, col, 2)"
                class="col-md-auto rail rail-vertical"
                :style="`background-color: ${(listOfClickedRails[((row-1) * width + (col-1)) * 4 + 2 - '']) ? listOfClickedRails[((row-1) * width + (col-1)) * 4 + 2 - ''] : '#FFFFFF'}`"
              ></div>
              <div class="col-md-auto rail-vertical-invis"></div>
            </div>
          </div>
        </div>
        <button
          type="button"
          @click="go()"
          class="btn btn-success btn-lg btn-block mt-2 mb"
        >Go</button>
      </div>

      <div class="flex-grow-1">
        <History  />
        <Chatbox  />
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapState } from "vuex";
import History from "@/components/History.vue";
import Chatbox from "@/components/Chatbox.vue";
import Train from "@/components/Train.vue";
import Name from "@/components/Name.vue";

export default {
  name: "Home",
  components: { History, Chatbox, Train, Name },
  data() {
    return {
      directions: [],
      startAnimation: false,
      width: 3,
      height: 3,
      gettingName: false,
    };
  },
  computed: {
    ...mapState(["listOfClickedRails"]),
  },
  methods: {
    send_button(row, col, direction) {
      row -= 1;
      col -= 1;
      var id = (row * this.width + col) * 4 + direction;
      // Socket.sendRail(id);
      this.$socket.emit("railClicked", {
        id: id,
        placed: (
          this.listOfClickedRails[id] == undefined || 
          this.listOfClickedRails[id] == null || 
          this.listOfClickedRails[id] == "#FFFFFF"
        )
      });
    },

    find_path() {
      // get info from backend
      this.directions = ["e", "e", "s", "s", "e"];
      this.startAnimation = true;
    },

    setColor(row, col, direction) {
      console.log("went thru here");
      row -= 1;
      col -= 1;
      var id = (row * this.width + col) * 4 + direction;
      
      if (this.listOfClickedRails[id] != undefined && this.listOfClickedRails[id] != null) {
        return this.listOfClickedRails[id];
      }
      
      return "#FFFFFF";
    },
    go() {
      this.$socket.emit("goClicked");
    }
  },
  watch: {
    listOfClickedRails() {
      this.ClickedRails = this.listOfClickedRails;
      console.log(this.ClickedRailslistOfClickedRails);
    }
  },
};
</script>

<style>
.header {
  margin-top: 10px;
}

.box {
  width: 80%;
}

.rail-vertical {
  width: 50px;
  height: 80px;
  border-style: solid;
  border-width: 1.5px;
  padding: 0;
}

.rail-vertical-invis {
  width: 80px;
  height: 80px;
  border-style: hidden;
  border-width: 1.5px;
  padding: 0;
}

.rail-horizontal {
  width: 80px;
  height: 50px;
  border-style: solid;
  border-width: 1.5px;
  padding: 0;
}

.center-box {
  width: 50px;
  height: 50px;
  padding: 0;
}

.rail:hover {
  cursor: pointer;
  background-color: #855e3f;
}

.sidebar {
  width: 600px;
  background-color: #e0e0e0;
}

.history {
  background-color: rgb(199, 193, 193);
  padding: 10px;
}

.chatbox {
  background-color: rgb(255, 255, 255);
  padding: 10px;
}
</style>