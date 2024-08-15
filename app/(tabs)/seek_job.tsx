import { Text, View, TouchableOpacity, TextInput, FlatList, Pressable, ScrollView } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';
import { useState } from 'react';

type Job = {
  id: number;
  companyName: string;
  position: string;
  description: string;
  salary: string;
  logoUrl: string;
  type: 'contractor' | 'part-time' | 'full-time';
  createdAt: number;
}

const request = async () => {
  const url = 'https://jobs-from-remoteok.p.rapidapi.com/';
  const options = {
    method: 'GET',
    headers: {
      'x-rapidapi-key': 'f509811ea8mshfe6b98dc3626c8fp1acfe7jsnbe0e7327bea0',
      'x-rapidapi-host': 'jobs-from-remoteok.p.rapidapi.com'
    }
  };

  try {
    const response = await fetch(url, options);
    const result = await response.text();
    console.log(result);
  } catch (error) {
    console.error(error);
  }
};

export default function HomeScreen() {
  // request();
  const popularJobs: Job[] = [
    {
      id: 0,
      companyName: 'Google',
      position: 'React Developer',
      description: '',
      salary: '100$ ~ 200$',
      logoUrl: '',
      type: 'contractor',
      createdAt: Date.now(),
    },
    {
      id: 1,
      companyName: 'MicroSoft',
      position: 'Software enginer',
      description: '',
      salary: '100$ ~ 200$',
      logoUrl: '',
      type: 'full-time',
      createdAt: Date.now()
    },
  ];

  const recentJobs: Job[] = [
    {
      id: 0,
      companyName: 'Google',
      position: 'React Developer',
      description: '',
      salary: '100$ ~ 200$',
      logoUrl: '',
      type: 'contractor',
      createdAt: Date.now(),
    },
    {
      id: 1,
      companyName: 'MicroSoft',
      position: 'Software enginer',
      description: '',
      salary: '100$ ~ 200$',
      logoUrl: '',
      type: 'full-time',
      createdAt: Date.now()
    }
  ];

  const [query, setQuery] = useState('');

  return (
    <SafeAreaView className='h-full px-5 bg-gray-100'>
      {/* header */}
      <View className='flex-row items-center justify-between'>
        <Ionicons name="menu" size={25} />
        <Text className='rounded-full bg-red-300 w-10 h-10 text-white text-center'></Text>
      </View>

      <View>
        <Text className='mt-2 text-lg'>Hello zanqwq</Text>
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
          keyExtractor={(item) => item.id}
          horizontal
          renderItem={({ item: { id, companyName, position, salary } }) => (
            <Pressable onPress={() => {
              router.push(`detail/${id}`);
            }}>
              {(data) => (
                <View
                  className={`w-[300] h-full p-5 mr-3 rounded-2xl
                    ${data.pressed ? 'bg-indigo-600' : 'bg-gray-50'}
                    flex-row justify-between`
                  }
                >
                  <View className='items-start'>
                    <Text className="w-[50] h-[50] bg-gray-100 rounded-lg"></Text>
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
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Pressable onPress={() => {
            router.push(`/detail/${item.id}`)
          }}>
            {({ pressed }) => (
              <View className={`w-full h-20 ${pressed ? 'bg-indigo-600': 'bg-gray-50'} mt-5 rounded-3xl shadow-lg flex-row items-center p-5`}>
                <View className='bg-gray-100 w-[50] h-[50] rounded-xl shadow-lg'></View>
                <View className='ml-2'>
                  <Text className='font-bold text-lg'>{item.position}</Text>
                  <Text className='text-sm text-gray-300'>{item.type}</Text>
                </View>
              </View>
            )}
          </Pressable>
        )}
      />
    </SafeAreaView>
  );
}
