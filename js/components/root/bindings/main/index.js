import {callChildren, initialValueLens} from 'rosmaro-binding-utils';
import {h} from '~/js/utils/vdom';
import {makeHandler} from '~/js/utils/handlers';

export default () => ({

  lens: () => initialValueLens({}),

  handler: makeHandler({

    RENDER: ({context, action, children}) => {
      const childrenResult = callChildren({context, action, children});
      const layout = childrenResult.result.Layout.data;
      const newTodoForm = childrenResult.result.Components.data.NewTodoForm.data;
      const list = childrenResult.result.Components.data.List.data;
      const controls = childrenResult.result.Components.data.Controls.data;
      return layout({newTodoForm, list, controls});
    }
  
  })
});