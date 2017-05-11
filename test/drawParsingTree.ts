import drawParsingTree from '../lib/debug/drawParsingTree'
import ParsingNode from '../lib/parsingNode'
import NodePosition from '../lib/debug/nodePosition'
const assert = require('chai').assert

interface ExtendParsingNode extends ParsingNode {
    _position: NodePosition
}

const createNode = function(symbol = '@', children = []) {
    let node: any = new ParsingNode(symbol, false)
    node._children = children
    children.forEach(child => child._parent = node)
    return node
}

const preorder = function(root: ParsingNode, positions: number[][]) {
    positions.push((root as ExtendParsingNode)._position.toArray())
    root.children.forEach(child => preorder(child, positions))
    return positions
}

describe('drawParsingTree', function() {
    it('alone root', function() {
        let root = createNode()
        drawParsingTree(root)
        assert.deepEqual(preorder(root, []), [
            [0, 0, 0, 0]
        ])
    })

    it('case0', function() {
        let root = createNode('a', [
            createNode('b')
        ])
        drawParsingTree(root)
        assert.deepEqual(preorder(root, []), [
            [0, 0, 0, 0],
            [0, 0, 0, 1]
        ])
    })

    it('case1', function() {
        let root = createNode('a', [
            createNode('b'),
            createNode('c')
        ])
        assert.equal(drawParsingTree(root).length, 3)
        assert.deepEqual(preorder(root, []), [
            [0, 0, 1, 0],
            [0, 0, 0, 1],
            [1, 1, 1, 1]
        ])
    })

    it('case2', function() {
        let root = createNode('a', [
            createNode('b'),
            createNode('c', [
                createNode('d')
            ])
        ])
        assert.equal(drawParsingTree(root).length, 4)
        assert.deepEqual(preorder(root, []), [
            [0, 0, 1, 0],
            [0, 0, 0, 1],
            [1, 1, 1, 1],
            [1, 1, 1, 2]
        ])
    })

    it('case3', function() {
        let root = createNode('a', [
            createNode('b'),
            createNode('c', [
                createNode('d')
            ]),
            createNode('e')
        ])
        assert.equal(drawParsingTree(root).length, 5)
        assert.deepEqual(preorder(root, []), [
            [1, 0, 2, 0],
            [0, 0, 0, 1],
            [1, 1, 1, 1],
            [1, 1, 1, 2],
            [2, 2, 2, 1]
        ])
    })
})
