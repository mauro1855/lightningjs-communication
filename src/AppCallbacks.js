import { Lightning } from '@lightningjs/sdk'

export default class AppCallbacks extends Lightning.Component {
  static _template() {
    return {
      FirstButton: {
        type: Button,
        action: item => console.log('FirstButton', item),
      },
      SecondButton: {
        type: Button,
        x: 300,
        action: item => console.log('SecondButton', item),
      },
    }
  }

  _init() {
    this.focusedElement = this.tag('FirstButton')
  }

  _handleRight() {
    this.focusedElement = this.tag('SecondButton')
  }

  _handleLeft() {
    this.focusedElement = this.tag('FirstButton')
  }

  _getFocused() {
    return this.focusedElement
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

  _handleEnter() {
    this.action(this)
  }

  _focus() {
    this.tag('Wrapper').color = 0xffff0000
  }

  _unfocus() {
    this.tag('Wrapper').color = 0xff000000
  }
}
