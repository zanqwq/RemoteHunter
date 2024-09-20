import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import * as DocumentPicker from 'expo-document-picker';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';

type FormProps = {
  form: Record<string, any>;
  onFieldChange?: (name: string, value: any) => void;
  onSubmit?: () => void;
  config?: Record<string, {
    required?: boolean;
    type?: 'text' | 'textarea' | 'select' | 'file';
    options?: { label: string; value: any; }[]
    fileTypes?: string[];
    multiFile?: boolean;
    title?: string;
    hide?: boolean;
  }>
};

const Form = (props: FormProps) => {
  return (
    <ScrollView>
      {Object.entries(props.form).map(([name, value]) =>
        <View className='gap-2 mb-5' key={name}>
          {(() => {
            const {
              required = false, type = 'text', fileTypes = [],
              title = name, options = [], multiFile, hide
            } = props.config?.[name] || {};
            if (hide) return null;
            let input: any;
            if (type === 'file') {
              input = (
                <TouchableOpacity
                  className='w-full h-[80] bg-gray-200 rounded-lg items-center justify-center'
                  onPress={() => {
                    DocumentPicker.getDocumentAsync({
                      type: fileTypes,
                      multiple: multiFile || false
                    }).then((res) => {
                      if (!res.canceled) {
                        props.onFieldChange?.(name, multiFile ? res.assets : res.assets[0]);
                      }
                    });
                  }}
                >
                  {value ?
                    ((Array.isArray(value) ? value : [value])).map((item: DocumentPicker.DocumentPickerAsset) => (
                      <Text key={item.uri}>{item.name}</Text>
                    )) :
                    <Ionicons name={'file-tray'} size={25} />
                  }
                </TouchableOpacity>
              );
            } else if (type === 'select') {
              input = (
                <Picker selectedValue={value} onValueChange={value => props.onFieldChange?.(name, value)}>
                  {options.map(({ label, value }, i) =>
                    <Picker.Item key={i} label={label} value={value} />)
                  }
                </Picker>
              )
            } else {
              input = (
                <View className={`w-full ${type === 'textarea' ? 'h-[100]' : 'h-[50]'} p-2 bg-gray-200 rounded-md shadow-md`}>
                  <TextInput
                    value={value}
                    multiline={type === 'textarea'}
                    numberOfLines={type === 'textarea' ? 10 : undefined}
                    textAlignVertical={type === 'textarea' ? 'top' : undefined}
                    onChangeText={value => props.onFieldChange?.(name, value)}
                  />
                </View>
              );
            }
            return <>
              <Text>
                {`${title[0].toUpperCase()}${title.slice(1)}`}
                {required && <Text className='text-red-400'>*</Text>}
              </Text>
              {input}
            </>
          })()}
        </View>
      )}

      <TouchableOpacity
        className='h-[50] rounded-lg justify-center bg-red-300'
        onPress={props.onSubmit}
      >
        <Text className='text-center text-gray-50'>Submit</Text>
      </TouchableOpacity>
    </ScrollView>
  )
}

export default Form