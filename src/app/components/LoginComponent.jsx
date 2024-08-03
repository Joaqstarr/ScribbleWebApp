"use client";
import Button from "./Button";

export function LoginComponent({handlelogin}){
    return (
      <div>
        <form action={handlelogin}>
          <label htmlFor="id">Game ID:</label>
          <input id="id" name="id" type="text" required />
          <label htmlFor="name">Name:</label>
          <input id="name" name="name" type="text" required />
          <button type="submit">Join Game</button>
        </form>
        <br/><br/>
        <Button text="Back" path="/" />
      </div>

    )
}

