<template>
  <div id="app">
    <Name />
    <div class="d-flex flex-row">
      <div class="col-md-auto container ml-5 mr-5">
        <Train @enableButtons="enableButtons"/>

        <div class="card d-inline-flex mt-4 mb-4" style="border: none">
          <div class="row">
            <label>Height</label>
            <b-input-group class="col-sm-3">
              <b-input-group-prepend>
                <b-btn @click="tempHeight -= 1" variant="outline-info">-</b-btn>
              </b-input-group-prepend>

              <b-form-input type="number" v-model="tempHeight" min="1"></b-form-input>

              <b-input-group-append>
                <b-btn  @click="tempHeight += 1" variant="outline-secondary">+</b-btn>
              </b-input-group-append>
            </b-input-group>

            <label>Width</label>
            <b-input-group class="col-sm-3">
              <b-input-group-prepend>
                <b-btn @click="tempWidth -= 1" variant="outline-info">-</b-btn>
              </b-input-group-prepend>

              <b-form-input type="number" v-model="tempWidth" min="1"></b-form-input>

              <b-input-group-append>
                <b-btn @click="tempWidth += 1" variant="outline-secondary">+</b-btn>
              </b-input-group-append>
            </b-input-group>

            <button class="btn btn-primary" @click="changeSize()"> Change Size </button>
          </div>
        </div>


        <div v-for="row in height" class="row justify-content-center ml-5 mr-5" :key="row">
          <div v-for="col in width" class="col col-md-auto" :key="col">
            <div class="row">
              <div class="col-md-auto rail-vertical-invis"></div>
              <div
                @click="send_button(row, col, 0)"
                class="col-md-auto rail rail-vertical"
                :style="`background-color: ${(listOfClickedRails[((row-1) * width + (col-1)) * 4 + 0 - '']) ? listOfClickedRails[((row-1) * width + (col-1)) * 4 + 0 - ''] : '#FFFFFF'}`"
              >{{((row-1) * width + (col-1)) * 4 + 0}}</div>
              <div class="col-md-auto rail-vertical-invis"></div>
            </div>
            <div class="row">
              <div
                @click="send_button(row, col, 3)"
                class="col-md-auto rail rail-horizontal"
                 :style="`background-color: ${(listOfClickedRails[((row-1) * width + (col-1)) * 4 + 3 - '']) ? listOfClickedRails[((row-1) * width + (col-1)) * 4 + 3 - ''] : '#FFFFFF'}`"
              >{{((row-1) * width + (col-1)) * 4 + 3}}</div>
              <div class="col-md-auto center-box"></div>
              <div
                @click="send_button(row, col, 1)"
                class="col-md-auto rail rail-horizontal"
                 :style="`background-color: ${(listOfClickedRails[((row-1) * width + (col-1)) * 4 + 1 - '']) ? listOfClickedRails[((row-1) * width + (col-1)) * 4 + 1 - ''] : '#FFFFFF'}`"
              >{{((row-1) * width + (col-1)) * 4 + 1}}</div>
            </div>
            <div class="row">
              <div class="col-md-auto rail-vertical-invis"></div>
              <div
                @click="send_button(row, col, 2)"
                class="col-md-auto rail rail-vertical"
                :style="`background-color: ${(listOfClickedRails[((row-1) * width + (col-1)) * 4 + 2 - '']) ? listOfClickedRails[((row-1) * width + (col-1)) * 4 + 2 - ''] : '#FFFFFF'}`"
              >{{((row-1) * width + (col-1)) * 4 + 2}}</div>
              <div class="col-md-auto rail-vertical-invis"></div>
            </div>
          </div>
        </div>
        <button
          type="button"
          @click="go()"
          :disabled="preventClicking"
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
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

export default {
  name: "Home",
  components: { History, Chatbox, Train, Name },
  data() {
    return {
      directions: [],
      preventClicking: false,
      width: 3,
      height: 3,
      tempWidth: 3,
      tempHeight: 3,
      gettingName: false,
    };
  },
  computed: {
    ...mapState(["listOfClickedRails", "errorMessage"]),
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
    changeSize() {
      this.height = this.tempHeight;
      this.width = this.tempWidth;
    },
    send_button(row, col, direction) {
      if (!this.preventClicking) {
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
      }
    },

    enableButtons() {
      this.preventClicking = false;
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