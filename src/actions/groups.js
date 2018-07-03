export const groups = groupInfo => ({
  type: "SET_GROUPS",
  groups: groupInfo
});

export const addGroup = groupID => ({
  type: "ADD_GROUP",
  group: groupID
});

export const logoutGroups = () => ({
  type: "lOGOUT"
});
