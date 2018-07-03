export default (state = [{}], action) => {
  switch (action.type) {
    case "SET_GROUPS":
      return action.groups;
    case "ADD_GROUP":
      return [...state, action.group];
    case "LOGOUT":
      return [];
    default:
      return state;
  }
};
