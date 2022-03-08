import { Launch } from '@lightningjs/sdk'
import AppSignals from './AppSignals.js'
import AppCallbacks from './AppCallbacks'
import AppStates from './AppStates'

export default function() {
  return Launch(AppSignals, ...arguments)
  // return Launch(AppCallbacks, ...arguments)
  // return Launch(AppStates, ...arguments)
}
