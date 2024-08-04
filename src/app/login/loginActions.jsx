import { createClient } from "@/utils/supabase/client"
import { GetUser } from "../services/AuthActions";
import { DecodeId } from "../host/hostActions";

export async function CreateUser(username, gameid){
    const id = DecodeId(gameid);
    const supabase = createClient();
    const gameData = await ReadRow(id, supabase);

    if(gameData == null)return false;
    console.log(JSON.stringify(gameData).id);
    const gameUUID = gameData.id;
    GetUser(supabase);

    return InsertUser(username, gameUUID, supabase);

}

async function ReadRow(id, supabase){

    const { data, error } = await supabase
    .from('GameData')
    .select()
    .eq("game_code", id)
    .eq("archived", false)
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


