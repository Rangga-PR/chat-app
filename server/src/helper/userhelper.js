let users = [];

function joinChatRoom(id, username) {
  const user = { id, username };
  users.push(user);
  return user;
}

function getCurrentUser(id) {
  return users.find((user) => user.id === id);
}

function getRoomUsers() {
  return users;
}

function leftChatRoom(id) {
  const index = users.findIndex((user) => user.id === id);
  if (index !== -1) return users.splice(index, 1)[0];
  return undefined;
}

module.exports = {
  joinChatRoom,
  leftChatRoom,
  getCurrentUser,
  getRoomUsers,
};
