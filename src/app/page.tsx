import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="h-[100vh] w-full flex justify-center">
      <div className="max-w-[1000px] h-full w-full flex flex-col items-center mt-10">
        <Image src={'/cvsu-logo.jpg'} width={100} height={100} alt="cvsu-logo"/>
        <h1 className="text-center mt-10 text-5xl font-extrabold h-[200px]">Scheduling <span className="text-[#0b7804]">App</span></h1>
        <Link href={'/home'} className="flex gap-3 bg-[#0b7804] text-white px-5 py-3 rounded-full font-semibold mt-20 cursor-pointer hover:bg-[#264d29] transition-all duration-200">Get Started <ArrowRight/></Link>
      </div>
    </div>
  );
}
