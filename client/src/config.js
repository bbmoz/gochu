import cytoscape from 'cytoscape'

const config = {
  container: document.querySelector('main'),

  layout: {
    name: 'cose',
    directed: true,
    padding: 10
  },

  style: cytoscape.stylesheet()
    .selector('node')
      .css({
        'content': 'data(id)',
        'text-valign': 'center',
        'text-outline-width': 2,
        'text-outline-color': '#000',
        'background-color': '#000',
        'color': '#fff'
      })
    .selector(':selected')
      .css({
        'border-width': 3,
        'border-color': '#333'
      })
    .selector('edge')
      .css({
        'curve-style': 'bezier',
        'width': 4,
        'target-arrow-shape': 'triangle',
        'target-arrow-color': '#ddd',
        'line-color': '#ddd',
      }),

      elements: {
        nodes: [],
        edges: []
      }
}

export default config
