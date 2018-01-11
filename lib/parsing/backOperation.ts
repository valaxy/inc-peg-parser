import TreeOperation from './treeOperation'
import ParsingNode from './parsingNode'
import PointTransfer from './pointTransfer'
import ParsingProvider from './parsingProvider'
import AssertError from '../assertError'


/**
 * 回溯选择下一个连接点位
 */
export default class BackOperation extends TreeOperation {
    get type() { return 'back' }

    do(connective: ParsingNode, vagrant: ParsingNode): PointTransfer {
        if (!vagrant.isTerminal) { throw new AssertError("vagrant should be a terminal node") }
        if (!connective) { throw new AssertError("connective can not be null") }

        while (true) {
            // 已经回溯到根节点的nextChoice还是失败, 匹配已经彻底没戏了
            if (!connective) {
                return {
                    nextConnectiveNode: null, // 失败的固定协议: 双null
                    nextVagrantNode: null
                }
            }

            // nextChoice生效, 以当前choice继续进行解析
            if (connective.progress.nextChoice()) {
                if (connective.nextVagrantNode) { throw new AssertError("impossible: progress.nextVagrantNode exist") }
                let provider = new ParsingProvider(connective)
                provider.breakdownMainTree()

                return {
                    nextConnectiveNode: connective, // 连接节点不变
                    nextVagrantNode: vagrant        // 流浪节点不变
                }
            }

            // nextChoice失败, 则需要parent选择下一个choice, 如此直到根节点
            connective = connective.parent
        }
    }
}
