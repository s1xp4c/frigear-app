export type DatabaseUserRole =
  | 'user'
  | 'volunteer'
  | 'manager'
  | 'overseer'
  | 'admin';

export type DatabaseUserProfile = {
  id: string;
  role: DatabaseUserRole | string;
  nickname: string;
  settings: string;
  fields: any;
};
