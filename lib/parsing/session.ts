import ParsingNode from './parsingNode'
import Form from '../form/form'
import ParsingProvider from './parsingProvider'
import * as p from '../parseProgress/index'
import { ParsingDirective, ParsingDirectiveReturn } from './parsing'


// 术语解释：
// - 流浪指针(vagrant pointer)：指向最先的未被并入结构的节点
// - 连接指针(connective pointer): 指向最后的结构化的节点
// - 固定树:
// - 泛型: Form
// - 移进：解析下一个字符
// - 保持：仍然解析当前字符
// - 绑定：将字符绑定到节点

export default class Session {
    private _startNode: ParsingNode
    private _endNode: ParsingNode

    constructor(private _parsing: ParsingDirective) { }

    //=====================================================================================
    // 主要指令
    //=====================================================================================

    // 创建父子关系，移进流浪指针
    private _consume(connective: ParsingNode, vagrant: ParsingNode) {
        if (!vagrant.isTerminal) { throw new Error('vagrant should be terminal') }
        connective.add(vagrant) // 添加子节点
        return {
            nextConnectiveNode: connective,          // 当前连接节点仍有可能继续链接子节点
            nextVagrantNode: vagrant.nextVagrantNode // 当前流浪节点已经处理完了，切换到下一个
        }
    }

    // 创建父子关系，保持流浪指针
    private _descend(connective: ParsingNode, vagrant: ParsingNode, generate: ParsingNode) {
        connective.add(generate)
        return {
            nextConnectiveNode: generate, // 关注点放到子节点
            nextVagrantNode: undefined    // 流浪节点不变
        }
    }

    // 移除当前流浪节点，并重新组织流浪节点关系
    private _break(connective: ParsingNode, vagrant: ParsingNode) {
        if (vagrant.children.length == 0) { throw new Error('impossible vagrant.children.length == 0') } // TODO 应该支持children为空的情况??

        // 保留下一个流浪节点，因为打散当前流浪节点结构之后，需要重新组织节点关系
        let nextVagrant = vagrant.nextVagrantNode

        // 保留子节点，打散之后需要重新组织关系
        let children = vagrant.children

        // 移除当前流浪节点，该节点可以gc了
        vagrant.seperateAtRoot()

        // 重新组织链表关系
        for (let i = 0; i<children.length - 1; i++) {
            children[i].nextVagrantNode = children[i + 1]
        }
        children[children.length - 1].nextVagrantNode = nextVagrant

        return {
            nextConnectiveNode: connective, // 连接节点不变
            nextVagrantNode: children[0]    // 由流浪节点的第一个子节点作为新的流浪节点
        }
    }


    // 一旦当前form匹配失败就需要选择下一个choice
    // 若下一个choice也失败, 则需要parent选择下一个choice, 如此直到根节点
    private _back(connective: ParsingNode, vagrant: ParsingNode) {
        if (!vagrant.isTerminal) { throw new Error("vagrant should be a terminal") }

        while (true) {
            if (connective == null) {
                return {
                    nextConnectiveNode: null, // 所有方案全部失败了
                    nextVagrantNode: null
                }
            }

            if (connective.progress.nextChoice()) {
                if (connective.nextVagrantNode) { throw new Error("impossible: progress.nextVagrantNode exist") }
                let provider = new ParsingProvider(connective)
                provider.breakdownMainTree()

                return {
                    nextConnectiveNode: connective, // 连接节点不变
                    nextVagrantNode: undefined      // 流浪节点不变
                }
            }

            connective = connective.parent
        }
    }




    //=====================================================================================
    // 主要操作
    //=====================================================================================
    private _parse(connective: p.ParseProgress, vagrant: ParsingNode): ParsingDirectiveReturn {
        let name
        if (connective instanceof p.ChunkProgress) {
            name = 'chunk'
        } else if (connective instanceof p.SequenceProgress) {
            name = 'sequence'
        } else if (connective instanceof p.ChoiceProgress) {
            name = 'choice'
        } else if (connective instanceof p.RuleProgress) {
            name = 'rule'
        } else if (connective instanceof p.OneOrMoreProgress) {
            name = 'oneOrMore'
        } else if (connective instanceof p.ZeorOrMoreProgress) {
            name = 'zeroOrMore'
        } else if (connective instanceof p.RangeOfProgress) {
            name = 'rangeOf'
        } else {
            console.error(connective)
            throw new Error(`do not support this typeof connective`)
        }

        return this._parsing[name](connective, vagrant)
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
            let { type, value } = this._parse(connectiveNode.progress, vagrantNode)
            console.info(`type: ${type}`)

            // 按指令进行操作
            let result
            switch (type) {
                case 'consume':
                    result = this._consume(connectiveNode, vagrantNode)
                    break
                case 'descend':
                    result = this._descend(connectiveNode, vagrantNode, value)
                    break
                case 'back':
                    result = this._back(connectiveNode, vagrantNode)
                    break
                case 'break':
                    result = this._break(connectiveNode, vagrantNode)
                    break
                default:
                    throw new Error(`do not support type=${type}`)
            }

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

        console.log(target.nextVagrantNode.toName())
        let nextConnectiveNode = this._maintainAt(target)
        target.nextVagrantNode = null
        return nextConnectiveNode
    }
}


// // 移植失败
// if (unboundNode.hasNoChildren()) { // 终结符
//     this._nextChoice() // 可能导致progressNode为null
// } else { // 非终结符
//     let fallbackNodes = unboundNode.seperateLeafs()
//     this._parsingStack.push(...fallbackNodes.reverse())
// }
