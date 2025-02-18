import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Progress } from "@/components/ui/progress";

export default function CertificateGenerate() {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((oldProgress) => {
        const newProgress = oldProgress + 10;
        if (newProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            let name = localStorage.getItem("name");
            let achivement = localStorage.getItem("achivement");

            navigate(`/preview`, { state: { name, achivement } });
          }, 3000);
        }
        return newProgress;
      });
    }, 300);

    return () => {
      clearInterval(interval);
    };
  }, [navigate]);

  return (
    <div className="flex flex-col items-center h-screen">
      <h2 className="text-xl mb-4 capitalize">Memuat sertifikat kisanak ...</h2>
      <Progress value={progress} className="w-full max-w-md" />
    </div>
  );
}
