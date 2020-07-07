const algo = require('./algo');

function main() {
    edge_list = [
        [[1, 0], [1, 1]],
        [[2, 1], [1, 1]],
        [[1, 2], [1, 1]],
        [[1, 3], [1, 2]],
        [[1, 3], [2, 3]],
        [[3, 3], [2, 3]],
        [[3, 3], [3, 2]],
        [[3, 1], [3, 2]]
    ];
    
    a = algo(edge_list);
    
    console.log(a);
}

main();