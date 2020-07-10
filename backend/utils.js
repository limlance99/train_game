module.exports = {
    joinMessage() {
        messages = [
            "has joined the room.", 
            "entered the room", 
            "has decided to play with us",
            "joined the server"
        ];
        index = Math.floor(Math.random() * messages.length);
        return messages[index];
    },

    chooseRandomColor() {
        var hexValues = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += hexValues[Math.floor(Math.random() * hexValues.length)];
        }
        return color;
    },

    timeout(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    },

    getRandomID() {
        return Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
    }
};