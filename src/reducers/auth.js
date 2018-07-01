export default (state = { userName: "" }, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        userID: action.user.userID
      };
    case "LOGOUT":
      return {};
    default:
      return state;
  }
};
