export const groups = groupIDs => ({
  type: "SET_GROUPS",
  groups: groupIDs
});

export const addGroup = groupID => ({
  type: "ADD_GROUP",
  group: groupID
});
