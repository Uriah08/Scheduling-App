  import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function Home() {
  return (
    <div className="flex relative justify-center w-full h-screen">
      <Image src={"/cvsu-bg.png"} alt="CVSU bg" width={1920} height={1080} className="absolute inset-0 object-cover w-full h-full -z-10" />
      <div className="flex flex-col items-center text-center text-white z-10 px-20 py-10">
          <Image src={"/cvsu-logo.png"} alt="CVSU Logo" width={200} height={200} className="mx-auto mb-5" />
          <h1 className="text-7xl text-green-900 font-extrabold">SCHEDULING <span className="text-white">APP</span></h1>

          <Link href={"/home"} className="bg-green-800 p-5 rounded-full mt-20 flex gap-2 hover:bg-green-950">Get Started <ChevronRight/></Link>
      </div>

    </div>
  );
}
