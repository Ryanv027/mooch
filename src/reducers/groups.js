export default (state = [], action) => {
  switch (action.type) {
    case "SET_GROUPS":
      return [...state, action.groups];
    default:
      return state;
  }
};
