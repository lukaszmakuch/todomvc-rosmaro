import {
	typeHandler,
	defaultHandler,
	partialReturns,
	targetedActions,
	callChildren,
} from 'rosmaro-binding-utils';

export const makeHandler = handlerPlan =>
	targetedActions()(
		partialReturns(typeHandler({ defaultHandler })(handlerPlan))
	);

export const transparentHandler = makeHandler({});
