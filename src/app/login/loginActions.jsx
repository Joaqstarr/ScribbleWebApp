
import { createClient } from "@/utils/supabase/client"

export async function CreateUser(username, id){
    const supabase = createClient();
    const gameData = await ReadRow(id, supabase);

    if(gameData == null)return false;

    GetUser(supabase);

    return InsertUser(username, id, supabase);

}

async function ReadRow(id, supabase){

    const { data, error } = await supabase
    .from('GameData')
    .select()
    .eq("id", id)
    .maybeSingle()

    if(error){
        console.log("ERROR: " + error);

        return;
    }
    if(data == null){
        console.log("Game does not exist");
        return;
    }
    return data;
}

async function InsertUser(username, gameid,  supabase){
    const user = await supabase.auth.getUser();

    if(user.data.user == null){
        console.log("Authentication does not exist: " + JSON.stringify(user));
        return false;
    }

    const { error } = await supabase
        .from('Users')
        .upsert({id: user.data.user.id,  name: username, connected_game: gameid, archived: false })
        .select()
        
    if(error){
        console.log("Error inserting user: " + JSON.stringify(error));
        return false;
    }

    return true;
}

async function GetUser(supabase){
    const user = await supabase.auth.getUser();
    console.log(JSON.stringify(user));
    if(user.data.user == null){
        console.log("User not existing, creating...")
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