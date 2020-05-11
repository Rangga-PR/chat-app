<template>
  <div class="container">
    <div class="chat-wrapper">
      <div class="top-bar">
        <h3 class="chat-title">{{chatTitle || "Chat Room"}}</h3>
      </div>
      <div class="conversation-container" ref="chatContainer">
        <div
          v-for="(chat, i) in chats"
          :key="`chat-${i}`"
          class="chat-box"
          :class="[chat.sender === user ? 'right' : chat.sender === 'Chat Room' ? 'center' : 'left']"
        >
          <p class="chat-announcement" v-if="chat.sender === 'Chat Room'">{{chat.message}}</p>
          <div v-else class="chat-content">
            <p class="chat-sender">{{chat.sender}}</p>
            <p class="chat-text">{{chat.message}}</p>
          </div>
        </div>
      </div>
      <div class="bottom-bar">
        <input class="chat-input" type="text" v-model="message" @keyup.enter="sendChatMessage" />
        <div class="send-btn">
          <i class="material-icons" @click="sendChatMessage">send</i>
          <span class="send-text">Send</span>
        </div>
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
    userJoined: function(msg) {
      this.chats.push(msg);
    },
  },
  mounted() {
    this.user = localStorage.getItem("chatAppUser") || "You";
    this.$socket.emit("userEnter", this.user);
  },
  methods: {
    autoScrollDown: function() {
      const element = this.$refs.chatContainer;
      element.scrollTo(0, element.scrollHeight);
    },
    sendChatMessage: function() {
      if (this.message == "") return;

      this.$socket.emit("chatMessage", {
        sender: this.user,
        message: this.message,
      });

      this.message = "";
      this.autoScrollDown();
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
  margin: 5px 0;

  &.right {
    align-self: flex-end;

    .chat-sender {
      text-align: right;
    }
  }

  &.left {
    align-self: flex-start;

    .chat-sender {
      text-align: left;
    }
  }

  &.center {
    align-self: center;
  }
}

.chat-content {
  background-color: $green;
  width: fit-content;
  padding: 0.3em 1em 0.5em 1em;
  border-radius: 5px;
  overflow-wrap: anywhere;

  .chat-text,
  .chat-sender {
    color: white;
    margin: 0;
  }

  .chat-text {
    text-align: left;
  }

  .chat-sender {
    margin-bottom: 1px;
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

  .send-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    border: 2px solid white;
    border-radius: 5px;
    height: 50%;
  }

  .send-text {
    display: none;
    padding-right: 5px;
    color: white;
    font-weight: bolder;
  }

  .material-icons {
    color: white;
    padding: 0 0.2em;
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
  width: 80%;
  margin-right: 2%;
  padding: 0 5px;
}

.chat-announcement {
  margin: 0;
  font-size: 0.9em;
  color: salmon;
  font-weight: bolder;
}

@media only screen and(min-width: 768px) {
  .bottom-bar .send-btn {
    width: 10%;
  }

  .bottom-bar .send-text {
    display: block;
  }
}
</style>