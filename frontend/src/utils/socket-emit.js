export const SOCKET_EMIT = {
    railClicked (socket, data) {
        socket.emit('railClicked', data);
    },
    upsertRowCol(socket, data) {
        socket.emit('upsertRowCol', data);
    },
    goClicked(socket) {
        socket.emit("goClicked");
    },
    sendMessage(socket, message) {
        socket.emit("sendMessage", message);
    },
    changeDimensions(socket, data) {
        socket.emit("changeDimensions", data);
    },
    sendName(socket, message) {
        socket.emit("sendName", message);
    },
    trainStop(socket) {
        socket.emit("trainStop");
    }
}