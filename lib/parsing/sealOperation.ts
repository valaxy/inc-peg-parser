import TreeOperation from './treeOperation'
import ParsingNode from './parsingNode'
import PointTransfer from './pointTransfer'
import ParsingProvider from './parsingProvider'
import AssertError from '../assertError'


export default class SealOperation extends TreeOperation {
    get type() { return 'seal' }

    // 不用添加任何关系, 直接以成功构造状态返回
    do(connective: ParsingNode, vagrant: ParsingNode): PointTransfer {
        return null
    }
}
