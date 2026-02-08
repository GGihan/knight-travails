export class KnightGraph {
    constructor(size = 8) {
        this.size = size;
        this.moveOffsets = [
            [2, 1], [2, -1], [-2, 1], [-2, -1],
            [1, 2], [1, -2], [-1, 2], [-1, -2]
        ];
    }
    
    isWithinBounds([x, y]) {
        return x >= 0 && x < this.size && y >= 0 && y < this.size;
    }

    getNeighbors([x, y]) {
        return this.moveOffsets
            .map(([dx, dy]) => [x + dx, y + dy])
            .filter(pos => this.isWithinBounds(pos));
    }

    knightMoves(start, end) {
        if (!this.isWithinBounds(start) || !this.isWithinBounds(end)) {
            throw new Error("Target or starting position is out of bounds.");
        }

        const queue = [{ position: start, path: [start] }];
        const visited = new Set([start.toString()]);

        while (queue.length > 0) {
            const { position, path } = queue.shift();

            if (position[0] === end[0] && position[1] === end[1]) {
                this.displayResult(path);
                return path;
            }

            for (const neighbor of this.getNeighbors(position)) {
                const neighborKey = neighbor.toString();

                if (!visited.has(neighborKey)) {
                    visited.add(neighborKey);
                    queue.push({
                        position: neighbor,
                        path: [...path, neighbor]
                    });
                }
            }
        }
    }

    displayResult(path) {
        console.log(`=> You made it in ${path.length - 1} moves!  Here's your path:`);
        path.forEach(square => console.log(JSON.stringify(square)));
    }
}