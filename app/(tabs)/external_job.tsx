// 外部网站的远程工作
// 使用 fastapi

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

import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';

const ExternalJob = () => {
  return (
    <SafeAreaView>
      <Text>external_job</Text>
    </SafeAreaView>
  )
}

export default ExternalJob;