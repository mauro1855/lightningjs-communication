import { Lightning } from '@lightningjs/sdk'

export default class AppStates extends Lightning.Component {
  static _template() {
    return {
      FirstButton: {
        type: Button,
      },
      SecondButton: {
        type: Button,
        x: 300,
      },
    }
  }

  _init() {
    this._setState('FirstButton')
  }

  static _states() {
    return [
      class FirstButton extends this {
        _handleRight() {
          this._setState('SecondButton')
        }
        _getFocused() {
          return this.tag('FirstButton')
        }
        _handleEnter() {
          console.log('FirstButton', this.tag('FirstButton'))
        }
      },
      class SecondButton extends this {
        _handleLeft() {
          this._setState('FirstButton')
        }
        _getFocused() {
          return this.tag('SecondButton')
        }
        _handleEnter() {
          console.log('SecondButton', this.tag('SecondButton'))
        }
      },
    ]
  }
}

class Button extends Lightning.Component {
  static _template() {
    return {
      Wrapper: {
        h: 75,
        w: 200,
        rect: true,
        color: 0xff000000,
        Label: {
          text: {
            fontSize: 32,
            textColor: 0xffffffff,
            text: 'Hello!',
          },
        },
      },
    }
  }

  _focus() {
    this.tag('Wrapper').color = 0xffff0000
  }

  _unfocus() {
    this.tag('Wrapper').color = 0xff000000
  }
}
