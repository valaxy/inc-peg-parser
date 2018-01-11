import ParsingNode from './parsingNode'

export default class VagrantLinked {
    static connect(nodes: ParsingNode[], head: ParsingNode) {
        if (nodes.length == 0) { return head }
        for (let i = 0; i<nodes.length - 1; i++) {
            nodes[i].nextVagrantNode = nodes[i + 1]
        }
        nodes[nodes.length - 1].nextVagrantNode = head
        return nodes[0]
    }
}
