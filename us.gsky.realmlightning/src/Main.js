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
    async _init(){
        const resp = await fetch('https://us-east-1.aws.webhooks.mongodb-realm.com/api/client/v2.0/app/rdktest-verjh/service/hook/incoming_webhook/getRandomPost');
        const b = await resp.json();
        console.log(b);
        this.tag('Caption').text.text = b.caption||'';
        this.tag('Post').patch({
            src: Utils.proxyUrl(b.trigger)
        })
    }
    
    _active(){
        
    }
    
    _inactive(){
    }
}