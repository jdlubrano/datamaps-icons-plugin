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

  var DEFAULT_DATA = [
    {
      lat: 10,
      lng: 10
    }
  ];

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

  var verifyPath = function($icon) {
    expect($icon.is('path')).toBe(true);
    expect($icon.attr('d')).toBe(TEST_VALUES.path.d);
    expect($icon.attr('fill')).toBe(TEST_VALUES.path.fill);
  };

  var verifyRect = function($icon) {
    expect($icon.is('rect')).toBe(true);
    expect(+$icon.attr('width')).toBe(TEST_VALUES.rect.width);
    expect(+$icon.attr('height')).toBe(TEST_VALUES.rect.height);
    expect($icon.attr('fill')).toBe(TEST_VALUES.rect.fill);
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

    verifyPath($icon1);
    verifyRect($icon2);
  });

  it('should allow icons to be set via iconFn in the options object', function() {
    var data = DEFAULT_DATA;
    var opts = {
      iconFn: IconFactory.rect
    };
    var dm = new Datamap({ element: map });
    dm.icons(data, opts);

    verifyRect($(map).find('.datamap-icon').eq(0));
  });

  it('should override the option-level icons with data-level icons', function() {
    var data = [
      {
        lat: 1,
        lng: 1,
        icon: IconFactory.path()
      },
      {
        lat: 2,
        lng: 2
      }
    ];

    var opts = {
      iconFn: IconFactory.rect
    };

    var dm = new Datamap({ element: map });
    dm.icons(data, opts);

    var icons = $(map).find('.datamap-icon');
    verifyPath(icons.eq(0));
    verifyRect(icons.eq(1));
  });

  it('should take data and the index as arguments to the options iconFn', function() {
    var data = [
      {
        lat: 18,
        lng: 42,
        foo: 'bar'
      }
    ];
    var opts = {
      iconFn: function(d, i) {
        expect(d.foo).toBe(data[0].foo);
        expect(i).toBe(0);
        return IconFactory.path();
      }
    };
    var dm = new Datamap({ element: map });
    dm.icons(data, opts);
  });

  it('should allow the datamap-icon class to be overridden via the options parameter', function() {
    var opts = {
      cssClass: 'something-else'
    };
    var dm = new Datamap({ element: map });
    dm.icons(DEFAULT_DATA, opts);
    expect($(map).find('.' + opts.cssClass).length).toBe(DEFAULT_DATA.length);
    expect($(map).find('.datamap-icon').length).toBe(0);
  });

  it("should allow a data-level class to be appended to the icon's className", function() {
    var data = [
      {
        lat: 0,
        lng: 0,
        cssClass: 'foo'
      }
    ];

    var dm = new Datamap({ element: map });
    dm.icons(data);
    var icons = $(map).find('.datamap-icon');
    // icons should retain the datamap-icon class
    expect(icons.length).toBe(data.length);
    var icon = icons[0];
    expect(d3.select(icon).classed(data[0].cssClass)).toBe(true);
  });

});
