import typeInNewTodo from '~/testSteps/type_in_new_todo';
import addTypedInTodo from '~/testSteps/add_typed_in_todo';

export default ({value}) => ([

  typeInNewTodo({value}),

  addTypedInTodo,

]);