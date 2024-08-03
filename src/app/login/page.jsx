import { CreateUser } from "./loginActions";
import { redirect } from "next/navigation";

`use client`
export default function Login() {
  const handleLogin = async function(formData){
    const user = formData.get("name");
    const id = formData.get("id");
    console.log("clicked");
    
    const result = await CreateUser(user, id);
    console.log(result);
    if(result){
      redirect(`/game/${id}/${user}`);
    }
    //alert(`User ${user} attempting to join game ${id}`);
  };


  return (
      <form action={handleLogin}>
        <label htmlFor="id">Game ID:</label>
        <input id="id" name="id" type="text" required />
        <label htmlFor="name">Name:</label>
        <input id="name" name="name" type="text" required />
        <button type="submit">Join Game</button>
      </form>
    )
  }