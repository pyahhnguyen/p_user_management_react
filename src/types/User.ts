export interface User {
  id: string;
  fullName: string;
  email: string;
  createdAt: string;
}

export interface UserFormData {
  fullName: string;
  email: string;
}

export interface Account {
  email: string;
  password: string;
  fullName: string;
}
