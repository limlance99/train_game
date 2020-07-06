
function equals(edgeA, edgeB) {
    if (edgeA[0][0] != edgeB[0][0])
        return false;
    if (edgeA[0][1] != edgeB[0][1])
        return false;
    if (edgeA[1][0] != edgeB[1][0])
        return false;
    if (edgeA[1][1] != edgeB[1][1])
        return false;
    return true;
}

function find_nodes(edge, edge_list) {
    for (var i = 0; i < edge_list.length; i++) {
        if (equals(edge, edge_list[i])) {
            return true;
        }
    }
    return false;
}

function add(edge, delta) {
    return [edge[0] + delta[0], edge[1] + delta[1]];
}

function algo(edge_list) {
    edge = [1, 0];
    direction = 'e';
    path = [];
    
    while (true) {
        switch (direction) {
            case 'n':
                next = add(edge, [-1, 0])
                break;
            case 'e':
                next = add(edge, [0, -1])
                break;
            case 'w':
                next = add(edge, [0, 1])
                break;
            case 's':
                next = add(edge, [1, 0])
                break;
        }

        if (exists(edge, next)) {
            path.push('e');
            edge = add(edge, )
        }
    } 
    console.log(exists([[0, 1], [1, 1]], edge_list));
}

edge_list = [
    [[0, 1], [1, 1]], 
    [[1, 0], [1, 1]]
];
algo(edge_list);