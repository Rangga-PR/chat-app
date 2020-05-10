<template>
  <div class="container">
    <div class="chat-wrapper">
      <div class="top-bar">
        <h3 class="chat-title">{{chatTitle || "Chat Room"}}</h3>
      </div>
      <div class="conversation-container">
        <div
          v-for="(chat, i) in chats"
          :key="`chat-${i}`"
          class="chat-box"
          :class="[chat.sender === user ? 'right' : 'left']"
        >
          <div class="chat-content">
            <p class="chat-sender">{{chat.sender}}</p>
            <p class="chat-text">{{chat.message}}</p>
          </div>
        </div>
      </div>
      <div class="bottom-bar">
        <input class="chat-input" type="text" v-model="message" @keyup.enter="sendChatMessage" />
        <i class="material-icons" @click="sendChatMessage">send</i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Chat",
  props: {
    chatTitle: String,
  },
  data() {
    return {
      user: "",
      message: "",
      chats: [],
    };
  },
  sockets: {
    connect: function() {
      console.log("socket io on client is connected");
      this.chats = [];
    },
    welcome: function(msg) {
      this.chats.push(msg);
    },
    message: function(msg) {
      this.chats.push(msg);
    },
  },
  mounted() {
    this.user = localStorage.getItem("chatAppUser") || "You";
  },
  methods: {
    sendChatMessage: function() {
      this.$socket.emit("chatMessage", {
        sender: this.user,
        message: this.message,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../styles/_variables.scss";

.container {
  height: 100%;
  width: 100%;
}

.chat-wrapper {
  height: 100%;
  width: 100%;
  background-color: white;
}

.chat-box {
  margin: 10px 0;

  &.right {
    align-self: flex-end;

    .chat-text,
    .chat-sender {
      text-align: right;
    }
  }

  &.left {
    align-self: flex-start;

    .chat-text,
    .chat-sender {
      text-align: left;
    }
  }
}

.chat-content {
  background-color: $green;
  width: fit-content;
  padding: 0.3em 1em 0.5em 1em;
  border-radius: 5px;

  .chat-text,
  .chat-sender {
    color: white;
    margin: 0;
  }

  .chat-sender {
    margin-bottom: 5px;
    font-weight: bolder;
    text-decoration: underline;
  }
}

.top-bar,
.bottom-bar {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: $blue;
  height: 10%;

  .material-icons {
    border: 2px solid white;
    border-radius: 5px;
    padding: 0.1em;
    color: white;
  }
}

.conversation-container {
  display: flex;
  flex-direction: column;
  max-height: 80%;
  min-height: 80%;
  padding: 0 2%;
  overflow-y: auto;
}

.chat-title {
  color: white;
  margin: 0;
}

.chat-input {
  border: none;
  border-radius: 5px;
  height: 55%;
  width: 75%;
  margin-right: 10px;
  padding: 0 5px;
}
</style>