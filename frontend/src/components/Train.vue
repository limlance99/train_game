<template>
  <div>
    <img src="@/assets/train.png" class="train" id="train" />
    <button @click="moveTrain()">GO {{ directions }}</button>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState(["directions"]),
  },
  methods: {
    moveTrain() {
      console.log("directions", this.directions);
      var elem = document.getElementById("train");
      var top = 200;
      var left = 60;
      var movement = 100;
      var id = setInterval(frame, 5);
      var i = 0;
      var currentPosX = left;
      var currentPosY = top;
      function frame() {
        if (i == this.directions.length) {
          clearInterval(id);
        } else {
          // if 
          if (this.directions[i] == 'e') {
              elem.style.left = currentPosX + movement + "px"; 
              currentPosX = elem.style.left;
          }
          else if (this.directions[i] == 'w') {
              elem.style.left = currentPosX - movement + "px";
              currentPosX = elem.style.left;
          }
          else if (this.directions[i] == 'n') {
              elem.style.top = currentPosY - movement + "px";
              currentPosY = elem.style.top;
          }
          else {
              elem.style.top = currentPosY + movement + "px";
              currentPosY = elem.style.top;
          }
        }
        i += 1;
      }
    }
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