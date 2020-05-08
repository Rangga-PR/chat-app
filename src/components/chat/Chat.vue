<template>
  <div class="container">
    <div class="chat-wrapper">
      <div class="top-bar">
        <h3 class="chat-title">{{chatTitle || "Chat Room"}}</h3>
      </div>
      <div class="conversation-container">
        <div class="chat-box left">
          <div class="chat-content">
            <p class="chat-sender right">maudi ayunda</p>
            <p class="chat-text right">hallo apa kabarnya?</p>
          </div>
        </div>

        <div class="chat-box right">
          <div class="chat-content">
            <p class="chat-sender">you</p>
            <p class="chat-text">kabar baik kok? kamu sendiri?</p>
          </div>
        </div>
      </div>
      <div class="bottom-bar">
        <input class="chat-input" type="text" />
        <i class="material-icons">send</i>
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
    float: right;

    .chat-text,
    .chat-sender {
      text-align: right;
    }
  }

  &.left {
    float: left;

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