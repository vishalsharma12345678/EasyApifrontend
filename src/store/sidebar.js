// reducers/sidebarReducer.js
import { TOGGLE_SIDEBAR } from "../action/sidebarAction";

const initialState = {
  collapsed: true,
};

const sidebar = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_SIDEBAR:
      return {
        ...state,
        collapsed: !state.collapsed,
      };
    default:
      return state;
  }
};

export default sidebar;
