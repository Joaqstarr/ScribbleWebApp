export default function Login() {
  const handleLogin = (formData) => {
    const user = formData.get("name");
    const id = formData.get("id");
    /*
    alert(`User '${email}'`);

    const supabase = createClient();
    supabase.auth.signInWithOtp({
      email,
    });
  */
    alert(`User ${user} attempting to join game ${id}`);
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