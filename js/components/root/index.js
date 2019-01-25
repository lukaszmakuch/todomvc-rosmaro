import graph from './graph.json';
import makeBindings from './bindings';

export default opts => ({
	graph,
	bindings: makeBindings(opts),
});
