# shaders-midi

> Interactive visualisations in WebGL

*shaders-midi* is a web app builded to display interactive visualisations. 

They are rendered with WebGL by Pixel Shaders, and they can be controller by several inputs, such as MIDI controllers or accelerometers.


## Ableton Link

Animations can be synchronized to a tempo set by Link, available in Ableton Live and Traktor. <br/>

In order to use that, you must run a software on the computer rendering the animations which needs to be on the same network as the other Link devices.

To run the software, you need to clone this repository and run the Ableton Link Proxy described below.
 
## Running the proxy

### Dependencies

Please refer to the documentation of these software to install the required dependencies:
- node.js v8+
- yarn

### Commands

Install package
```sh
yarn
```
Ableton Link proxy _(this is what you need to synchronise tempo)_
```sh
yarn linkproxy
```

### App development
Development server
```sh
yarn serve
```
Build production
```sh
yarn build
```

Run tests
```sh
yarn test
```

Lints and fixes files
```sh
yarn lint
```
