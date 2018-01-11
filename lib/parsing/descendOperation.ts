import TreeOperation from './treeOperation'
import ParsingNode from './parsingNode'
import PointTransfer from './pointTransfer'
import ParsingProvider from './parsingProvider'
import AssertError from '../assertError'


// 创建父子关系，保持流浪指针
export default class DescendOperation extends TreeOperation {
    constructor(private _generate: ParsingNode) {
        super()
    }

    get type() { return 'descend' }

    do(connective: ParsingNode, vagrant: ParsingNode): PointTransfer {
        connective.add(this._generate)
        return {
            nextConnectiveNode: this._generate, // 关注点放到子节点
            nextVagrantNode: vagrant            // 流浪节点不变
        }
    }
}
