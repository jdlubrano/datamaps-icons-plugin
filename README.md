# Datamaps Icons Plugin

[![Build Status](https://travis-ci.org/jdlubrano/datamaps-icons-plugin.svg?branch=master)](https://travis-ci.org/jdlubrano/datamaps-icons-plugin)

## Contributors
* Joel Lubrano

## Description
This project provides a plugin for generating a layer of customizable
icons on top of a D3/Datamaps svg.

## Getting Started

### Git
Clone the project via `git`.  Dependencies can be installed with `npm install`,
and running `grunt` will build the source code.  The original and minified
versions will be present in the `build` directory.

### NPM
Run `npm install datamaps-icons`.  The source will then be located in 
`node_modules/datamaps-icons/build`.

## Example Usage
```
// Create a Datamaps instance
var dm = new Datamap({
  element: document.getElementById('map')
});

// Retrieve the data for rendering icons
var iconsData = [
  {
    // the icon's latitude
    lat: [int],

    // the icon's longitude
    lng: [int],

    // CSS class name that is to be appended to the class set
    // via the options parameter,
    cssClass: [optional, String],

    // The svg element for an icon.
    // This parameter overrides the iconFn passed in the options parameter.
    icon: [optional, DOM element],

    // Click event options
    click: {
      // overrides the click.onClass property in the 
      // options parameter for an individual icon
      onClass: [optional, String],

      // overrides the click.offClass property in the options
      // parameter for an individual icon
      offClass: [optional, String]
    },
    hover: {
      // overrides the hover.overClass property in the options paramter
      // for an individual icon
      overClass: [optional, String],

      // overrides the hover.outClass property in the options parameter
      // for an individual icon
      outClass: [optional, String]
    }
  },
  ...
];

// Setup the options for the icons plugin (defaults given)
// These options will apply to all icons unless they are overridden
// at the data level.
// All properties are optional.
var iconOpts = {
  // The CSS class given to all icons
  cssClass: 'datamap-icon',

  // A function that returns an SVG element to serve as an icon.
  iconFn: function() { return a black circle with radius 5. },

  // Hover event options
  hover: {
    // Hover functions are passed the icon svg 
    // element as their context (i.e. this)
    // and the icon's data and index are passed as arguments.

    // A function to be executed when an icon undergoes a mouseover event.
    overFn: null,

    // A function to be executed when an icon undergoes a mouseout event.
    outFn: null,

    // A CSS class applied to an icon on a mouseover event.
    overClass: 'hover-over',

    // A CSS class applied to an icon on a mouseout event.
    outClass: 'hover-out',
  },
  click: {
    // Allow multiple icons to be in a clicked state
    allowMultiple: false,

    // Click functions are called with the icon svg element as the context
    // and the icon's data as the first argument.

    // A function to be executed when an icon is clicked
    // and was previously in an unclicked state.
    onFn: null,

    // A function to be executed when an icon is clicked
    // and was previously in a clicked state.
    offFn: null,

    // A CSS class applied to an icon in a clicked state.
    onClass: 'click-on',

    // A CSS class applied to an icon in an unclicked state.  This does not get
    // applied to icons by default, only after the icon is clicked on
    // then later clicked off does this class get applied.
    offClass: 'click-off',

    // Execute the clickOff function for all icons in a clicked state when the
    // Datamaps svg is clicked but an icon was not.
    clickOffOnClickAway: false,

    // A function to be executed when the Datamaps svg is clicked
    // but an icon was not.  The Datamaps object is passed as the context.
    awayFromIconFn: null
  }
};

// call the icons plugin
dm.icons(iconsData, iconOpts);

```

Also see `examples/basic.html`.

## Dependencies
See `package.json`.
