export const login = info => ({
  type: "LOGIN",
  user: {
    userName: info.userName
  }
});

export const logout = () => ({
  type: "LOGOUT"
});
