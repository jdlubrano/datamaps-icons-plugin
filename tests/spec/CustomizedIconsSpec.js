// CustomizedIconsSpec.js
// Author: Joel Lubrano

jasmine.getFixtures().fixturesPath = 'tests/fixtures';

describe('icons plugin - custom icons', function() {
  var SVG_NS = 'http://www.w3.org/2000/svg';
  var map;

  var TEST_VALUES = {
    path: {
      d: "M 0 0 l 0 50 l 50 0 l -50 -50",
      fill: 'blue'
    },
    rect: {
      width: 30,
      height: 20,
      fill: 'red'
    }
  };

  var IconFactory = {
    path: function() {
      var icon = document.createElementNS(SVG_NS, 'path');
      icon.setAttribute('d', TEST_VALUES.path.d);
      icon.setAttribute('fill', TEST_VALUES.path.fill);
      return icon;
    },
    rect: function() {
      var icon = document.createElementNS(SVG_NS, 'rect');
      icon.setAttribute('width', TEST_VALUES.rect.width);
      icon.setAttribute('height', TEST_VALUES.rect.height);
      icon.setAttribute('fill', TEST_VALUES.rect.fill);
      return icon;
    }
  };

  beforeEach(function() {
    loadFixtures('map.html');
    map = document.getElementById('map');
  });

  it('should allow icons to be set for each data point', function() {
    var data = [
      {
        lat: 0,
        lng: 0,
        icon: IconFactory.path()
      },
      {
        lat: 15,
        lng: -15,
        icon: IconFactory.rect()
      }
    ];
    var dm = new Datamap({ element: map });
    dm.icons(data);
    var icons = $(map).find('.datamap-icon');
    var $icon1 = icons.eq(0);
    var $icon2 = icons.eq(1);

    expect($icon1.is('path')).toBe(true);
    expect($icon1.attr('d')).toBe(TEST_VALUES.path.d);
    expect($icon1.attr('fill')).toBe(TEST_VALUES.path.fill);

    expect($icon2.is('rect')).toBe(true);
    expect(+$icon2.attr('width')).toBe(TEST_VALUES.rect.width);
    expect(+$icon2.attr('height')).toBe(TEST_VALUES.rect.height);
    expect($icon2.attr('fill')).toBe(TEST_VALUES.rect.fill);
  });

  it('should allow icons to be set via a function in the options object', function() {
    expect(false).toBe(true);
  });

  it('should override the option-level icons with data-level icons', function() {
    expect(false).toBe(true);
  });

});
