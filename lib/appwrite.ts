import { Account, Client, Databases, Storage } from "react-native-appwrite";

const endpoint = 'https://cloud.appwrite.io/v1';
const projectId = '66ba6453000fa1102e8e';
const platform = 'com.zanqwq.remoter';
const databaseId = '66ba64ea001f7e2fff68';
const userCollectionId = '66ba6566000f487f6b9d';
const jobCollectionId = '66ba655e002848621a84';
const storageBucketId = '66ba6635002420111d5c';

const client = new Client();
client.setEndpoint(endpoint).setProject(projectId).setPlatform(platform);

const accService = new Account(client);
const databaseService = new Databases(client);
const storageService = new Storage(client);