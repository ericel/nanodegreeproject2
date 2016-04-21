## Transapp 

> Transport application build using polymer 1.0

### Included out of the box:

* [Polymer](https://www.polymer-project.org/), [Paper](https://elements.polymer-project.org/browse?package=paper-elements), [Iron](https://elements.polymer-project.org/browse?package=iron-elements) and [Neon](https://elements.polymer-project.org/browse?package=neon-elements) elements
* [Material Design](http://www.google.com/design/spec/material-design/introduction.html) layout
* Routing with [Page.js](https://visionmedia.github.io/page.js/)
* Unit testing with [Web Component Tester](https://github.com/Polymer/web-component-tester)
* Optional offline setup through [Platinum](https://elements.polymer-project.org/browse?package=platinum-elements) Service Worker elements
* End-to-end Build Tooling (including [Vulcanize](https://github.com/Polymer/vulcanize))
* [Recipes](/docs/README.md/) for ES2015 support, Polymer performance, using Chrome Dev Editor, Deploying to GitHub Pages, Deploying to Firebase, Mobile Chrome Apps and lint tools.

### Demo
See latest Polymer Starter Kit Demo (from master) at https://polymerelements.github.io/polymer-starter-kit/

### Tutorials

Check out the Polymer Starter Kit tutorials on [polymer-project.org](https://www.polymer-project.org):

* [Set up the PSK](https://www.polymer-project.org/1.0/docs/start/psk/set-up.html)
* [Create a page](https://www.polymer-project.org/1.0/docs/start/psk/create-a-page.html)
* [Deploy the PSK to the web](https://www.polymer-project.org/1.0/docs/start/psk/deploy.html)

## Getting Started

To take advantage of Polymer Starter Kit you need to:

1. Get a copy of the code.
2. Install the dependencies if you don't already have them.
3. Modify the application to your liking.
4. Deploy your production code.

### Get the code

[Download](https://github.com/polymerelements/polymer-starter-kit/releases/latest) and extract Polymer Starter Kit to where you want to work. The project comes in two flavours - Light and Full.

**Beginners**: Try Polymer Starter Kit Light. This doesn't require any extra dependencies nor knowledge of modern front-end tooling. This option is good for prototyping if you haven't build a Polymer app before.

**Intermediate - Advanced**: Use the full version of Polymer Starter Kit. This comes with all the build tools you'll need for testing and productionising your app so it's nice and lean. You'll need to run a few extra commands to install the tools we recommend but it's worth it to make sure your final app is super optimised.

:warning: **Important**: Polymer Starter Kit, and Polymer Starter Kit Light, both contain dotfiles (files starting with a `.`). If you're copying the contents of the Starter Kit to a new location make sure you bring along these dotfiles as well! On Mac, [enable showing hidden files](http://ianlunn.co.uk/articles/quickly-showhide-hidden-files-mac-os-x-mavericks/), then try extracting/copying Polymer Starter Kit again. This time the dotfiles needed should be visible so you can copy them over without issues.

Rob Dodson has a fantastic [PolyCast video](https://www.youtube.com/watch?v=xz-yixRxZN8) available that walks through using Polymer Starter Kit. An [end-to-end with Polymer](https://www.youtube.com/watch?v=1f_Tj_JnStA) and Polymer Starter Kit talk is also available.

### Install dependencies

#### Quick-start (for experienced users)

With Node.js installed, run the following one liner from the root of your Polymer Starter Kit download:

```sh
npm install -g gulp bower && npm install && bower install
```


