import ParsingNode from './parsingNode'
import Form from './form/form'
import * from './form/index'
import ParsingProvider from './parsing/parsingProvider'
import VerbatimParsing from './parsing/verbatimParsing'

// 术语：
// - 流浪指针(vagrant pointer)：指向最先的未被并入结构的节点
// - 连接指针(connective pointer): 指向最后的结构化的节点
// - 固定树:
// - 泛型: Form

export default class Session {
    private _startNode: ParsingNode
    private _endNode: ParsingNode
    private _parsing: VerbatimParsing = VerbatimParsing

    //=====================================================================================
    // 主要指令
    //=====================================================================================

    private _consume(connective: ParsingNode, vagrant: ParsingNode) {
        if (typeof vagrant.form != 'string') { throw new Error('impossible typeof vagrant.form != "string"') }
        connective.add(vagrant) // 添加子节点
        return {
            nextConnectiveNode: connective, // 仍有可能未终结
            nextVagrantNode: vagrant.nextVagrantNode // 移进
        }
    }

    private _descend(connective: ParsingNode, vagrant: ParsingNode, generate: ParsingNode) {
        connective.add(generate)
        return {
            nextConnectiveNode: generate, // 推进到子节点
            nextVagrantNode: vagrant
        }
    }

    // private _break(connective: ParsingNode, vagrant: ParsingNode) {
    //     if (vagrant.children.length == 0) { throw new Error('impossible undecided.children.length == 0') }
    //     let nextUnboundNode = vagrant.nextVagrantNode
    //     let children = vagrant.children
    //     vagrant.seperateAtRoot() // now, undecided node can gc
    //     for (let i = 0; i<children.length - 1; i++) {
    //         children[i].nextVagrantNode = children[i + 1]
    //     }
    //     children[children.length - 1].nextVagrantNode = nextUnboundNode
    //     return {
    //         nextConnectiveNode: connective,
    //         nextVagrantNode: children[0]
    //     }
    // }

    // 一旦当前form匹配失败就需要选择下一个choice
    // 若下一个choice也失败, 则需要parent选择下一个choice, 如此直到根节点
    private _back(connective: ParsingNode, vagrant: ParsingNode) {
        if (typeof vagrant.form != 'string') { throw new Error("impossible: typeof vagrant.form != 'string'") }

        while (true) {
            if (connective == null) {
                return {
                    nextConnectiveNode: null,
                    nextVagrantNode: null
                }
            }

            if (connective.progress.nextChoice()) {
                if (connective.nextVagrantNode) { throw new Error("impossible: progress.nextVagrantNode exist") }
                let provider = new ParsingProvider(connective)
                provider.breakdownMainTree()

                return {
                    nextConnectiveNode: connective,
                    nextVagrantNode: null
                }
            }

            connective = connective.parent
        }
    }




    //=====================================================================================
    // 主要操作
    //=====================================================================================
    private _parse(connectiveForm: Form, vagrantForm: Form): any {
        if (connectiveForm instanceof Chunk) {
            this._parsing.chunk(connectiveForm, vagrantForm) // in fact is a string
        } else if (connectiveForm instanceof Sequence) {
            this._parsing.chunk(sequence, vagrantForm) // in fact is a string
        } else {
            console.error(connectiveForm)
            throw new Error(`do not support connectiveForm`)
        }
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
        while (true) {
            // 要找到固定树的最后一个连接节点
            connectiveNode = this._findConnectiveNode(connectiveNode)

            // 解析完毕(利用结尾哨兵保证此时一定是解析完毕状态)
            // assertTrue(this._parsingStack.isEmpty())
            if (!connectiveNode) { return }

            // 找到最近的第一个流浪节点，一定刚好就是nextVagrantNode
            let vagrantNode = connectiveNode.nextVagrantNode

            // 进行该规则的下一步，流浪节点将根据该规则进行计算
            connectiveNode.progress.nextStep()

            // 比较连接节点和流浪节点的泛型即可确定指令
            let { type, value } = this._parse(connectiveNode.form as Form, vagrantNode.form)

            // 按指令进行操作
            switch (type) {
                case 'consume':
                    this._consume(connectiveNode, vagrantNode)
                case 'descend':
                    this._descend(connectiveNode, vagrantNode, value)
                case 'back':
                    this._back(connectiveNode, vagrantNode)
                case 'break':
                    this._break(connectiveNode, vagrantNode)
                default:
                    throw new Error(`do not support type=${type}`)
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
            target.breakRightRelative()
        }

        this._maintainAt(target)
    }
}


// // 移植失败
// if (unboundNode.hasNoChildren()) { // 终结符
//     this._nextChoice() // 可能导致progressNode为null
// } else { // 非终结符
//     let fallbackNodes = unboundNode.seperateLeafs()
//     this._parsingStack.push(...fallbackNodes.reverse())
// }
