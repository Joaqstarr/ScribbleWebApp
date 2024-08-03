export async function GetUser(supabase){
    const user = await supabase.auth.getUser();
    
   // console.log(JSON.stringify(user));

    if(user.data.user == null){
        console.log("User not exist, creating...")
        const { AuthData, error } = await supabase.auth.signInAnonymously()

        if(error){
            console.log("Error Anonymously signing in: " + error);
            return;
        }

        const newUser = await supabase.auth.getUser();
        console.log(JSON.stringify(newUser));

        return newUser;
    }
    return user; 
}

