import { callChildren } from '~/js/utils/handlers';
import { h } from '~/js/utils/vdom';
import { map, prop } from 'ramda';
import { makeHandler } from '~/js/utils/handlers';

const selectedButton = ({ path, name }) =>
  h('li', h('a.selected', { props: { href: path } }, name));

const notSelectedButton = ({ path, name }) =>
  h('li', h('a', { props: { href: path } }, name));

const pairOfButtons = ({ path, name }) => ({
  selected: selectedButton({ path, name }),
  notSelected: notSelectedButton({ path, name }),
});

export const allTodosButton = pairOfButtons({ path: '#/', name: 'All' });

export const completedTodosButton = pairOfButtons({
  path: '#/completed',
  name: 'Completed',
});

export const activeTodosButton = pairOfButtons({
  path: '#/active',
  name: 'Active',
});

export const makeBinding = ({
  selected,
  buttons: { allTodosButton, completedTodosButton, activeTodosButton },
}) => () => ({
  handler: makeHandler({
    NAVIGATE_TO_ALL: () => ({ arrow: 'navigated to all' }),
    NAVIGATE_TO_COMPLETED: () => ({ arrow: 'navigated to completed' }),
    NAVIGATE_TO_ACTIVE: () => ({ arrow: 'navigated to active' }),

    RENDER: ({ context, action, children }) => ({
      ui: h('ul.filters', [
        allTodosButton,
        completedTodosButton,
        activeTodosButton,
      ]),
      selectTodos: map(prop(selected)),
    }),
  }),
});
