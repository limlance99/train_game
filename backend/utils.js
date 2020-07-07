module.exports.joinMessage = () => {
    messages = [
        "has joined the room.", 
        "entered the room", 
        "has decided to play with us",
        "joined the server"
    ];
    index = Math.floor(Math.random() * messages.length);
    return messages[index];
}