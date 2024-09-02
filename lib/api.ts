import { Account, Avatars, Client, Databases, ID, Query, Storage } from "react-native-appwrite";
import { Job, SignInForm, SignUpForm, User } from "./type";

const endpoint = 'https://cloud.appwrite.io/v1';
const projectId = '66ba6453000fa1102e8e';
const platform = 'com.zanqwq.remoter';
const databaseId = '66ba64ea001f7e2fff68';
const userCollectionId = '66ba6566000f487f6b9d';
const jobCollectionId = '66ba655e002848621a84';
const storageBucketId = '66ba6635002420111d5c';

const client = new Client();
client.setEndpoint(endpoint).setProject(projectId).setPlatform(platform);

const accountService = new Account(client);
const avatarService = new Avatars(client);
const databaseService = new Databases(client);
const storageService = new Storage(client);

export const signIn = async (form: SignInForm) => {
  return accountService.createEmailPasswordSession(form.email, form.pwd);
};

export const signUp = async (form: SignUpForm) => {
  await accountService.create(ID.unique(), form.email, form.pwd);
  await signIn(form);
  const account = await accountService.get();
  const res = await databaseService.createDocument(
    databaseId,
    userCollectionId,
    ID.unique(),
    {
      accountId: account.$id,
      name: form.name,
      email: form.email,
    }
  );
  return res;
};

export const logout = async () => {
  await accountService.deleteSessions();
};

export const fetchCurrentUser = async (): Promise<User> => {
  const account = await accountService.get();
  const res = await databaseService.listDocuments(databaseId, userCollectionId, [
    Query.equal('accountId', account.$id)
  ]);
  return res.documents[0] as any;
};

export const fetchJobs = async (): Promise<Job[]> => {
  const res = await databaseService.listDocuments(databaseId, jobCollectionId)
  return res.documents as any;
};

