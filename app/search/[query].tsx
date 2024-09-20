import { fetchJobs } from "@/lib/api";
import { JobDocument, JobQuery } from "@/lib/type";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context";

const Search = () => {
  const { query } = useLocalSearchParams();
  const q = JSON.parse(query as string) as JobQuery;

  const [page, setPage] = useState(1);
  const [jobs, setJobs] = useState<JobDocument[]>([]);

  useEffect(() => {
    const queries: string[] = [];
    fetchJobs([]).then(res => {
      setJobs(res);
    });
    fetchJobs([]);
  }, [query]);
  return (
    <SafeAreaView>
      <Text>{JSON.stringify(jobs)}</Text>
    </SafeAreaView>
  )
};

export default Search;