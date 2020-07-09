<template>
    <div class="h-50">
        <div class="history h-100">
            <h5> History </h5>
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
    overflow-y: scroll;
}

</style>