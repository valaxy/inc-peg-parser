import TreeOperation from './treeOperation'
import ParsingNode from './parsingNode'
import PointTransfer from './pointTransfer'
import ParsingProvider from './parsingProvider'
import AssertError from '../assertError'


// 移除当前流浪节点，并重新组织流浪节点关系
export default class BreakOperation extends TreeOperation {
    get type() { return 'break' }

    do(connective: ParsingNode, vagrant: ParsingNode) {
        if (vagrant.isTerminal) { throw new AssertError('vagrant can not be terminal node') }

        // 保留下一个流浪节点，因为打散当前流浪节点结构之后，需要重新组织流浪节点关系
        let keepNextVagrant = vagrant.nextVagrantNode

        // 移除当前流浪节点，保留子节点，打散之后需要重新组织关系
        // vagrant节点可以gc了
        let keepChildren = vagrant.breakChildren()

        // 重新组织流浪节点的链表关系
        for (let i = 0; i<keepChildren.length - 1; i++) {
            keepChildren[i].nextVagrantNode = keepChildren[i + 1]
        }
        keepChildren[keepChildren.length - 1].nextVagrantNode = keepNextVagrant

        return {
            nextConnectiveNode: connective,  // 连接节点不变
            nextVagrantNode: keepChildren[0] // 由流浪节点的第一个子节点作为新的流浪节点
        }
    }
}
