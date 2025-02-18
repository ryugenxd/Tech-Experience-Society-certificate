import React, { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { achivements } from "@/constants/achivements";
import { createSlug } from "@/utils/functions";

interface CertificateFormProps {
  onSubmit: (name: string, achivement: string) => void;
}

const CertificateForm: React.FC<CertificateFormProps> = ({ onSubmit }) => {
  const [name, setName] = useState<string>("");
  const [achivement, setAchivement] = useState<string>(
    createSlug(achivements[0])
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("name", name);
    localStorage.setItem("achivement", achivement);

    onSubmit(name, achivement);
  };

  useEffect(() => {
    console.log("Updated achivement:", achivement);
  }, [achivement]);

  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Sertifikat Kekisanakan </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="achivement">Jenis Sertifikat Kisanak</Label>
                <Select
                  onValueChange={(value) => {
                    setAchivement(value);
                  }}
                  value={achivement}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih Serfitikat Kisanak" />
                  </SelectTrigger>
                  <SelectContent>
                    {achivements.map((achivement) => (
                      <SelectItem value={createSlug(achivement)}>
                        {achivement}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Nama Kisanak </Label>
                <Input
                  id="name"
                  placeholder="Masukin nama kisanak"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            </div>
            <Button type="submit" className="w-full bg-blue-300 mt-8">
              Submit
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CertificateForm;
