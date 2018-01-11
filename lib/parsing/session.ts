import ParsingNode from './parsingNode'
import Form from '../form/form'
import ParsingProvider from './parsingProvider'
import * as p from '../parseProgress/index'
import TreeOperation from './treeOperation'
import AssertError from '../assertError'

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

    // 返回null说明解析完毕, 否则返回的是下一个连接点
    private _findNextConnectiveNode(node: ParsingNode): ParsingNode {
        while (true) {
            if (!node) { return null }
            // 如果一个节点没有nextStep, 说明它的解析已经完毕, 不能再容纳节点了
            // 这时看看它的父亲节点搞定这次解析没
            if (node.progress.hasNextStep()) { return node }
            node = node.parent
        }
    }

    // insertAfterThis是breakTreeRoot的子节点, 因为insertedNode要插入到insertAfterThis的后面
    // 所以需要打散breakTreeRoot, 并返回重新组织的流浪节点
    private _rebuildVagrants(breakTreeRoot: ParsingNode, insertAfterThis: ParsingNode, insertedNode: ParsingNode) {
        let children = breakTreeRoot.breakChildren()
        children.push(null) // 方便尾节点建立空的链表联系

        // 建立流浪节点链表联系
        for (let i=0; i<children.length-1; i++) {
            let child = children[i]
            if (child === insertAfterThis) {
                child.nextVagrantNode = insertedNode
                insertedNode.nextVagrantNode = children[i+1]
            } else {
                child.nextVagrantNode = children[i+1]
            }
        }

        // 返回链表头部
        return children[0]
    }

    private _maintainAt(connectiveNode: ParsingNode, vagrantNode: ParsingNode) {
        if (!connectiveNode) { throw new Error(`connectiveNode should not be null`) }
        if (!vagrantNode) { throw new AssertError('vagrantNode should not be null') }

        while (true) {
            // 要找到固定树的最后一个连接节点
            connectiveNode = this._findNextConnectiveNode(connectiveNode)

            // 解析完毕, 流浪节点可能还有剩余
            if (!connectiveNode) {
                return {
                    nextConnectiveNode: null,
                    nextVagrantNode: vagrantNode
                }
            }

            // 流浪节点提前消耗完毕
            if (!vagrantNode) {
                return {
                    nextConnectiveNode: connectiveNode, // 不为空
                    nextVagrantNode: null
                }
            }

            // 进行该规则的下一步，流浪节点将根据该规则进行计算
            connectiveNode.progress.nextStep()

            // 返回指令
            let operation = connectiveNode.progress.consume(vagrantNode)
            console.info(`type: ${operation.type}`)

            // 按指令进行操作
            let { nextConnectiveNode, nextVagrantNode } = operation.do(connectiveNode, vagrantNode)

            // 匹配失败返回
            if (!nextConnectiveNode) {
                if (!nextVagrantNode) { throw new AssertError('nextVagrantNode can not be null') }
                return {
                    nextConnectiveNode: null,
                    nextVagrantNode // 不为空
                }
            }

            connectiveNode = nextConnectiveNode
            vagrantNode = nextVagrantNode
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

        let nextConnectiveNode = this._maintainAt(target, target.nextVagrantNode)
        target.nextVagrantNode = null
        return nextConnectiveNode
    }

    insertCharacterAfter(target: ParsingNode, ch: string) {
        if (!target.isTerminal) { throw new AssertError('target should be a terminal node') }

        let insertNode = new ParsingNode(ch)
        let insertAfterThis = ParsingProvider.leftMostAncestor(target)

        if (insertAfterThis.parent) { // 不是根
            let connective = insertAfterThis.parent
            let headVagrant = this._rebuildVagrants(connective, insertAfterThis, insertNode)

            connective.resetProgress() // 需要从首个choice开始尝试解析
            this._maintainAt(connective, headVagrant)
        } else {
            let keep = insertAfterThis.nextVagrantNode
            insertAfterThis.nextVagrantNode = insertNode
            insertNode.nextVagrantNode = keep

            // TODO 仍然需要maintain, 考虑zeroOrMore
        }

        // 返回最后这个terminal
        return insertNode
    }
}
