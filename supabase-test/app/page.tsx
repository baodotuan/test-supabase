
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies} from 'next/headers'



export default async function Posts(){

  const supabase = createServerActionClient({
    cookies
  })
  
  const {data: posts} = await supabase.from('posts').select()

  return <pre>{JSON.stringify(posts,null,2)}</pre>
}