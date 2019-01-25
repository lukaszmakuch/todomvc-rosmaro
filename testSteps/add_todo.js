import typeInNewTodo from '~/testSteps/type_in_new_todo';
import enterInNewTodoInput from '~/testSteps/enter_in_new_todo_input';

export default ({ value }) => [typeInNewTodo({ value }), enterInNewTodoInput];
