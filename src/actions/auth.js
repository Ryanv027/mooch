export const login = info => ({
  type: "LOGIN",
  user: {
    userID: info.userID
  }
});

export const logout = () => ({
  type: "LOGOUT",
  user: {
    userName: undefined
  }
});
