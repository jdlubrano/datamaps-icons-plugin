// datamaps-icons.js
// Author: Joel Lubrano
// The datamaps icons plugin.

"use strict";

(function() {

  var PLUGIN_NAME = 'icons';

  var iconsPlugin = function(layer, data, options) {
    var SVG_NS = 'http://www.w3.org/2000/svg';
    var self = this;
    
    var defaultOptions = {
      cssClass: 'datamap-icon',
      iconFn: function() {
        // default to a black circle.
        var circle = document.createElementNS(SVG_NS, 'circle');
        circle.setAttribute('r', 5);
        circle.setAttribute('stroke', '#000');
        circle.setAttribute('stroke-width', 1);
        circle.setAttribute('fill', '#000');
        return circle;
      },
      hover: {
        overFn: null,
        overClass: 'hover-over',
        outFn: null,
        outClass: 'hover-out'
      }
    };

    var overrideProps = function(orig, addition) {
      // add the properties from orig that 
      // do not already exist in addition.
      for(var prop in orig) {
        if(typeof orig[prop] === "object" && addition[prop]) {
          overrideProps(orig[prop], addition[prop]);
        } else {
          if(addition[prop] == null) addition[prop] = orig[prop];
        }
      }
      return addition;
    };

    var latLngToX = function(d) {
      return self.latLngToXY(d.lat, d.lng)[0];
    };

    var latLngToY = function(d) {
      return self.latLngToXY(d.lat, d.lng)[1];
    };

    var genTranslateStr = function(d, i) {
      // SVG translations place the top-left corner of the element at (x,y).
      // Ideally, the icon would be centered at (x,y) so we must compensate
      // by centering the SVG bounding box.
      var bbox = this.getBBox();
      var centerX = latLngToX(d) - bbox.width / 2;
      var centerY = latLngToY(d) - bbox.height / 2;
      return 'translate(' + centerX + ',' + centerY + ')';
    };

    var resolveIcon = function(d, i) {
      // Look for an icon DOM element stored in the data.
      // Fallback to a function that returns a DOM element defined
      // in options.
      if(d.icon) return d.icon;
      if(options.iconFn) return options.iconFn.call(this, d, i);
      throw new Error(
        "An icon must be specified as DOM element in the data point's icon" +
        " field or a function that returns icon DOM elements must be provided" +
        " in options.iconFn."
      );
    };

    var resolveCssClass = function(el, cssClass) {
      // if d.cssClass is defined, then append d.cssClass to
      // the existing class attribute.
      var currentClass = el.getAttribute('class');
      var selection = d3.select(el);
      if(cssClass && !selection.classed(cssClass)) {
        currentClass += ' ' + cssClass;
      }
      return currentClass;
    };

    var resolveIconCssClass = function(d, i) {
      return resolveCssClass(this, d.cssClass);
    };

    var resolveHoverOverCssClass = function(el, d) {
      var cssClass = options.hover.overClass;
      if(d.hover) {
        cssClass = d.hover.overClass ? d.hover.overClass : cssClass;
      }
      return cssClass;
    };

    var resolveHoverOutCssClass = function(el, d) {
      var cssClass = options.hover.outClass;
      if(d.hover) {
        cssClass = d.hover.outClass ? d.hover.outClass : cssClass;
      }
      return cssClass;
    };

    var applyHoverCssClasses = function(el, d, hoverOn) {
      var selection = d3.select(el);
      selection.classed(resolveHoverOverCssClass(el, d), hoverOn);
      selection.classed(resolveHoverOutCssClass(el, d), !hoverOn);
    };

    var getSelection = function() {
      return layer.selectAll('.' + options.cssClass);
    };

    var setupHoverEvents = function() {
      var dispatch = d3.dispatch('hoverOver', 'hoverOut');

      var icons = getSelection();

      icons.on("mouseover", function(d, i) {
        applyHoverCssClasses(this, d, true);
        dispatch.hoverOver.apply(this, [d, i]);
      });

      icons.on("mouseout", function(d, i) {
        applyHoverCssClasses(this, d, false);
        dispatch.hoverOut.apply(this, [d, i]);
      });

      dispatch.on("hoverOver.icon", options.hover.overFn);
      dispatch.on("hoverOut.icon", options.hover.outFn);
    };

    // Draw icons layer

    options = overrideProps(defaultOptions, options);

    var icons = getSelection().data(data);

    icons.enter()
      .append(resolveIcon)
      .classed(options.cssClass, true)
    ;

    icons
      .attr('transform', genTranslateStr)
      .attr('class', resolveIconCssClass)
    ;

    icons.exit().remove();

    setupHoverEvents();

  };


  if(Datamap !== undefined) {
    // Adding the plugin to a Datamaps instance binds
    // to the Datamaps prototype, so we create an arbitrary
    // instance and add the icons plugin.
    var dm = new Datamap({ element: document.createElement('div') });
    dm.addPlugin(PLUGIN_NAME, iconsPlugin);
  }

  return iconsPlugin;

}());
