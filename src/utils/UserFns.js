export function CheckUserRole(usersData, specifiedUser) {
  const matchedUser = usersData.filter(user => user.user_id === specifiedUser.user_id)[0]
  return matchedUser.user_role
}