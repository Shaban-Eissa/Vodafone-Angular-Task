export type TPost = {
  userId: number;
  id: number;
  title: string;
  body: string;
  user?: TUser;
};

export type TComment = {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
};

export type TUser = {
  id: number;
  name: string;
  username: string;
  email: string;
};
