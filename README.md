# AR-Viewer
<p align="center">
  <img src="./docs/logo.png" alt="AR-Viewer dark"/>
</p>

Augmented-Reality web-app build with PWA functionality using [React](https://reactjs.org/), [three.js](https://threejs.org/) and [WebXR](https://immersiveweb.dev/). It is downloadable through the used browser and offers extensive offline functionality.

A live demo is available [here](https://app-ar-viewer.vercel.app/).

<p>
  <img src="./docs/ar-viewer-dark.jpg" alt="AR-Viewer dark" width="24%"/>
  <img src="./docs/3d-viewer-dark.jpg" alt="3D-Viewer dark" width="24%"/>
  <img src="./docs/settings-dark.jpg" alt="Settings dark" width="24%"/>
  <img src="./docs/object-selection-dark.jpg" alt="Object Selection dark" width="24%"/>
</p>

More screenshots available [here](https://github.com/sergidomenechguzy/app-ar-viewer/tree/development/docs).

Uses an AR-Viewer to place 3D-Objects around yourself through your device's camera and a regular 3D-Viewer as an alternative and fallback if your device doesn't support WebXR. Includes a selection of free 3D-Objects but also offers the functionality to upload your own local files (for now only in the .gltf/.glb file format). Supports light mode and dark mode as well as english and german as UI languages.

Currently support for WebXR and the included immersive-ar mode is pretty [limited](https://caniuse.com/webxr). So at the moment the only platform this app reliably works on with all features is Chrome for Android. When the WebXR API will be included into more browsers, compatibility for this app's AR-Viewer will also increase.

## Local Setup

As this app is intended as a downloadable PWA with offline functionality the default scripts use https since a secure connection is required for all PWA features.

### Installation

To run this app locally first clone the repository then install the dependencies:
```
git clone https://github.com/sergidomenechguzy/app-ar-viewer.git
cd app-ar-viewer
npm install
```

### Local Development

```
npm run start
```

### Build
```
npm run build
```
This creates your own production build into the `build` folder that can be served locally.

### Serve

```
npm run serve
```
This serves your current build locally over https. Works only after running `npm run build`.

To create a new build and instantly serve it:
```
npm run fresh
```

Note that for these commands to work you need to create your own `cert.pem` and `key.pem` files and add them in a `.cert` folder to the project root. This certificate is used to create the local https server. An easy way to create these files is to use [mkcert](https://github.com/FiloSottile/mkcert). Alternatively you can also use the [http scripts](#http).

### http

As an alternative to the https start, serve and fresh scripts, regular http versions exist as well:
```
npm run start:http
npm run serve:http
npm run fresh:http
```

## Included Assets

[Coaster](https://www.cgtrader.com/free-3d-models/furniture/tableware/cork-coaster-for-coffee-and-tea-cups), 
[Coffee Table](https://www.cgtrader.com/free-3d-models/furniture/table/round-wooden-coffee-table-2ce88b2c-9f04-465b-ae3c-adf51fec082d), 
[Pepper Grinder](https://www.cgtrader.com/free-3d-models/furniture/kitchen/pepper-grinder-3), 
[Pouf](https://www.cgtrader.com/free-3d-models/furniture/chair/single-pouf-moderno), 
[Scale](https://www.cgtrader.com/free-3d-models/interior/kitchen/scales-black), 
[Stool](https://www.cgtrader.com/free-3d-models/furniture/other/stool-3db388ec-3503-40a2-a695-42cb48a2ac31), 
[Wooden Chair 1](https://www.cgtrader.com/free-3d-models/furniture/chair/n01-chair), 
[Wooden Chair 2](https://www.cgtrader.com/free-3d-models/furniture/chair/simple-wooden-chair-ee79988c-bcb1-42c6-9ceb-2348bd3cb8fd),
[Metal Table](https://sketchfab.com/3d-models/old-metal-table-low-poly-92a14c8d231b4812bc7b97d03da6ddd9),
[Wooden Table](https://sketchfab.com/3d-models/wooden-table-acd1cef307b94803846d624b251a4e63),
[Metal Cabinet](https://sketchfab.com/3d-models/metal-cabinet-low-poly-1053729ad9d24d71a578622251f76deb),
[Modern Sofa](https://sketchfab.com/3d-models/modern-sofa-ac92f6e97eaa43c4ad6cb8f7c65ac43f),
[Kitchen Counter with Sink](https://sketchfab.com/3d-models/kitchen-counter-with-sink-ad9518f2a396411b8052d45575201dae),
[Bed](https://sketchfab.com/3d-models/bed-ea1152935b9049e4a0fcc949ebd31fa1),
[Grey L-Shaped Couch](https://sketchfab.com/3d-models/gray-l-shaped-couch-f3a71dc05afb46f8a2fae64eba0acc64),
[Old Cuoboard](https://sketchfab.com/3d-models/old-low-poly-cupboard-e82e50a099214f5382c34bd6762f457b),
[Mixer](https://sketchfab.com/3d-models/mixer-382319dab129471aa4985d0f599bd48d),
[Grey Sofa](https://sketchfab.com/3d-models/surreptitious-sofa-gray-100698-08495f99e8934e8a8d53dd4c73a923ba),
[Simple Ben Bag](https://sketchfab.com/3d-models/simple-bean-bag-64d111cec3d842f09cbb8c68b1e49c8d),
[Wardrobe](https://sketchfab.com/3d-models/wardrobe-e48bb01993c7464ea09a02465c87d25d),
[Desk Light](https://sketchfab.com/3d-models/desk-light-8485164b0e634c299debcccfe47794df),
[Coat Rack](https://sketchfab.com/3d-models/coat-rack-bowler-hat-7818b79c9c87488287c9a1cf62bf1548),
[Lounge Chair](https://sketchfab.com/3d-models/ekenaset-f8ff3af70a9a4cd798eaff563dde4114)
