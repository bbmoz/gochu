// $FlowFixMe
import cytoscape from 'cytoscape'

const config = {
  container: document.querySelector('main'),

  layout: {
    name: 'breadthfirst',
    directed: true,
    padding: 10
  },

  style: cytoscape.stylesheet()
    .selector('node')
      .css({
        'height': 50,
        'width': 50,
        'content': 'data(id)',
        'text-valign': 'center',
        'text-outline-width': 1,
        'text-outline-color': 'palegreen',
        'background-color': 'palegreen',
        'color': 'black'
      })
    .selector(':selected')
      .css({
        'border-width': 3,
        'border-color': '#333'
      })
    .selector('edge')
      .css({
        'width': 7,
        'curve-style': 'bezier',
        'target-arrow-shape': 'triangle',
        'target-arrow-color': 'lightskyblue',
        'line-color': 'lightskyblue'
      }),

  elements: {
    nodes: [],
    edges: []
  }
}

export default config
