import ParsingNode from './parsingNode'
import Form from '../form/form'
import ParsingProvider from './parsingProvider'
import * as p from '../parseProgress/index'
import TreeOperation from './treeOperation'

// 术语解释：
// - 流浪指针(vagrant pointer)：指向最先的未被并入结构的节点
// - 连接指针(connective pointer): 指向最后的结构化的节点
// - 固定树:
// - 泛型: Form
// - 移进：解析下一个字符
// - 保持：仍然解析当前字符
// - 绑定：将字符绑定到节点


interface StateTransfter {
    nextConnectiveNode: ParsingNode,
    nextVagrantNode: ParsingNode
}

export default class Session {
    private _startNode: ParsingNode
    private _endNode: ParsingNode



    private _parse(connective: p.ParseProgress, vagrant: ParsingNode): TreeOperation {
        let operation = connective.consume(vagrant)
        return operation
    }

    private _findConnectiveNode(node: ParsingNode) {
        while (true) {
            if (node == null) { return null }
            // 如果一个节点不能进行下一步, 说明它不能再也不能容纳任何一个节点
            // 这时看看它的父亲节点
            if (node.progress.hasNextStep()) { return node }
            node = node.parent
        }
    }

    private _maintainAt(connectiveNode: ParsingNode) {
        if (!connectiveNode) { throw new Error(`connectiveNode should not be null`) }

        // 找到最近的第一个流浪节点，一定刚好就是nextVagrantNode
        let vagrantNode = connectiveNode.nextVagrantNode

        while (true) {
            // 要找到固定树的最后一个连接节点
            let bakup = connectiveNode
            connectiveNode = this._findConnectiveNode(connectiveNode)

            // 解析完毕(利用结尾哨兵保证此时一定是解析完毕状态)
            // assertTrue(this._parsingStack.isEmpty())
            if (!connectiveNode) { return bakup } // 正常返回最后一个处理过的
            if (!vagrantNode) { return connectiveNode }

            // 进行该规则的下一步，流浪节点将根据该规则进行计算
            connectiveNode.progress.nextStep()

            // 比较连接节点和流浪节点的泛型即可确定指令
            let operation = this._parse(connectiveNode.progress, vagrantNode)
            console.info(`type: ${operation.type}`)

            // 按指令进行操作
            let result = operation.do(connectiveNode, vagrantNode)

            // 所有方案全部失败
            if (!result.nextConnectiveNode) {
                return null // 失败返回
            }

            connectiveNode = result.nextConnectiveNode

            if (result.nextVagrantNode !== undefined) {
                vagrantNode = result.nextVagrantNode
            }
        }
    }

    /**
     * insert a range of symbols after `target`
     * start: first symbol
     * end: last symbol
     */
    insertAfter(target: ParsingNode, start: ParsingNode, end: ParsingNode) {
        if (target.nextVagrantNode) {
            end.nextVagrantNode = target.nextVagrantNode
            target.nextVagrantNode = start
        } else {
            target.nextVagrantNode = start
            // target.breakRightRelative()
        }

        let nextConnectiveNode = this._maintainAt(target)
        target.nextVagrantNode = null
        return nextConnectiveNode
    }
}


// switch (type) {
//     case 'consume':
//         result = this._consume(connectiveNode, vagrantNode)
//         break
//     case 'descend':
//         result = this._descend(connectiveNode, vagrantNode, value)
//         break
//     case 'back':
//         result = this._back(connectiveNode, vagrantNode)
//         break
//     case 'break':
//         result = this._break(connectiveNode, vagrantNode)
//         break
//     case 'seal':
//         result = this._seal(connectiveNode, vagrantNode)
//         break
//     default:
//         throw new Error(`do not support type=${type}`)
// }


// // 移植失败
// if (unboundNode.hasNoChildren()) { // 终结符
//     this._nextChoice() // 可能导致progressNode为null
// } else { // 非终结符
//     let fallbackNodes = unboundNode.seperateLeafs()
//     this._parsingStack.push(...fallbackNodes.reverse())
// }

// private _parse(connective: p.ParseProgress, vagrant: ParsingNode): ParsingDirectiveReturn {
//     let name
//     if (connective instanceof p.ChunkProgress) {
//         name = 'chunk'
//     } else if (connective instanceof p.SequenceProgress) {
//         name = 'sequence'
//     } else if (connective instanceof p.ChoiceProgress) {
//         name = 'choice'
//     } else if (connective instanceof p.RuleProgress) {
//         name = 'rule'
//     } else if (connective instanceof p.OneOrMoreProgress) {
//         name = 'oneOrMore'
//     } else if (connective instanceof p.ZeorOrMoreProgress) {
//         name = 'zeroOrMore'
//     } else if (connective instanceof p.RangeOfProgress) {
//         name = 'rangeOf'
//     } else {
//         console.error(connective)
//         throw new Error(`do not support this typeof connective`)
//     }
//
//     return this._parsing[name](connective, vagrant)
// }
