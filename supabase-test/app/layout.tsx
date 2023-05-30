"use client";

import { useEffect, useState } from 'react';
import './globals.css'

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from 'next/navigation';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const [supabase] = useState(() => createClientComponentClient())
  const router = useRouter()
  
  // refresh data after login / out
  useEffect(()=> {
    const {data:{subscription},} =supabase.auth.onAuthStateChange(()=>{
      // refresh data
      router.refresh()
    })
    return () => { 
      subscription.unsubscribe()
    }
  },[supabase, router])




  const signUp = () => {
    supabase.auth.signUp({
      email:'baodotuan@gmail.com',
      password:'Tuanbao.171199'
    })
  }
  const signIn = () => {
    supabase.auth.signInWithPassword({
      email:'baodotuan@gmail.com',
      password:'Tuanbao.171199'
    })
  }
  const signOut = () => {
    supabase.auth.signOut()
  }
  return (
    <html lang="en">
      <body>
        <button onClick={signUp}> sign up</button>
        <button onClick={signIn}> sign in</button>
        <button onClick={signOut}> sign out</button>
        {children}</body>
    </html>
  )
}
