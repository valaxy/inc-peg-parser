import ParsingNode from '../../lib/parsing/parsingNode'
import { Form } from '../../lib/form/index'
import { assert } from 'chai'

export const isNodePropertyEqual = function(n1: ParsingNode, n2: ParsingNode): boolean {
    if (n1.isTerminal && n2.isTerminal && n1.character == n2.character) { return true }
    if (!n1.isTerminal && !n2.isTerminal && n1.form == n2.form) { return true }
    return false
}

export const checkTreeEqual = function(root1: ParsingNode, root2: ParsingNode) {
    assert.isOk(isNodePropertyEqual(root1, root2))
    assert.equal(root1.children.length, root2.children.length)
    for (let i=0; i<root1.children.length; i++) {
        checkTreeEqual(root1.children[i], root2.children[i])
    }
}

export const createTree = function(descriptor: any): ParsingNode {
    let [form, children] = descriptor
    let n = new ParsingNode(form)
    if (children) {
        for (let childDescriptor of children) {
            n.children.push(this.createTree(childDescriptor))
        }
    }
    return n
}


export const checkOperationResult = function(result, connective, vagrant) {
    assert.deepEqual(result, {
        nextConnectiveNode: connective,
        nextVagrantNode: vagrant
    })
}
