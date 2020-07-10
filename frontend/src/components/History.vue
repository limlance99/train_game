<template>
    <div class="h-50 history">
        <h5> History </h5>
        <div class="h-100 historyLines">
            <div v-for="(historyLine, index) in actionHistory" :key="index">
                <b>
                    [{{historyLine.time}}]
                <span :style="`color:${historyLine.color}`">
                    {{historyLine.name}} {{historyLine.message}}
                </span>
                </b>
            </div>
        </div>
    </div>
</template>

<script>
import {mapState} from "vuex";
export default {
    computed: {
        ...mapState(["actionHistory"])
    }
}
</script>

<style scoped>
.history {
    background-color: rgb(199, 193, 193);
    padding: 10px;
}

.historyLines {
    overflow-y: scroll;
}

</style>