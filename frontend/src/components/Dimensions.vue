<template>
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
        tempHeight: this.mapHeight,
        tempWidth: this.mapWidth
    };
},
  computed: {
    ...mapState(['mapHeight, mapWidth, listOfClickedRails'])
  },
  methods: {
      sendNewSize() {
          this.$socket.emit("newMap", {height: tempHeight, width: tempWidth, map: listOfClickedRails})
      }
  }
};
</script>