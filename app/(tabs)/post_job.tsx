import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { JobDocument, JobForm } from '@/lib/type';
import Form from '@/components/Form';
import { Text, TouchableOpacity, View } from 'react-native';
import { DocumentPickerAsset } from 'expo-document-picker';
import { postJob, uploadFile } from '@/lib/api';

export default function TabTwoScreen() {
  const [form, setForm] = useState<JobForm>({
    companyName: '',
    position: '',
    employmentType: 'full-time',
    logo: null,
    about: '',
    qualifications: '',
    responsibilities: '',
    benifits: '',
    salary: '',
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
        onSubmit={async () => {
          if (!form.logo) return;
          const { url: logoUrl } = await uploadFile(form.logo);
          const jobDoc: JobDocument = { ...form, logoUrl };
          delete jobDoc.logo;
          postJob(jobDoc);
        }}
        config={{
          employmentType: { type: 'select', options: employmentTypeOptions },
          logo: { type: 'file', fileTypes: ['image/*'] },
          about: { type: 'textarea' },
          qualifications: { type: 'textarea' },
          responsibilities: { type: 'textarea' },
          benifits: { type: 'textarea' }
        }}
      />
    </SafeAreaView>
  );
};
