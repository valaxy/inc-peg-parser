import React = require('react')
import ReactDom = require('react-dom')
import sigma = require('sigma')
import drawParsingTree from './drawParsingTree'
import ParsingNode from '../parsingNode'
require('./index.scss')

const createNode = function(symbol = '@', children = []) {
    let node: any = new ParsingNode(symbol, false)
    node._children = children
    children.forEach(child => child._parent = node)
    return node
}

class Main extends React.Component {
    private _container

    componentDidMount() {
        let container = new sigma(this._container)
        let root = createNode('a', [
            createNode('b'),
            createNode('c', [
                createNode('d'),
                createNode('e')
            ]),
            createNode('f')
        ])

        let positions = drawParsingTree(root)
        positions.forEach((node) => {
            let position = node._position
            container.graph.addNode({
                id: `n${position.index}`,
                label: position.index,
                x: position.root,
                y: position.deep,
                size: 1,
                color: '#f00'
            })
        })

        positions.forEach((node, index) => {
            let position = node._position
            if (position.parentIndex !== null) {
                container.graph.addEdge({
                    id: `e${index}`,
                    source: `n${position.parentIndex}`,
                    target: `n${position.index}`
                })
           }
        })

        container.refresh();
    }

    render() {
        return (
            <div className="canvas" ref={_ => this._container = _}>
            </div>
        )
    }
}


ReactDom.render(<Main />, document.querySelector('.everything'))
