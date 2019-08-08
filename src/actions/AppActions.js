import AppDispatcher from "../dispatcher/AppDispatcher.js";
import ActionTypes from '../constants/AppConstants';

class AppActions {
	connect() {
		AppDispatcher.dispatch({
			type: ActionTypes.CONNECT
		});
	}

	disconnect() {
		AppDispatcher.dispatch({
			type: ActionTypes.DISCONNECT
		});
	}
}

export default new AppActions();
