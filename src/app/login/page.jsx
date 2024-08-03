"use client";

import { LoginComponent } from "../components/LoginComponent";
import { CreateUser } from "./loginActions";
import { redirect } from "next/navigation";

export default function Login() {
  
  return (
      <LoginComponent handlelogin={handleLogin} />
    )
}

async function handleLogin(formData){

  const user = formData.get("name");
  const id = formData.get("id");
  console.log("clicked");
  
  const result = await CreateUser(user, id);
  console.log(result);
  if(result){
    redirect(`/game/${id}/${user}`);
  }
}