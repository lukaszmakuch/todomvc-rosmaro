import {fireEvent} from 'snabbdom-testing-library';

export default ({expectedValue}) => ({testContext}) => ({
  feed: {type: 'RENDER'},
  consume: ({result}) => {
    const {getByPlaceholderText} = testContext.render(result.data);
    const input = getByPlaceholderText('What needs to be done?');
    expect(input.value).toEqual(expectedValue);
  }
});