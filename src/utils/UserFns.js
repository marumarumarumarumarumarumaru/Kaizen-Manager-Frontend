export function checkUserRole(usersData, specifiedUser) {
  if (usersData) {
    const matchedUser = usersData.filter(user => user.user_id === specifiedUser.user_id)[0]
    return matchedUser.user_role
  } else {
    return null
  }
}