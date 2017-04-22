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
        'height': 40,
        'width': 40,
        'content': 'data(id)',
        'text-valign': 'center',
        'text-outline-width': 2,
        'text-outline-color': 'black',
        'background-color': 'black',
        'color': 'white'
      })
    .selector(':selected')
      .css({
        'border-width': 3,
        'border-color': '#333'
      })
    .selector('edge')
      .css({
        'width': 6,
        'curve-style': 'bezier',
        'target-arrow-shape': 'triangle',
        'target-arrow-color': 'dodgerblue',
        'line-color': 'dodgerblue',
      }),

      elements: {
        nodes: [],
        edges: []
      }
}

export default config
