import JobList from "@/components/JobList";
import { fetchJobs } from "@/lib/api";
import { JobDocument, JobQuery } from "@/lib/type";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native"
import { Query } from "react-native-appwrite";
import { SafeAreaView } from "react-native-safe-area-context";

const PAGE_SIZE = 20;
const Search = () => {
  const { query } = useLocalSearchParams();
  const q = JSON.parse(query as string) as JobQuery;

  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [jobs, setJobs] = useState<JobDocument[]>([]);

  useEffect(() => {
    const queries: string[] = [];
    queries.push(Query.limit(PAGE_SIZE), Query.orderDesc('$createdAt'));
    if (q.name) {
      queries.push(Query.or([
        Query.contains('companyName', q.name),
        Query.contains('position', q.name),
        Query.contains('about', q.name),
        Query.contains('qualifications', q.name),
        Query.contains('responsibilities', q.name),
      ]));
    }

    if (q.type === 'popular') {

    }

    queries.push(Query.limit(PAGE_SIZE), Query.offset((page - 1) * PAGE_SIZE));

    fetchJobs(queries).then(res => {
      setJobs(res.jobs);
      setTotal(res.total);
    });
    fetchJobs([]);
  }, [query, page]);
  const totalPage = Math.ceil(total / PAGE_SIZE);
  return (
    <SafeAreaView className="px-2">
      <View className='flex-row justify-around items-center mt-5'>
        <TouchableOpacity onPress={() => setPage(page - 1)}>
          <Ionicons name={'arrow-back'} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setPage(page)}>
          <Text>{page}</Text>
        </TouchableOpacity>

        {page + 1 < totalPage && (
          <>
            <TouchableOpacity onPress={() => setPage(page + 1)}>
              <Text>{page + 1}</Text>
            </TouchableOpacity>

            {page + 3 < totalPage && <Text>...</Text>}

            <TouchableOpacity onPress={() => setPage(totalPage)}>
              <Text>{totalPage}</Text>
            </TouchableOpacity>
          </>
        )}

        <TouchableOpacity onPress={() => setPage(page + 1)}>
          <Ionicons name={'arrow-forward'} />
        </TouchableOpacity>

        <View className='flex-row'>
          <Text className='text-gray-500'>Total: </Text>
          <Text className="text-red-300">{total}</Text>
        </View>
      </View>

      <JobList jobs={jobs} />
    </SafeAreaView>
  )
};

export default Search;