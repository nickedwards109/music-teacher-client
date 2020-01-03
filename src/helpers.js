const getRole = (token) => {
  let encodedPayload = token.split(".")[1];
  let decodedPayload = atob(encodedPayload);
  let payloadObject = JSON.parse(decodedPayload);
  let role = payloadObject.role;
  return role;
}

const getId = (token) => {
  let encodedPayload = token.split(".")[1];
  let decodedPayload = atob(encodedPayload);
  let payloadObject = JSON.parse(decodedPayload);
  let id = payloadObject.id;
  return id;
}

export {
  getRole,
  getId
}
