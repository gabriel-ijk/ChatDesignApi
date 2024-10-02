let rooms = [];

const createRoom = (name, isPrivate, password) => {
  const newRoom = { id: rooms.length + 1, name, isPrivate, password, messages: [] };
  rooms.push(newRoom);
  return newRoom;
};

const getRooms = () => {
  return rooms;
};

const findRoom = (id) => {
  return rooms.find(room => room.id === id);
};

module.exports = { createRoom, getRooms, findRoom };
