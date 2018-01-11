import TreeOperation from './treeOperation'
import ParsingNode from './parsingNode'
import PointTransfer from './pointTransfer'
import ParsingProvider from './parsingProvider'
import AssertError from '../assertError'


// 创建父子关系，移进流浪指针
export default class ConnectOperation extends TreeOperation {
    get type() { return 'connect' }

    do(connective: ParsingNode, vagrant: ParsingNode): PointTransfer {
        if (!vagrant.isTerminal) { throw new Error('vagrant should be terminal') }
        connective.add(vagrant) // 添加子节点
        let result = {
            nextConnectiveNode: connective,          // 连接节点不变, 因为当前连接节点仍有可能继续链接子节点
            nextVagrantNode: vagrant.nextVagrantNode // 切换流浪节点, 因为当前流浪节点已经处理完毕(有可能为null)
        }
        vagrant.nextVagrantNode = null
        return result
    }
}
