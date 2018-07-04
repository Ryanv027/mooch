export const login = userInfo => ({
  type: "LOGIN",
  user: {
    userID: userInfo.userID,
    userName: userInfo.userName
  }
});

export const logout = () => ({
  type: "LOGOUT",
  user: {
    userName: undefined
  }
});
