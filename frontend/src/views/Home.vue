<template>
  <div id="app">
    <Name />
    <!-- <div class="d-flex flex-row p-2 ml-5 mt-2 mb-2">
      <Dimensions />
    </div> -->
    
    <div class="d-flex flex-row pt-3 pb-3">
      <div class="row flex-shrink-1">
        <div class="col-md-auto pb-3 pt-4 m-3">
          <div class="container h-100 d-flex flex-column justify-content-between mr-0 ml-0 pr-0">
            <div v-for="number in ((2*mapHeight) + 1)" class="" :key="number">
              <b-button class="mt-auto"> <i :class="(number % 2 == 0) ? 'fa fa-minus-square' : 'fa fa-plus-square'" aria-hidden="true"></i> </b-button>
            </div>
          </div>
        </div>
        <div class="col-md-auto container ml-3 mr-5">
          <Train @enableButtons="enableButtons"/>

          <div class="container d-flex justify-content-between p-0 mb-4">
            <div v-for="number in ((2*mapWidth) + 1)" :key="number">
              <b-button> <i :class="(number % 2 == 0) ? 'fa fa-minus-square' : 'fa fa-plus-square'" aria-hidden="true"></i> </b-button>
            </div>
          </div>


          <div v-for="row in mapHeight" class="row justify-content-center ml-4 mr-2" :key="row">
            <div v-for="col in mapWidth" class="col col-md-auto" :key="col">
              <div class="row">
                <div class="col-md-auto rail-vertical-invis"></div>
                <div
                  @click="send_button(row, col, 0)"
                  class="col-md-auto rail rail-vertical"
                  :style="`background-color: ${(listOfClickedRails[((row-1) * mapWidth + (col-1)) * 4 + 0 - '']) ? listOfClickedRails[((row-1) * mapWidth + (col-1)) * 4 + 0 - ''] : '#FFFFFF'}`"
                >{{((row-1) * width + (col-1)) * 4 + 0}}</div>
                <div class="col-md-auto rail-vertical-invis"></div>
              </div>
              <div class="row">
                <div
                  @click="send_button(row, col, 3)"
                  class="col-md-auto rail rail-horizontal"
                  :style="`background-color: ${(listOfClickedRails[((row-1) * mapWidth + (col-1)) * 4 + 3 - '']) ? listOfClickedRails[((row-1) * mapWidth + (col-1)) * 4 + 3 - ''] : '#FFFFFF'}`"
                >{{((row-1) * width + (col-1)) * 4 + 3}}</div>
                <div class="col-md-auto center-box"></div>
                <div
                  @click="send_button(row, col, 1)"
                  class="col-md-auto rail rail-horizontal"
                  :style="`background-color: ${(listOfClickedRails[((row-1) * mapWidth + (col-1)) * 4 + 1 - '']) ? listOfClickedRails[((row-1) * mapWidth + (col-1)) * 4 + 1 - ''] : '#FFFFFF'}`"
                >{{((row-1) * width + (col-1)) * 4 + 1}}</div>
              </div>
              <div class="row">
                <div class="col-md-auto rail-vertical-invis"></div>
                <div
                  @click="send_button(row, col, 2)"
                  class="col-md-auto rail rail-vertical"
                  :style="`background-color: ${(listOfClickedRails[((row-1) * mapWidth + (col-1)) * 4 + 2 - '']) ? listOfClickedRails[((row-1) * mapWidth + (col-1)) * 4 + 2 - ''] : '#FFFFFF'}`"
                >{{((row-1) * width + (col-1)) * 4 + 2}}</div>
                <div class="col-md-auto rail-vertical-invis"></div>
              </div>
            </div>
          </div>
        </div>
        <button
          type="button"
          @click="go()"
          :disabled="preventClicking"
          class="btn btn-success btn-lg btn-block mt-5 mr-5 ml-5"
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
// import Dimensions from "@/components/Dimensions.vue";
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

export default {
  name: "Home",
  components: { History, Chatbox, Train, Name, }, //Dimensions },
  data() {
    return {
      directions: [],
      preventClicking: false,
      width: 3,
      height: 3,
      gettingName: false,
    };
  },
  computed: {
    ...mapState(["listOfClickedRails", "errorMessage", "mapHeight", "mapWidth", "userColor"]),
  },
  methods: {
    makeToast(message = null) {
        console.log("make toast")
        this.$bvToast.toast(message, {
          title: 'Error',
          toaster: 'b-toaster-top-center',
          variant: 'warning',
          solid: true
        })
    },
    // changeSize(tempHeight, tempWidth) {
    //   this.height = tempHeight;
    //   this.width = tempWidth;
    // },
    send_button(row, col, direction) {
      if (!this.preventClicking) {
        row -= 1;
        col -= 1;
        var id = (row * this.mapWidth + col) * 4 + direction;
        // Socket.sendRail(id);
        let placed = (
          this.listOfClickedRails[id] == undefined || 
            this.listOfClickedRails[id] == null || 
            this.listOfClickedRails[id] == "#FFFFFF"
          );
        this.$socket.emit("railClicked", {
          id: id,
          width: this.mapWidth,
          placed: placed
        });
        let rail = {
          id,
          color: (placed) ? this.userColor : "#FFFFFF",
        }
        this.$store.commit("newRail", rail); 
      }
    },

    enableButtons() {
      this.preventClicking = false;
    },

    setColor(row, col, direction) {
      console.log("went thru here");
      row -= 1;
      col -= 1;
      var id = (row * this.mapWidth + col) * 4 + direction;
      
      if (this.listOfClickedRails[id] != undefined && this.listOfClickedRails[id] != null) {
        return this.listOfClickedRails[id];
      }
      
      return "#FFFFFF";
    },
    go() {
      this.$socket.emit("goClicked");
      this.preventClicking = true;
    }
  },
  watch: {
    listOfClickedRails() {
      this.ClickedRails = this.listOfClickedRails;
      console.log(this.ClickedRailslistOfClickedRails);
    },
    errorMessage() {
      if (this.errorMessage != null && this.errorMessage != undefined) {
        console.log(this.errorMessage.name + " " + this.errorMessage.message)
        var message = this.errorMessage.name + " " + this.errorMessage.message;
        console.log(message)
        this.makeToast(message);
      }
    }
  },
};
</script>

<style>
.header {
  margin-top: 100px;
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