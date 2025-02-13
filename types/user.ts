export interface User {
  id: string;
  name: string | null;
  email: string | null;
  image: string | null;
  roles: {
    name: string;
  }[];
}

export interface ProfileFormProps {
  user: User;
}