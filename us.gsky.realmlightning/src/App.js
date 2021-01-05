import { Lightning, Utils } from '@lightningjs/sdk'
import Splash from "./Splash.js";
import Main from "./Main.js";

export default class App extends Lightning.Component {
  static getFonts() {
    return [{ family: 'Regular', url: Utils.asset('fonts/Roboto-Regular.ttf') }]
  }

  static _template() {
    return {
      Background: {
        w: 1920,
        h: 1080,
        src: Utils.asset('images/background.png'),
      },
      Logo: {
        x: 1000,
        y: 200,
        src: Utils.asset('images/mdblogo.png'),
      },
      Splash: {
            type: Splash, signals: {loaded: true}, alpha: 0
      },
      Main: {
        type: Main
      },
    }
  }
}
