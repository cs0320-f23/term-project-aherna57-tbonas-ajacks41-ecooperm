// For testing purposes only, not needed to develop front end
const googleMockResponse = {
  credential: "aXJwVGFoZi5zSUpSZkxjM2szJ3NlUG9aTUFkUjUwQkphNk…pRw553jHsQhX9zi3lVMiPxP-n1gcb097118zqCu318MmeeQfn7B",
  clientId: "11249341595-h07q06w4c22qjpvfl1jhwcfm7v5pro0c.apps.googleusercontent.com",
  select_by: "btn"
};

// Before we begin giving the user the ability to "sign up" for an account, 
// lets use the information from google to set up the account for them
// that means they do not get to choose their username/name
const decodedMockResponse = {
  aud: "11249341595-h07q06w4c22qjpvfl1jhwcfm7v5pro0c.apps.googleusercontent.com",
  azp: "11249341595-h07q06w4c22qjpvfl1jhwcfm7v5pro0c.apps.googleusercontent.com",
  email: "bruno_bear@brown.edu",
  email_verified: true,
  exp: 1601163568,
  family_name: "Bear",
  given_name: "Bruno",
  hd: "brown.edu",
  iat: 1601159968,
  iss: "https://accounts.google.com",
  jti: "84506g82fb74412e8d92b159d8dd22b366231671",
  locale: "en",
  name: "Bruno Bear",
  nbf: 1601159668,
  picture:"https://lh3.googleusercontent.com/a/ACg8ocK-jsSw0a6gjzveJFFCnIy49wUUPW0JQ4_P3-iSsPtp=s96-c",
  sub: "118706276059609132574",
};

const userMockSchema = {
  id: "11249341595-h07q06w4c22qjpvfl1jhwcfm7v5pro0c.apps.googleusercontent.com",
  username: "bruno_bear",
  email: "bruno_bear@brown.edu",
  password: "bears2024",
  firstName: "Bruno",
  lastName: "Bear",
  profilePictureURL:"https://www.pngall.com/wp-content/uploads/5/Profile-Male-PNG.png",
  updatedAt: "2020-09-26T00:00:00.000Z",
  createdAt: "2020-09-26T00:00:00.000Z",
  reviews: [],
  favorites: [],
};

export { googleMockResponse, decodedMockResponse, userMockSchema };
