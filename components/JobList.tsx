import { View, Text, FlatList, Pressable, Image } from 'react-native'
import React from 'react'
import { JobDocument } from '@/lib/type'
import { router } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'

const JobList = (props: { jobs: JobDocument[]; horizontal?: boolean; className?: string; }) => {
  return (
    <FlatList
      className={props.className}
      data={props.jobs}
      keyExtractor={(item) => item.$id}
      horizontal={props.horizontal}
      renderItem={({ item: { $id, companyName, position, salary, logoUrl } }) => (
        <Pressable onPress={() => {
          router.push(`detail/${$id}`);
        }}>
          {({ pressed }) => (
            props.horizontal ? (
              <View
                className={`w-[300] h-full p-5 mr-3 rounded-2xl
                  ${pressed ? 'bg-indigo-600' : 'bg-gray-50'}
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
            ) : (
              <View className={`w-full h-20 ${pressed ? 'bg-indigo-600': 'bg-gray-50'} mt-5 rounded-3xl shadow-lg flex-row items-center p-5`}>
                <Image className='w-[50] h-[50] rounded-xl' src={logoUrl?.toString()} resizeMode='contain' />
                <View className='ml-2'>
                  <Text className='font-bold text-lg'>{position}</Text>
                  <Text className='text-sm text-gray-300'>{companyName}</Text>
                </View>
              </View>
            )
          )}
        </Pressable>
      )}
    />
  )
}

export default JobList;