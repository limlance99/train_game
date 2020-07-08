<template>
  <div>
    <img src="@/assets/train.png" class="train" id="train" />
    <!-- <button @click="moveTrain()">GO</button> -->
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
    //   var top = 100;
    //   var left = 60;
    //   var listOfDirections = this.directions;
    //   var id = setInterval(frame, 5);
    //   var i = 0;
    //   var face = "e";

    //   function frame() {
          
    //     if (i == listOfDirections.length) {
    //       clearInterval(id);
    //     } else {
    //       // if 
    //       // if (face == east) {
            
    //       // };
    //       elem.style.top = top + "px";
    //       elem.style.left = top + "px";
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