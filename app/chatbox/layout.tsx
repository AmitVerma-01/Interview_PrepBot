

import { useRouter } from "next/navigation";
import { ReactElement, ReactNode } from "react";

export default function layout({children} :  Readonly<{
    children: React.ReactNode;
  }>){
    return (
        <div className="relative">
            <nav className="text-center w-screen text-2xl font-bold h-14 flex justify-center items-center text">
                <div className="">
                     𝓒𝓱𝓪𝓽𝓽𝓮𝓻𝓑𝓸𝔁 𝓐𝓘
                </div>
            </nav>
            <div className="h-[calc(100vh-56px)]">
                {children}
            </div>
        </div>
    )
}