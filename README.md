# LightningJS intercomponent communication

There are several approaches to intercomponent communication in LightningJS. In this particular demo, we
explore the upward communication between children components and their parent. The use-case
selected for this demo is the common situation of buttons being clicked/pressed/triggered, and illustrates
the different approaches to take when that event requires the execution of an action.


### Signals

In the early days of Web development, when modern JS frameworks like React, Vue.js and Angular
weren't available,  it was fairly common to add an event listener to the children components where we
expected a user action to happen. In LightningJS, while the use of vanilla events is not common
practice, the usage of ['signals'](https://lightningjs.io/docs/#/lightning-core-reference/Communication/Signal)
proliferates instead. This approach is similar to events, in the sense that the child that is
clicked/pressed/triggered fires a signal that is listened and caught by the parent, at which time the latter
executes an action.

To see an example of this approach, please see `src/AppSignals.js`

Note: LightningJS signals can only go up one level. For signals that bubble up multiple levels, please
see ['fireAncestors'](https://lightningjs.io/docs/#/lightning-core-reference/Communication/FireAncestors)

#### Advantages of this approach:
* More decoupled from parent; the child component doesn't care if the parent does anything with the
signal, and the parent doesn't necessarily need to catch it either.
* In the case of children multiple levels down you can use 'fireAncestors'; thus there is no need to inject
a callback through each level.
* Depending on how it's done, this approach can have a smaller memory footprint.

#### Caveats:
* This approach cannot be used in all situations. Particularly, when using
[UI CollectionWrappers](https://lightningjs.io/docs/#/lightning-ui-reference/CollectionWrapper/index)
or [Widgets](https://lightningjs.io/docs/#/lightning-sdk-reference/plugins/router/widgets), the usage
of signals is either impossible or presents challenges that may not worth tackling.

### Callbacks

Passing a callback prop to a children component has been popularized by some modern frameworks. React,
in particular, considers this the preferred approach for upward communication from children to parent
components. LightningJS also supports passing callbacks as props.

To see an example of this approach, please see `src/AppCallbacks.js`

#### Advantages of this approach:
* Cleaner “flow”, as there is a clearer code path from the parent to the child that can more easily be
debugged.
* Callbacks can be used in any situation, so if you prefer this approach you won't need to learn the concept
of 'signals'
* When using Typescript, callback props can be required
<sub><sup>- lacks verification in LightningJS</sup></sub>

#### Caveats:
* Depending on how it's done, this approach can have a bigger memory footprint if you create a distinct
callback for each one of the child components.

### State Machine

Using the LightningJS [State Machine](https://lightningjs.io/docs/#/lightning-core-reference/Components/CompStates/StateCreation)
presents an alternative approach to the problem of detecting events. However, this methodology differs
significantly from the previous approaches in the sense it is no longer the responsibility of the child
component to react to user actions. Instead, the parent can be made to use a state machine to control
navigation; using this method, the parent always knows which of the components is focused at any moment.
When the user interacts with the page, those interactions are caught directly by the parent, which executes
whatever actions are defined for the focused child.

To see an example of this approach, please see `src/AppStates.js`

#### Advantages of this approach:
* If you find yourself having to implement the state machine for navigation, it's very simple to add a method
to handle user actions on the focused child.
* Due to the way LightningJS handles states, only one state is enabled at any time; thus, the memory
footprint is optimized.

#### Caveats:
* This cannot be considered 'intercomponent communication' anymore, since there is no communication - the
parent has total control, and the child does not handle any user input.
* This approach only makes sense for apps which are going to be interacted with via a keyboard/remote with
limited input; only then can we implement 'Navigation' and know what is the focused component at any given
time. As such, this approach is not suitable for the development of 'touch' apps or 'webpages' since
in this kind of apps the user can tap/click in any element at any time.

### Conclusion

Any of the approaches discussed above is valid. However, when developing for embedded devices where resources
are limited, extra care should be taken with memory consumption. Callbacks and Signals will feel familiar
to experienced web developers, while the state machine approach is definitely a much more 'LightningJS'-way
of doing things, thus being less portable. While the latter may offer advantages in readability and memory
optimization, the developer needs to consider the nature of the app and the way user interactions will
take place.

### Running this demo:

> Before you follow the steps below, make sure you have the
[Lightning-CLI](https://rdkcentral.github.io/Lightning-CLI/#/) installed _globally_ only your system

```
npm install -g @lightningjs/cli
```

#### Running the App

1. Install the NPM dependencies by running `npm install`

2. Change `src/index.js` to execute the version of the app for the approach you want to demo.

3. Build the App using the _Lightning-CLI_ by running `lng build` inside the root of your project

4. Fire up a local webserver and open the App in a browser by running `lng serve` inside the root of your project

