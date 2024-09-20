import { DocumentPickerAsset } from "expo-document-picker";
import { Models } from "react-native-appwrite";

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

export type JobForm = {
  companyName: string;
  position: string;
  employmentType: 'full-time' | 'part-time' | 'contractor';
  logo: DocumentPickerAsset | null;
  about?: string;
  qualifications?: string;
  responsibilities?: string;
  benifits?: string;
  contact?: string;
  creator?: string;
  salary?: string;
};

export type JobDocument = {
  companyName: string;
  position: string;
  employmentType: 'full-time' | 'part-time' | 'contractor';
  logoUrl?: URL | null;
  about?: string;
  qualifications?: string;
  responsibilities?: string;
  benifits?: string;
  contact?: string;
  creator?: string;
  salary?: string;
} & Partial<Models.Document>;

export type JobQuery = {
  name?: string;
  type?: 'recent' | 'popular';
};

export type GlobalContext = {
  user: User | null;
  setUser: (user: User | null) => void;
};
