<template>
    <div class="h-100">
        <div class="chatbox h-40 flex-grow-1">
            <div v-for="(line, index) in chatMessages" :key="index">
                {{line}}
            </div>
        </div>
        <div class="flex-shrink-1">

        <input class="form-control" :value="chatMessage" placeholder="chat here">
        <button class="btn btn-primary mb-2" @click="sendMessage()">Send</button>
        </div>
    </div>
</template>

<script>
import {mapState} from "vuex";
export default {
    data() {
        return {
            chatMessage: null,
        }
    },
    computed: {
        ...mapState(["chatMessages"]),
    },
    methods: {
        sendMessage() {
            this.$socket.emit('sendMessage', this.chatMessage);
        }
    },
    watch: {
        chatMessage() {
            console.log(this.chatMessage);
        }
    }
}
</script>

<style scoped>
.chatbox {
    overflow-y: scroll;
}
</style>