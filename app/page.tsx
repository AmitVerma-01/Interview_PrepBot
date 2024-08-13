"use client"
import ChatBox from "@/components/ChatBox";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
 
  return (
      <div className="w-screen h-screen">
          <ChatBox/>
      </div>
  );
}
