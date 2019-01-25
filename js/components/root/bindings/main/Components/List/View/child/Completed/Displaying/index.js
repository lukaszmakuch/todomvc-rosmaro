import {
	makeBinding,
	RENDER,
	MARK_NOT_COMPLETED,
} from './../../lib/displaying';

export default makeBinding({
	RENDER: RENDER({ classes: { completed: true }, checked: true }),

	TOGGLE: MARK_NOT_COMPLETED,

	spread: { MARK_NOT_COMPLETED },
});
