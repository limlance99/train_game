<template>
    <div class="history">
        <div v-for="(line, index) in actionHistory" :key="index">
            {{line}}
        </div>
    </div>
</template>

<script>
import {mapState} from "vuex";
export default {
    computed: {
        ...mapState(["actionHistory"]),
    }
}
</script>

<style scoped>
.history {
    overflow-y: scroll;
    height: 50%;
}

</style>