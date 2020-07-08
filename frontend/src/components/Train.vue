<template>
  <div>
    <button class="mt-100px" @click="moveTrain()"> GO {{ directions }} {{ directions.length }}</button>
    <img src="@/assets/train.png" class="train" id="train" />
    
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
data() {
    return {
        doneAnimating: false
    };
},
  computed: {
    ...mapState(["directions"]),
  },
  methods: {
    moveTrain() {
      console.log("directions", this.directions);
      console.log(this.directions[0]);
      var dirLen = this.directions.length;
      console.log(dirLen);
      var direcs = this.directions
      var elem = document.getElementById("train");
      var top = 120;
      var left = 10;
      var movement = 100;
      
      var currentPosX = left;
      var currentPosY = top;
        elem.style.left = left;
        elem.style.top = top;
    var i = 0;
    var id = setInterval(function() { frame(); i+=1; }, 500);
    
      function frame() {
        
        console.log("went thru here once", i, direcs, dirLen)
        if (i > dirLen) {
            console.log("done")
            clearInterval(id);
            return true;
        } 
        else {
          console.log("went thru here once", currentPosX, currentPosY)
          if (direcs[i] == 'e') {
              elem.style.left = currentPosX + movement + "px"; 
              currentPosX = currentPosX + movement;
          }
          else if (direcs[i] == 'w') {
              elem.style.left = currentPosX - movement + "px";
              currentPosX = currentPosX - movement;
          }
          else if (direcs[i] == 'n') {
              elem.style.top = currentPosY - movement + "px";
              currentPosY = currentPosY - movement;
          }
          else if (direcs[i] == 's') {
              elem.style.top = currentPosY + movement + "px";
              currentPosY = currentPosY + movement;
          }
        }
      }
    }
  },
  watch: {
      directions() {
          if (this.directions.length >0) {
              this.doneAnimating = this.moveTrain()
          }
      },
  }
};
</script>

<style scoped>
.train {
  position: absolute;
  transform: scaleX(-1);
  width: 100px;
  top: 120px;
  left: 10px;
  z-index: 1;
  margin: 0
}
</style>