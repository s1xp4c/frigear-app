import {appContainer} from "@/app/app-container";

export default async function AppPage(){
    const client = appContainer.make('supabaseClient');
    const {data} = await client.auth.getUser();

    if(!data.user){
        return (<h1>No user</h1>)
    }

    return (<h1>{data.user.email || 'n/a'}</h1>)
}