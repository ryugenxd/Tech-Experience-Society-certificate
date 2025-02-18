import React, { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select'
import { Label } from '@/components/ui/label';

interface CertificateFormProps {
  onSubmit: (name: string,ty:string) => void;
}

const CertificateForm: React.FC<CertificateFormProps> = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [ty,setTy] = useState('cert1');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(name,ty);
  };



  return (
    <div className='flex justify-center items-center h-screen'>
      <Card className='w-[350px]'>
        <CardHeader>
          <CardTitle>Sertifikat Kekisanakan </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className='grid w-full items-center gap-4'>
              <div className='flex flex-col space-y-1.5'>
              	<Label htmlFor='ty'>Jenis Sertifikat Kisanak</Label>
              	<Select onValueChange={setTy} value={ty} required>
              	  <SelectTrigger>
              	    <SelectValue placeholder="Pilih Serfitikat Kisanak" />
              	  </SelectTrigger>
              	  <SelectContent>
              	    <SelectItem value="cert1">Programmer trial & error</SelectItem>
              	    <SelectItem value="cert2">Master Ctrl+C Crtl+V Programming</SelectItem>
              	    <SelectItem value="cert3">Tukang Debug di Production</SelectItem>
              	    <SelectItem value="cert4">DevOps Ugal-Ugalan</SelectItem>
              	  </SelectContent>
              	</Select>
              </div>
              <div className='flex flex-col space-y-1.5'>
                <Label htmlFor='name'>Nama Kisanak </Label>
                <Input
                  id='name'
                  placeholder='Masukin nama kisanak'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            </div>
            <Button type='submit' className='w-full bg-blue-300 mt-8'>
              Submit
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CertificateForm;
