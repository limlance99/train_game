const vector = {
    'n': [-1, 0],
    's': [1, 0],
    'w': [0, -1],
    'e': [0, 1]
};

const opposite = {
    'n': 's',
    's': 'n',
    'e': 'w',
    'w': 'e'
};

function checkNeighbor(node, edge) {
    if (equals(node, edge[0]))
        return edge[1];
    if (equals(node, edge[1]))
        return edge[0];
    return false;
}

function equals(nodeA, nodeB) {
    if (nodeA[0] != nodeB[0])
        return false;
    if (nodeA[1] != nodeB[1])
        return false;
    return true;
}

function add(node, delta) {
    return [node[0] + delta[0], node[1] + delta[1]];
}

function findNeighbors(node, edgeList) {
    let neighbors = [];
    for (let [index, edge] of edgeList.entries()) {
        let neighbor = checkNeighbor(node, edge);
        if (neighbor !== false) {
            neighbors.push({
                coord: neighbor,
                direction: getDirection(node, neighbor),
                edgeIndex: index
            });
        }
    }
    return neighbors;
}

function getDirection(node, neighbor) {
    let row = neighbor[0] - node[0];
    let col = neighbor[1] - node[1];

    if (row == -1 && col == 0)
        return 'n';
    if (row == 1 && col == 0)
        return 's';
    if (row == 0 && col == -1)
        return 'w';
    if (row == 0 && col == 1)
        return 'e';
}

function check(node, neighbors) {
    for (let neighbor of neighbors) {
        if (equals(node, neighbor.coord)) {
            return neighbor;
        }
    }
    return false;
}

function solve(edgeList) {
    let node = [1, 0];
    let face = 'e';
    let path = [];
    let visited = {}
    
    while (true) {
        let neighbors = findNeighbors(node, edgeList);
        let next = add(node, vector[face]);
        let nextNeighbor = check(next, neighbors);

        if (nextNeighbor !== false && !visited[nextNeighbor.edgeIndex]) {
            path.push(face);
            node = next;
        }

        else if (neighbors.length == 1) {
            return path;
        } 
        
        else {
            for (let neighbor of neighbors) {
                if (face != opposite[neighbor.direction]) {
                    path.push(neighbor.direction);
                    face = neighbor.direction;
                    visited[neighbor.edgeIndex] = true;
                    node = neighbor.coord;
                    break;
                }
            }
        }
    } 
}

function railsToEdges(rails) {
    let edges = [];
    for (const [railID, rail] of Object.entries(rails)) {
        let nodeA = [
            1 + (2 * rail.row),
            1 + (2 * rail.col)
        ];
        let nodeB = add(nodeA, vector[rail.direction]);
        edges.push([nodeA, nodeB]);
    }
    return edges;
}

module.exports.solve = solve;
module.exports.railsToEdges = railsToEdges;