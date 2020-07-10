const rails = require('./rail');

function main() {
    railMap = new rails.RailMap();
    railMap.add(new rails.Rail(3, "#FF0000", 3));
    railMap.add(new rails.Rail(1, "#FF0000", 3));
    railMap.add(new rails.Rail(7, "#FF0000", 3));
    railMap.add(new rails.Rail(5, "#FF0000", 3));
    railMap.add(new rails.Rail(11, "#FF0000", 3));
    railMap.add(new rails.Rail(10, "#FF0000", 3));
    railMap.add(new rails.Rail(20, "#FF0000", 3));
    railMap.add(new rails.Rail(23, "#FF0000", 3));
    railMap.add(new rails.Rail(17, "#FF0000", 3));
    railMap.add(new rails.Rail(19, "#FF0000", 3));
    railMap.add(new rails.Rail(13, "#FF0000", 3));
    railMap.add(new rails.Rail(12, "#FF0000", 3));
    railMap.add(new rails.Rail(2, "#FF0000", 3));
    console.log(new rails.Rail(2, "#FF0000", 3));
    console.log(railMap.solve());


}
main();