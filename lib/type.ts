export type SignInForm = {
  email: string;
  pwd: string;
};

export type SignUpForm = SignInForm & {
  name: string;
};

export type User = {
  name: string;
  email: string;
  avatarUrl: string;
  cvUrl: string;
};

export type Job = {
  companyName: string;
  position: string;
  employmenType: 'full-time' | 'part-time' | 'contractor';
  logoUrl?: string;
  about?: string;
  qualification?: string;
  responsibilities?: string;
  benifits?: string;
  contact?: string;
  creator?: string;
  salary?: string;
  [x: string]: any;
};

export type GlobalContext = {
  user: User | null;
  setUser: (user: User | null) => void;
};
