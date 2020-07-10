<template>
        <div class="h-50 history" ref="historyContainer">
            <div v-for="(historyLine, index) in actionHistory" :key="index">
                <b>
                    [{{historyLine.time}}]</b>
                <span :style="`color:${historyLine.color}`">
                    {{historyLine.name}} {{historyLine.message}}
                </span>
                
            </div>
        </div>
    
</template>

<script>
import {mapState, /*mapGetters*/} from "vuex";
export default {
    computed: {
        ...mapState(["actionHistory"]),
        // ...mapGetters(["latestActionHistory"]),
    },
    watch: {
    actionHistory() {
      var container = this.$refs.historyContainer;
      container.scrollTop = container.scrollHeight;
      
    }
  }
}
</script>

<style scoped>
.history {
    overflow-y: scroll;
    background-color: rgb(229, 226, 226);
    /* padding: 10px; */
}

</style>