const addMessage = (room, text, user) => {
    const newMessage = { text, user, timestamp: new Date() };
    room.messages.push(newMessage);
    return newMessage;
  };
  
  
  module.exports = { addMessage };
  