"use client"

import Button from "./components/Button";
import Background from "./components/Background";

export default function Home() {
  return (
    <Background>
      <div>
        <Button text="Join Game" path="/login" />
        <br/><br/>
        <Button text="Create Game" path="/host" />

      </div>
    </Background>

  );
}
