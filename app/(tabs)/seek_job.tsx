import { Text, View, TouchableOpacity, TextInput, FlatList, Pressable, ScrollView, Image, RefreshControl } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { useGlobalContext } from '@/hooks/useGlobalContext';
import { fetchJobs, logout } from '@/lib/api';
import { JobDocument } from '@/lib/type';
import { Query } from 'react-native-appwrite';
import JobList from '@/components/JobList';

export default function HomeScreen() {
  // request();
  const [query, setQuery] = useState('');
  const [popularJobs, setPopularJobs] = useState<JobDocument[]>([]);
  const [recentJobs, setRecentJobs] = useState<JobDocument[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const { user, setUser } = useGlobalContext();

  useEffect(() => {
    fetchJobs([Query.orderDesc('$createdAt'), Query.limit(3)]).then(({ jobs }) => {
      setPopularJobs(jobs);
    });

    fetchJobs([Query.orderDesc('$createdAt'), Query.limit(3)]).then(({ jobs }) => {
      setRecentJobs(jobs);
    });
  }, []);

  return (
    <SafeAreaView className='h-full px-5 bg-gray-100'>
      {/* header */}
      <View className='flex-row items-center justify-between'>
        <TouchableOpacity className='ml-1' onPress={async () => {
          await logout();
          setUser(null);
        }}>
          <Ionicons name="log-in-outline" size={25} />
        </TouchableOpacity>
        <Text className='rounded-full bg-red-300 w-10 h-10 text-white text-center'></Text>
      </View>

      <View>
        <Text className='mt-2 text-lg'>{`Hello ${user?.name}`}</Text>
        <Text className='mt-2 mb-3 text-2xl font-bold'>Find your remote job here!</Text>
      </View>

      <View className='flex-row gap-2'>
        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder='What are you looking for ?'
          className='flex-grow h-[50] px-2 rounded-xl bg-gray-200'
        />

        <TouchableOpacity className='flex-grow-0 w-[50] items-center justify-center rounded-xl bg-red-300' onPress={() => {
          router.push('/search/' + JSON.stringify({ name: query }));
        }}>
          <Ionicons name="search" size={25} color='#fff' />
        </TouchableOpacity>
      </View>

      {/* Tag area */}
      <View className='flex-row gap-5 mt-1'>
        {['Web3', 'Front-end', 'Back-end'].map((name) => (
          <TouchableOpacity
            key={name}
            className='border-solid border-gray-300 border-2 px-5 py-2 rounded-xl'
            onPress={() => {
              router.push('/search/' + JSON.stringify({ name }));
            }}
          >
            <Text>{name}</Text>
          </TouchableOpacity>
        ))}
      </View>


      <ScrollView refreshControl={<RefreshControl refreshing={refreshing} />}>
        <View className='flex-row justify-between items-center'>
          <Text className='text-lg font-semibold'>Popular Job</Text>
          <TouchableOpacity onPress={() => {
            router.push('/search/' + JSON.stringify({ type: 'popular' }));
          }}>
            <Text className="text-gray-400">Show all</Text>
          </TouchableOpacity>
        </View>

        <View className='w-full h-[150]'>
          <JobList jobs={popularJobs} className='mt-2 h-1' horizontal />
        </View>

        <View className='flex-row justify-between items-center mt-5'>
          <Text className='text-lg font-semibold'>Recent Job</Text>
          <TouchableOpacity onPress={() => {
            router.push('/search/' + JSON.stringify({ type: 'recent' }));
          }}>
            <Text className="text-gray-400">Show all</Text>
          </TouchableOpacity>
        </View>

        <JobList jobs={recentJobs} />
      </ScrollView>
    </SafeAreaView>
  );
}
