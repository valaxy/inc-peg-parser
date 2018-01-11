import TreeOperation from './treeOperation'
import ParsingNode from './parsingNode'
import PointTransfer from './pointTransfer'
import ParsingProvider from './parsingProvider'
import AssertError from '../assertError'
import VagrantLinked from './vagrantLinked'

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
                    nextConnectiveNode: null, // 失败的协议, nextConnectiveNode为nulll
                    nextVagrantNode: vagrant
                }
            }

            // 不管怎么样, 需要先移除当前连接节点, 并还原吃掉的vagrant
            let children = connective.breakChildren()
            if (children.length > 0) {
                children.splice(children.length - 1, 1) // 最后一个child一定是无效节点, 需要从链表里移除
            }
            vagrant = VagrantLinked.connect(children, vagrant)

            // nextChoice生效, 以当前choice继续进行解析
            if (connective.progress.nextChoice()) {
                return {
                    nextConnectiveNode: connective, // 连接节点不变
                    nextVagrantNode: vagrant        // 流浪节点是重新构建链表中的第一个节点
                }
            }

            // 需要parent选择nextChoice, 如此直到根节点
            connective = connective.parent
        }
    }
}
