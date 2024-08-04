export async function GetUser(supabase, forceNew = false){
    const user = await supabase.auth.getUser();
    
   // console.log(JSON.stringify(user));

    if(user.data.user == null){
        console.log("User not exist, creating...");
        await CreateUser(supabase);

        const newUser = await supabase.auth.getUser();
        console.log(JSON.stringify(newUser));

        return newUser;
    }
    return user; 
}

export async function GetNewUser(supabase) {
    await CreateUser(supabase);
    const newUser = await supabase.auth.getUser();

    return newUser;
}

async function CreateUser(supabase){
    const { AuthData, error } = await supabase.auth.signInAnonymously();

    if(error){
        console.log("Error Anonymously signing in: " + error);
        return;
    }
}