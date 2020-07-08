<template>
  <div>
    <img src="@/assets/train.png" class="train" id="train" />
    <button @click="moveTrain()">GO</button>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState(["directions"]),
  },
  methods: {
    // moveTrain() {
    //   var elem = document.getElementById("train");
    //   var pos = 10;
    //   var listOfDirections = this.directions;
    //   var id = setInterval(frame, 5);
    //   var i = 0;
    //   var face = "east";

    //   function frame() {
          
    //     if (i == listOfDirections.length - 1) {
    //       clearInterval(id);
    //     } else {
    //       if (face == east) pass;
    //       elem.style.top = pos + "px";
    //       elem.style.left = pos + "px";
    //     }
    //   }
    // }
  }
};
</script>

<style scoped>
.train {
  position: absolute;
  transform: scaleX(-1);
  width: 100px;
  top: 10px;
  left: 10px;
}
</style>