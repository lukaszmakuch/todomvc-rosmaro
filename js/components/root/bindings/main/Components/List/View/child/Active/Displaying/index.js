import { makeBinding, RENDER, MARK_COMPLETED } from './../../lib/displaying';

export default makeBinding({
	RENDER: RENDER({ classes: [], checked: false }),

	TOGGLE: MARK_COMPLETED,

	spread: { MARK_COMPLETED },
});
