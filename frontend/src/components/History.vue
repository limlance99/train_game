<template>
    <div class="h-50">
        <div class="history h-100">
            <h5> History </h5>
            <div v-for="(line, index) in actionHistory" :key="index">
                {{line}}
            </div>
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
}

</style>