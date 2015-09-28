// HoverEventsSpec.js
// Author: Joel Lubrano

jasmine.getFixtures().fixturesPath = 'tests/fixtures';

describe('icons plugin - hover events', function() {

  var dm;
  var map;
  var hoverOverSpy;
  var hoverOutSpy;
  var $icons;

  var TEST_DATA = [
    {
      lat: 0,
      lng: 0
    },
    {
      lat: 50,
      lng: 50
    }
  ];

  var TEST_OPTS = {};

  beforeEach(function() {
    loadFixtures('map.html');
    hoverOverSpy = jasmine.createSpy('hoverOver');
    hoverOutSpy = jasmine.createSpy('hoverOut');
    TEST_OPTS.hover = {
      overFn: hoverOverSpy,
      outFn: hoverOutSpy
    };
    map = document.getElementById('map');
    dm = new Datamap({ element: map });
    dm.icons(TEST_DATA, TEST_OPTS);
    $icons = $(map).find('.datamap-icon');
  });

  var moveMouseOverIcon = function(icon) {
    // Not yet supported by phantomjs/jasmine
    // icon.dispatchEvent(new MouseEvent('mouseover'));
    var evt = document.createEvent('MouseEvent');
    evt.initMouseEvent('mouseover');
    icon.dispatchEvent(evt);
  };

  var moveMouseOutOfIcon = function(icon) {
    // Not yet supported by phantomjs/jasmine
    // icon.dispatchEvent(new MouseEvent('mouseleave'));
    var evt = document.createEvent('MouseEvent');
    evt.initMouseEvent('mouseout');
    icon.dispatchEvent(evt);
  };

  it('should call only the options.hoverOverFn on a mouse over event', function() {
    moveMouseOverIcon($icons[0]);
    expect(hoverOverSpy).toHaveBeenCalled();
    expect(hoverOutSpy).not.toHaveBeenCalled();
  });

  it('should call only the options.hoverOutFn on a mouse leave event', function() {
    moveMouseOutOfIcon($icons[0]);
    expect(hoverOutSpy).toHaveBeenCalled();
    expect(hoverOverSpy).not.toHaveBeenCalled();
  });

  it('should pass the data and the index as arguments', function() {
    moveMouseOverIcon($icons[0]);
    expect(hoverOverSpy).toHaveBeenCalledWith(TEST_DATA[0], 0);
    moveMouseOutOfIcon($icons[1]);
    expect(hoverOutSpy).toHaveBeenCalledWith(TEST_DATA[1], 1);
  });

});
