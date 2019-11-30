const getRole = (token) => {
  let encodedPayload = token.split(".")[1];
  let decodedPayload = atob(encodedPayload);
  let payloadObject = JSON.parse(decodedPayload);
  let role = payloadObject.role;
  return role;
}

export default getRole
