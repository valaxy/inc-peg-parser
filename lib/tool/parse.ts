import { Form } from '../form/index'
import ParsingNode from '../parsing/parsingNode'
import Session from '../parsing/session'
import verbatimParsing from '../parsing/verbatimParsing'


// 创建游离节点链表
const createVagrantLinked = function(text) {
    let nodes = text.split('').map(ch => new ParsingNode(ch))
    for (let i=1; i<nodes.length; i++) {
        nodes[i-1].nextVagrant = nodes[i]
    }
    return [nodes[0], nodes[nodes.length-1]]
}


/** 一次性使用解析生成解析树 */
export default function(form: Form, text: string): ParsingNode {
    let session = new Session(verbatimParsing)
    let root = new ParsingNode(form)
    let [vagrantStart, vagrantEnd] = createVagrantLinked(text)
    session.insertAfter(root, vagrantStart, vagrantEnd)
    return root
}
