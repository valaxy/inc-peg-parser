import TreeOperation from './treeOperation'
import ParsingNode from './parsingNode'
import PointTransfer from './pointTransfer'
import ParsingProvider from './parsingProvider'
import AssertError from '../assertError'


export default class SealOperation extends TreeOperation {
    get type() { return 'seal' }

    // 不用添加任何关系, 直接以成功构造状态返回
    do(connective: ParsingNode, vagrant: ParsingNode): PointTransfer {
        if (connective.progress.hasNextStep()) { throw new Error('connective can not has next step') }

        // 虽然当前连接节点已经没有更多的步骤了, 但是不要直接回到父亲节点, 因为有可能为null
        // 交给上层去处理更好
        return {
            nextConnectiveNode: connective,
            nextVagrantNode: vagrant        // 匹配的是空字符串, 因此流浪节点不变
        }
    }
}
