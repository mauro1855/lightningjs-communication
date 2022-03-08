import { Lightning } from '@lightningjs/sdk'

export default class AppSignals extends Lightning.Component {
  static _template() {
    return {
      FirstButton: {
        type: Button,
        signals: {
          clicked: item => console.log('FirstButton', item),
        },
      },
      SecondButton: {
        type: Button,
        x: 300,
        signals: {
          clicked: item => console.log('SecondButton', item),
        },
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
    this.signal('clicked', this)
  }

  _focus() {
    this.tag('Wrapper').color = 0xffff0000
  }

  _unfocus() {
    this.tag('Wrapper').color = 0xff000000
  }
}
