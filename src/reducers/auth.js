export default (state = { userName: "" }, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        userName: action.user.userName
      };
    case "LOGOUT":
      return {};
    default:
      return state;
  }
};
