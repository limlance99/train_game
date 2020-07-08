<template>
    <div class="h-50">
        <div class="chatbox h-100">
            <h5> Chatbox </h5>
            <div v-for="(chatLine, index) in chatMessages" :key="index">
                [{{chatLine.time}}]
                <span :style="`color:${chatLine.color}`">
                    {{chatLine.name}}
                </span>: {{chatLine.message}}
            </div>
        </div>
        <div class="flex-shrink-1 input-group">
            <input class="form-control" v-model="chatMessage" placeholder="chat here">
            <div class="input-group-append">
                <button class="btn btn-primary mb-2" @click="sendMessage()"
                :disabled="chatMessage ? false: true">Send</button>
            </div>
        </div>
    </div>
</template>

<script>
import {mapState} from "vuex";
export default {
    data() {
        return {
            chatMessage: "",
        }
    },
    computed: {
        ...mapState(["chatMessages"]),
    },
    methods: {
        sendMessage() {
            if (this.chatMessage != "") {
                this.$socket.emit('sendMessage', this.chatMessage);
                this.chatMessage = "";
            }
        }
    },
}
</script>

<style scoped>
.chatbox {
    overflow-y: scroll;
}
</style>