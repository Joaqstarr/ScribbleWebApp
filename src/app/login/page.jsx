"use client";

import { LoginComponent } from "../components/LoginComponent";
import { CreateUser } from "./loginActions";
import { redirect } from "next/navigation";
import Background from "../components/Background";

export default function Login() {
  
  return (
    <Background>
      <LoginComponent handlelogin={handleLogin} />

    </Background>
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