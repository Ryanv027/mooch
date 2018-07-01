export const login = id => ({
  type: "LOGIN",
  user: {
    userID: id.userID
  }
});

export const logout = () => ({
  type: "LOGOUT",
  user: {
    userName: undefined
  }
});
