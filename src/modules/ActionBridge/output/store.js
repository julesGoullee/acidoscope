import Output from './index';

class StoreOutput extends Output {
  constructor(dispatch) {
    super();
    this.on('event', outputEvent => {
      dispatch(outputEvent.actionName, outputEvent.actionData);
    })
  }

  static action(actionName, actionData) {
    return {
      actionName,
      actionData,
    }
  }
}

export default StoreOutput;
