import ParsingNode from '../parsingNode'
import NodePosition from './nodePosition'

interface ExtendParsingNode extends ParsingNode {
    _position: NodePosition
}

const findRightmost = function(root: ParsingNode, maxDeep: number) {
    for (let i=0; i<maxDeep; i++) {
        if (root.hasChild()) {
            root = root.lastChild()
        } else {
            return root
        }
    }

    return root
}

const getLeftNode = function(node: ParsingNode): ParsingNode {
    let offset = 0
    while (true) {
        if (!node.isFirstChild()) {
            let i = node.findIndex()
            return node.parent.children[i - 1]
        }

        if (offset > 0) {
            let i = node.findIndex()
            return findRightmost(node.parent.children[i - 1], offset)
        }

        node = node.parent
        offset += 1
        if (!node.hasParent()) {
            return null
        }
    }
}

const calcPosition = function(node: ExtendParsingNode, nodes: ParsingNode[], deep: number): NodePosition {
    if (node._position) {
        return node._position
    }

    let position
    if (node.hasChild()) {
        let leftChildPosition = calcPosition(node.firstChild() as ExtendParsingNode, nodes, deep + 1)
        let rightChildPosition = calcPosition(node.lastChild() as ExtendParsingNode, nodes, deep + 1)
        position = NodePosition.parentInMiddle(leftChildPosition, rightChildPosition, deep, node)
        // console.log(node.form, leftChildPosition.toArray(), rightChildPosition.toArray(), position.toArray())
    } else if (node.hasParent()) { // no child && has parent
        let leftNode = getLeftNode(node) as ExtendParsingNode
        if (leftNode) {
            let leftNodePosition = calcPosition(leftNode, nodes, deep)
            position = NodePosition.right(leftNodePosition, deep, node)
        } else {
            position = NodePosition.random(deep, node)
        }
    } else { // no child && no parent (ralely happen)
        position = NodePosition.random(deep, node)
    }

    node._position = position
    nodes.push(node)
    return node._position
}


export default function(root: ParsingNode) {
    let nodes = []
    calcPosition(root as ExtendParsingNode, nodes, 0)
    return nodes
}
