const rails = require('./rail');
const algo = require('./algo');

function main() {
    railMap = new rails.RailMap();
    railMap.add(new rails.Rail(0, "#FF0000", 3));
    railMap.add(new rails.Rail(1, "#FF0000", 3));
    railMap.add(new rails.Rail(3, "#FF0000", 3));
    railMap.add(new rails.Rail(7, "#FF0000", 3));
    railMap.add(new rails.Rail(6, "#FF0000", 3));
    
    console.log(algo.railsToEdges(railMap.rails));
}

main();