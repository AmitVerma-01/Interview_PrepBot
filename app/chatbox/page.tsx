import ChatBox from "@/components/ChatBox";
import ChatHistory from "@/components/ChatHistory";
import { useEffect } from "react";

export default function Page(){
   
    return (
        <div className="w-screen h-full flex">
            {/* <div className="w-3/12 h-full">
                <ChatHistory/>
            </div> */}
            <div className="w-full h-full">
                <ChatBox/>
            </div>
        </div>
    )
}