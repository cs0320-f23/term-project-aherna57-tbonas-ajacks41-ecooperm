
type User = {
  id: string;
  firstName: string;
  lastName: string;
  imageUrl: string;
  GoogleOAuth: {
    provider: string;
    username: string;
  }[];
}

export const filterUserForClient = (user: User) => {
  return {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    profilePictureURL: user.imageUrl,
    username: user.GoogleOAuth[0]?.username,
  };
};

