import { useRef, useState } from "react";
import jsPDF from "jspdf";
import { toJpeg } from "html-to-image";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import BottomLayer from "../assets/bottom-layer.png";
import DefaultImage from "../assets/aqua.png";
import TopLayer from "../assets/top-layer.png";
import { achivements } from "@/constants/achivements";
import { createSlug } from "@/utils/functions";

const getFormattedDate = (): string => {
  const now = new Date();

  const day = now.getDate();
  const month = now.toLocaleString("default", { month: "long" });
  const year = now.getFullYear();

  return `${day} ${month} ${year}`;
};

export default function CertificatePreview() {
  const [name] = useState<string>(localStorage.getItem("name")||"unkown kisanak");
  const [achivement] = useState<string>(
    localStorage.getItem("achivement")||createSlug(achivements[0])
  );
  const [graphImage] = useState<string>(localStorage.getItem("graphImage")||"");

  const navigate = useNavigate();
  const certificateRef = useRef<HTMLDivElement>(null);

  const certificates: {
    [key: string]: { name: string; border?: string };
  } = {};

  achivements.map((achivement) => {
    certificates[createSlug(achivement)] = {
      name: achivement,
      border: "border-2 border-[#f34c4c]",
    };
  });



  const handleDownloadPDF = async () => {
    if (certificateRef.current === null) return;

    try {
      const imgData = await toJpeg(certificateRef.current, {
        quality: 1,
        pixelRatio: 3,
      });
      const pdf = new jsPDF("landscape", "px", [1190, 842]);
      pdf.addImage(imgData, "JPG", 0, 0, 1190, 842);
      pdf.save("certificate.pdf");
    } catch (error) {
      console.error("Could not generate certificate image", error);
    }
  };

  const handleDownloadImage = async () => {
    if (certificateRef.current === null) return;

    try {
      const imgData = await toJpeg(certificateRef.current, {
        quality: 1,
        pixelRatio: 3,
      });

      const a = document.createElement("a");
      a.href = imgData;
      a.download = "certificate.jpg";
      a.click();
    } catch (error) {
      console.error("Could not generate certificate image", error);
    }
  };
  const handleBack = () => {
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center h-screen relative">
      <div
        ref={certificateRef}
        className="relative bg-[#3a3c3a] w-full max-w-[595px] h-auto aspect-[595/421] text-center"
        style={{
          backgroundImage: `url(${BottomLayer})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <img
          src={graphImage || DefaultImage}
          className="w-56 h-72 absolute z-80 left-4 bottom-4 opacity-40"
        />
        <div
          className="absolute z-90 inset-0 w-full h-full bg-transparent"
          style={{
            backgroundImage: `url(${TopLayer})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>
        <div className="absolute inset-0  flex flex-col justify-center items-center p-8 sm:p-12 md:p-12 lg:p-12 text-[#fff]">
          <h3 className="text-sm  sm:text-md md:text-xl lg:text-2xl font-bold mb-12 sm:mb-16 md:mb-16 lg:mb-16">
            {name || "Nama Kisanak"}
          </h3>
        </div>
        <div className="absolute inset-0 flex flex-col justify-center items-center p-8 sm:p-12 md:p-12 lg:p-12 text-[#fff]">
          <h3 className="text-sm  sm:text-md  md:text-xl lg:text-2xl font-bold mt-[5rem]">
            {certificates[achivement]["name"]}
          </h3>
        </div>
        <div className="absolute inset-0 flex flex-col justify-center items-start p-8 sm:p-12 md:p-12 lg:p-12  text-[#fff]">
          <p className="text-[10px] sm:text-[10px] md:text-[10px] lg:text-[12px] font-bold mt-24 sm:mt-36 md:mt-36 lg:mt-36">
            {getFormattedDate()}
          </p>
        </div>
      </div>
      <div className="flex justify-between">
        <Button
          onClick={handleBack}
          className="bg-[#f34c4c] px-4 py-2 mt-4 rounded mx-2"
        >
          Generate Ulang
        </Button>
        <Button
          onClick={handleDownloadPDF}
          className="bg-[#24a5f4] px-4 py-2 mt-4 rounded mx-2"
        >
          Download PDF
        </Button>
        <Button
          onClick={handleDownloadImage}
          className="bg-yellow-400 px-4 py-2 mt-4 rounded mx-2"
        >
          Download JPG
        </Button>
      </div>
    </div>
  );
}
