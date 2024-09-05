import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Job } from '@/lib/type';
import Form from '@/components/Form';
import { Text } from 'react-native';

export default function TabTwoScreen() {
  const [form, setForm] = useState<Job>({
    companyName: '',
    position: '',
    employmentType: 'full-time',
    logoUrl: '',
    jobDescription: '',
    about: '',
    qualification: '',
    responsibilities: '',
    benifits: '',
    contact: '',
  });

  const employmentTypeOptions = [
    'full-time', 'part-time', 'contractor'
  ].map((value) => ({ label: value, value }));

  return (
    <SafeAreaView className='p-5'>
      {/* <Text>{JSON.stringify(form)}</Text> */}
      <Form
        form={form}
        onFieldChange={(name, value) => {
          setForm({ ...form, [name]: value });
        }}
        config={{
          // companyName: { required: true },
          employmentType: { type: 'select', options: employmentTypeOptions },
          logoUrl: { title: 'Logo' },
          jobDescription: { type: 'textarea' },
          about: { type: 'textarea' },
          qualification: { type: 'textarea' },
          responsibilities: { type: 'textarea' },
          benifits: { type: 'textarea' }
        }}
      />
    </SafeAreaView>
  );
};
