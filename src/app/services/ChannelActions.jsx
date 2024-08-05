import { createClient } from "@/utils/supabase/client";

export function GetChannel(GameUID){
    const supabase = createClient();

    const channel = supabase.channel(GameUID, {
        config: {
          broadcast: { self: true },
        },
      });
    return channel;
}


export function SubscribeToChannel(GameUID, callback){
    const subbedChannel = GetChannel(GameUID);

    subbedChannel.subscribe((status) => {
        if(status !== "SUBSCRIBED"){
            return null;
        }

        callback({channel: subbedChannel});
    });
}