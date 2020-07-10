<template>
<div>
<modal name="hello-world" :clickToClose="false" :height="200">
  <div class="p-5">
    <h5> Please Enter Your Name </h5>
    <div class="input-group mt-3">
    <input type="text" class="form-control" @keyup.enter="sendName" splaceholder="Wats ur name" v-model="username">
    <div class="input-group-append">
      <button @click="sendName" class="input-group-text" id="basic-addon2"> Enter </button>
    </div>
  </div>
</div>
</modal>
</div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Name",
  data() {
    return {
      username: ""
    };
  },
  computed: {
    ...mapState(['askingName']),
  },
  methods: {
    show () {
      this.$modal.show('hello-world');
    },
    hide () {
      this.$modal.hide('hello-world');
    },
    sendName() {
      console.log(this.username);
      this.$socket.emit("sendName", this.username.trim());
    },
  },
  watch: {
    askingName() {
      if (this.askingName == true) {
        this.$modal.show('hello-world');
      }
      else {
        this.$modal.hide('hello-world');
      }
    }
  }
};
</script>