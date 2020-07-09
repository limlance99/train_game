<template>
    <div class="card d-inline-flex" style="border: none">
        <div class="row">
        <label style="margin-top: 6px">Height</label>
        <b-input-group class="col-sm">
            <b-input-group-prepend >
            <b-btn @click="changeHeight(tempHeight - 1)" variant="outline-info">-</b-btn>
            </b-input-group-prepend>

                <span class="input-group-text"> {{ tempHeight }} </span>

            <b-input-group-append>
            <b-btn  @click="changeHeight(tempHeight + 1)" variant="outline-secondary">+</b-btn>
            </b-input-group-append>
            
        </b-input-group>

        <label style="margin-top: 6px">Width</label>
        <b-input-group class="col-sm">
            <b-input-group-prepend>
                
            <b-btn @click="changeWidth(tempWidth - 1)" variant="outline-info">-</b-btn>
            </b-input-group-prepend>

            <span class="input-group-text"> {{ tempWidth }} </span>

            <b-input-group-append>
            <b-btn @click="changeWidth(tempWidth + 1)" variant="outline-secondary">+</b-btn>
            </b-input-group-append>
        </b-input-group>

        <button class="btn btn-primary" @click="sendNewSize()"> Change Size </button>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";

// var animationDone;

export default {
data() {
    return {
        // doneAnimating: false
        // tempHeight: this.mapHeight,
        // tempWidth: this.mapWidth
        tempHeight: null,
        tempWidth: null
    };
},
  computed: {
    ...mapState(["mapHeight", "mapWidth", "listOfClickedRails"])
  },
  methods: {
      sendNewSize() {
          this.$socket.emit("changeDimensions", {height: this.tempHeight, width: this.tempWidth, map: this.listOfClickedRails})
          console.log(this.tempHeight, this.tempWidth);
      },
      changeHeight(size) {
          if (size < 1) {
              size = 1;
          }
          this.tempHeight = size;
      },
      changeWidth(size) {
          if (size < 3) {
              size = 3;
          }
          this.tempWidth = size;
      }
  },
  watch: {
      mapHeight() {
          console.log("changed Height to ", this.mapHeight)
          this.tempHeight = this.mapHeight;
      },
      mapWidth() {
          console.log("changed width to ", this.mapWidth)
          this.tempWidth = this.mapWidth;
      },
      tempHeight() {
          console.log(this.tempHeight);
      },
      tempWidth() {
          console.log(this.tempWidth);
      }
  }
};
</script>