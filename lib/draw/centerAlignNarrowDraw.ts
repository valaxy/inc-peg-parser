import ParsingNode from '../parsing/parsingNode'
import NodeInfo from './nodeInfo'

let indexCounter = 0

interface ExtendParsingNode extends ParsingNode {
    index: number
    status: number
    deep: number
    left: number
    right: number
    info: NodeInfo
    parent: ExtendParsingNode
    children: ExtendParsingNode[]
}



const getIndex = function(node: ExtendParsingNode) {
    if (node) {
        return node.index
    }
    return null
}


const assignData = function(node: ExtendParsingNode, deep: number) {
    node.index = indexCounter++
    node.status = -1
    node.deep = deep
}


const getNext = function(next: number[], deep: number) {
    if (next[deep] === undefined) {
        return next[deep] = 0
    }

    return next[deep] += 1
}

/** 紧凑的居中绘制 */

// 先序遍历
export default function(root: ParsingNode): NodeInfo[] {
    let current = root as ExtendParsingNode
    let next = []
    let nodeInfos = []
    assignData(current, 0)
    while (current) {
        if (current.status == -1) { // -1表示处理自己
            current.info = new NodeInfo(getIndex(current), getIndex(current.parent), getNext(next, current.deep), current.deep, current.toName())
            nodeInfos.push(current.info)
            current.children.forEach(child => {
                assignData(child, current.deep + 1)
            })
            current.status = 0
        } else if (current.status < current.children.length) { // 否则表示处理子节点
            current.status += 1
            current = current.children[current.status - 1]
        } else { // 处理完毕, 回溯
            current.left = current.right = current.info.x
            current.children.forEach(child => {
                current.left = Math.min(current.left, child.left)
                current.right = Math.max(current.right, child.right)
            })
            current.info.x = Math.floor((current.left + current.right) / 2)
            current = current.parent
        }
    }

    return nodeInfos
}
