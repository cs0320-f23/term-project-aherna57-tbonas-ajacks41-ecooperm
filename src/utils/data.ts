export const userQuery = (userId : any) => {
  const query = `*[_type == "user" && _id == '${userId}']`;
  return query;
};
