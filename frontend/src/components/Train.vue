<template>
  <div>
    <img src="@/assets/train.png" class="train" id="train" />
    
  </div>
</template>

<script>
import { mapState } from "vuex";

// var animationDone;

export default {
data() {
    return {
        // doneAnimating: false
    };
},
  computed: {
    ...mapState(["directions"])
  },
  methods: {
    moveTrain() {
      // this.doneAnimating = false;
      console.log("directions", this.directions);
      console.log(this.directions[0]);
      var dirLen = this.directions.length;
      console.log(dirLen);
      var direcs = this.directions
      var elem = document.getElementById("train");
      var top = 170;
      var left = -20;
      var movement = 100/10;
      elem.style.left = left + "px";
      elem.style.top = top + "px";
      var currentPosX = left;
      var currentPosY = top;
      var max = 10;
      
      var i = 0;
      var j = 0;
      var that = this;
      var id = setInterval(function() { 
        if (direcs[i] == 'e') {
            if (direcs[i-1] == 's') {
              elem.style.transform = "rotate(0deg) scaleX(-1)";
            }
            if (direcs[i-1] == 'n') {
              elem.style.transform = "rotate(0deg)";
            }
            elem.style.left = currentPosX + movement + "px"; 
            currentPosX = currentPosX + movement;
        }
        else if (direcs[i] == 'w') {
            if (direcs[i-1] == 's') {
              elem.style.transform = "rotate(0deg)";
            }
            if (direcs[i-1] == 'n') {
              elem.style.transform = "rotate(0deg) scaleX(-1)";
            }
            elem.style.left = currentPosX - movement + "px";
            currentPosX = currentPosX - movement;
        }
        else if (direcs[i] == 'n') {
            if (direcs[i-1] == 'e') {
              elem.style.transform = "rotate(90deg)";
            }
            if (direcs[i-1] == 'w') {
              elem.style.transform = "rotate(-90deg) scaleX(-1)";
            }
            elem.style.top = currentPosY - movement + "px";
            currentPosY = currentPosY - movement;
        }
        else if (direcs[i] == 's') {
            if (direcs[i-1] == 'e') {
              elem.style.transform = "rotate(90deg) scaleX(-1)";
            }
            if (direcs[i-1] == 'w') {
              elem.style.transform = "rotate(-90deg)";
            }
            elem.style.top = currentPosY + movement + "px";
            currentPosY = currentPosY + movement;
        }

        j+=1; 

        if (i > dirLen) {
          clearInterval(id);
          console.log("done");
          // that.doneAnimating = true;
          that.$socket.emit('trainStop');
          that.$emit("enableButtons");
        } 

        if (i % 2 == 0) {
          max = 11; 
        } else {
          max = 10; 
        } 
        if (j >= max) {
          i+=1; 
          j = 0;
        } 
      }, 100);
    
      // function frame() {
        
        // console.log("went thru here once", i, direcs, dirLen)
        
        // else {
          // console.log("went thru here once", currentPosX, currentPosY)
          // if (direcs[i] == 'e') {
          //     if (direcs[i-1] == 's') {
          //       elem.style.transform = "rotate(0deg) scaleX(-1)";
          //     }
          //     elem.style.left = currentPosX + movement + "px"; 
          //     currentPosX = currentPosX + movement;
          // }
          // else if (direcs[i] == 'w') {
          //     if (direcs[i-1] == 's') {
          //       elem.style.transform = "rotate(0deg)";
          //     }
          //     elem.style.left = currentPosX - movement + "px";
          //     currentPosX = currentPosX - movement;
          // }
          // else if (direcs[i] == 'n') {
          //     elem.style.top = currentPosY - movement + "px";
          //     currentPosY = currentPosY - movement;
          // }
          // else if (direcs[i] == 's') {
          //     if (direcs[i-1] == 'e') {
          //       elem.style.transform = "rotate(90deg) scaleX(-1)";
          //     }
          //     if (direcs[i-1] == 'w') {
          //       elem.style.transform = "rotate(-90deg)";
          //     }
          //     elem.style.top = currentPosY + movement + "px";
          //     currentPosY = currentPosY + movement;
          // }
        // }
      // }
    }
  },

  watch: {
      directions() {
          console.log("DIRECTIONS CHANGED: ", this.directions)
          if (this.directions.length >0) {
              this.moveTrain()
          }
      },
      // trainStopped() {
      //   console.log("trainStopped")
      // }
      // doneAnimating() {
      //     console.log("doneAnimating changed");
      //     if (this.doneAnimating == true) {
      //         console.log("emit trainstop")
      //         this.$socket.emit("trainStop");
      //         this.directions = [];
      //         this.doneAnimating = false;
      //     }
      // }
  }
};
</script>

<style scoped>
.train {
  position: absolute;
  transform: scaleX(-1);
  width: 100px;
  top: 170px;
  float: left;
  left: -20px;
  z-index: 1;
  margin: 0
}
</style>