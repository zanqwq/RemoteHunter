import { Text, View, TouchableOpacity, TextInput, FlatList, Pressable, ScrollView, Image, RefreshControl } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { useGlobalContext } from '@/hooks/useGlobalContext';
import { fetchJobs, logout } from '@/lib/api';
import { JobDocument } from '@/lib/type';
import { Query } from 'react-native-appwrite';

export default function HomeScreen() {
  // request();
  const [query, setQuery] = useState('');
  const [popularJobs, setPopularJobs] = useState<JobDocument[]>([]);
  const [recentJobs, setRecentJobs] = useState<JobDocument[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const { user, setUser } = useGlobalContext();

  console.log('seek_job');
  useEffect(() => {
    fetchJobs([Query.orderDesc('$createdAt'), Query.limit(4)]).then(jobs => {
      console.log('@@@ poluar jobs', jobs);
      setPopularJobs(jobs);
      setRecentJobs(jobs);
    });

    fetchJobs([Query.orderDesc('$createdAt'), Query.limit(4)]).then(jobs => {
      console.log('@@@ recent jobs', jobs);
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
          <FlatList
            className='mt-2 h-1'
            data={popularJobs}
            keyExtractor={(item) => item.$id}
            horizontal
            renderItem={({ item: { $id, companyName, position, salary, logoUrl } }) => (
              <Pressable onPress={() => {
                router.push(`detail/${$id}`);
              }}>
                {(data) => (
                  <View
                    className={`w-[300] h-full p-5 mr-3 rounded-2xl
                      ${data.pressed ? 'bg-indigo-600' : 'bg-gray-50'}
                      flex-row justify-between`
                    }
                  >
                    <View className='items-start'>
                      <Image className='w-[50] h-[50] rounded-xl' src={logoUrl} resizeMode='contain' />
                      <Text className='text-xs text-gray-400 mt-1'>{companyName}</Text>
                      <Text className='text-lg'>{position}</Text>
                      <Text className='text-xs text-yellow-500'>{salary}</Text>
                    </View>
                    <Ionicons name="heart" size={25} color='#faa' />
                  </View>
                )}
              </Pressable>
            )}
          />
        </View>

        <View className='flex-row justify-between items-center mt-5'>
          <Text className='text-lg font-semibold'>Recent Job</Text>
          <TouchableOpacity onPress={() => {
            router.push('/search/' + JSON.stringify({ type: 'recent' }));
          }}>
            <Text className="text-gray-400">Show all</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={recentJobs}
          keyExtractor={(item) => item.$id}
          renderItem={({item: { logoUrl, position, companyName, $id } }) => (
            <Pressable onPress={() => {
              router.push(`/detail/${$id}`)
            }}>
              {({ pressed }) => (
                <View className={`w-full h-20 ${pressed ? 'bg-indigo-600': 'bg-gray-50'} mt-5 rounded-3xl shadow-lg flex-row items-center p-5`}>
                  <Image className='w-[50] h-[50] rounded-xl' src={logoUrl} resizeMode='contain' />
                  <View className='ml-2'>
                    <Text className='font-bold text-lg'>{position}</Text>
                    <Text className='text-sm text-gray-300'>{companyName}</Text>
                  </View>
                </View>
              )}
            </Pressable>
          )}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
