module.exports = {
    directions: ["n", "e" , "s", "w"],
    directionsReversed: {
        "n": "s", 
        "e": "w", 
        "s": "n", 
        "w": "e"
    },
    locationDelta: {
        "n": {
            "row": -1, 
            "column": 0
        }, 
        "e": {
            "row": 0, 
            "column": 1
        }, 
        "s": {
            "row": 1, 
            "column": 0
        }, 
        "w": {
            "row": 0, 
            "column": -1
        }
    }
}