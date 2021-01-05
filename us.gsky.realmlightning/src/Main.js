import { Lightning, Utils } from "@lightningjs/sdk";

export default class Main extends Lightning.Component {
    static _template(){
        return {
            x: 750,
            y: 350,
            Caption:{
                text:'', 
                wordWrapWidth: 50,
                wordWrap:true,
                textAlign: 'center',
                shadow: true,
            },
            Post: {
                w:400,
                h:400,
                y:100,
                x:350
            }
        }
        
    }
    async initREST(){
        const resp = await fetch('https://us-east-1.aws.webhooks.mongodb-realm.com/api/client/v2.0/app/rdktest-verjh/service/hook/incoming_webhook/getRandomPost');
        const b = await resp.json();
        console.log(b);
        this.tag('Caption').text.text = b.caption||'';
        this.tag('Post').patch({
            src: Utils.proxyUrl(b.trigger)
        })
    }

    async initGQL(){
        // first auth the user, even if its anonymous auth
        const authResp = await fetch('https://realm.mongodb.com/api/client/v2.0/app/rdktest-verjh/auth/providers/anon-user/login');
        const aResult = await authResp.json(); 
        console.log(aResult);

        // issue graphql query
        const gqlResp = await fetch(
            'https://realm.mongodb.com/api/client/v2.0/app/rdktest-verjh/graphql', 
            {
                method: "post",
                body:'{"query":"query {  medium {    _id    caption    filter    location    path    taken_at    trigger    type }}" }',
                headers: {
                    "Authorization": "Bearer " + aResult.access_token,
                    "Content-Type": "application/json" 
                }
            }
        );
        const doc = await gqlResp.json();
        console.log(doc);

        // update the UI
        this.tag('Caption').text.text = doc.data.medium.caption||'';
        this.tag('Post').patch({
            src: Utils.proxyUrl(doc.data.medium.trigger)
        })
    }

    _init() {
        this.initGQL();
    }
    
    _active(){
        
    }
    
    _inactive(){
    }
}