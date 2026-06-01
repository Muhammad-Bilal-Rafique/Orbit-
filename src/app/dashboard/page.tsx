"use client"
import { signOut} from "next-auth/react";
import { useSession } from "next-auth/react";



const page = () => {
  const { data: session } = useSession();
console.log(session);
  return (
    <div>
      I am dashboard
      <button onClick={()=> signOut()}>Sign Out</button>
      
    </div>
  )
}

export default page
