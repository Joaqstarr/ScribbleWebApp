"use client"

import Link from "next/link";
import Button from "./components/Button";

export default function Home() {
  return (
  <div>
    <Button text="Join Game" path="/login" />
    <br/><br/>
    <Button text="Create Game" path="/host" />

  </div>
  );
}
