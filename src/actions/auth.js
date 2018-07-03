export const login = userID => ({
  type: "LOGIN",
  user: {
    userID: userID
  }
});

export const logout = () => ({
  type: "LOGOUT",
  user: {
    userName: undefined
  }
});
