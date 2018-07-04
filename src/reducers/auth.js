export default (state = { userName: "" }, action) => {
  switch (action.type) {
    case "LOGIN":
      return action.user;
    case "LOGOUT":
      return {};
    default:
      return state;
  }
};
