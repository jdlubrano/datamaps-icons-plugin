// HoverEventsSpec.js
// Author: Joel Lubrano

jasmine.getFixtures().fixturesPath = 'tests/fixtures';

describe('icons plugin - hover events', function() {

  var dm;
  var map;
  var hoverOverSpy;
  var hoverOutSpy;
  var $icons;
  var TEST_DATA;
  var TEST_OPTS;

  beforeEach(function() {
    TEST_DATA = [
      {
        lat: 0,
        lng: 0
      },
      {
        lat: 50,
        lng: 50
      }
    ];

    TEST_OPTS = {};

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

  it('should call only the options.hover.overFn on a mouse over event', function() {
    moveMouseOverIcon($icons[0]);
    expect(hoverOverSpy).toHaveBeenCalled();
    expect(hoverOutSpy).not.toHaveBeenCalled();
  });

  it('should call only the options.hover.outFn on a mouse leave event', function() {
    moveMouseOutOfIcon($icons[0]);
    expect(hoverOutSpy).toHaveBeenCalled();
    expect(hoverOverSpy).not.toHaveBeenCalled();
  });

  it('should pass the icon svg element as the context (i.e. this)', function() {
    moveMouseOverIcon($icons[0]);
    expect(hoverOverSpy.calls.first().object).toBe($icons[0]);
    moveMouseOutOfIcon($icons[0]);
    expect(hoverOutSpy.calls.first().object).toBe($icons[0]);
  });

  it('should pass the data and the index as arguments', function() {
    moveMouseOverIcon($icons[0]);
    expect(hoverOverSpy).toHaveBeenCalledWith(TEST_DATA[0], 0);
    moveMouseOutOfIcon($icons[1]);
    expect(hoverOutSpy).toHaveBeenCalledWith(TEST_DATA[1], 1);
  });

  it('should apply the hover-over css class by default', function() {
    moveMouseOverIcon($icons[0]);
    var icon = d3.select($icons[0]);
    expect(icon.classed('hover-over')).toBe(true);
    expect(icon.classed('hover-out')).toBe(false);
  });

  it('should apply the hover-out css class by default', function() {
    moveMouseOutOfIcon($icons[0]);
    var icon = d3.select($icons[0]);
    expect(icon.classed('hover-over')).toBe(false);
    expect(icon.classed('hover-out')).toBe(true);
  });

  it('should allow the hover-over class to be set via options.hover.overClass', function() {
    var opts = {
      hover: {
        overClass: 'hover_over_test'
      }
    };
    dm.icons(TEST_DATA, opts);
    moveMouseOverIcon($icons[0]);
    var icon = d3.select($icons[0]);
    expect(icon.classed(opts.hover.overClass)).toBe(true);        
  });

  it('should allow the hover-out class to be set via options.hover.outClass', function() {
    var opts = {
      hover: {
        outClass: 'hover_out_class'
      }
    };
    dm.icons(TEST_DATA, opts);
    moveMouseOutOfIcon($icons[0]);
    var icon = d3.select($icons[0]);
    expect(icon.classed(opts.hover.outClass)).toBe(true);
  });

  it('css classes in the data level should override those in the options level', function() {
    TEST_DATA[0].hover = {
      overClass: 'foo'
    };
    TEST_DATA[1].hover = {
      outClass: 'bar'
    };
    dm.icons(TEST_DATA, TEST_OPTS);
    var first = d3.select($icons[0]);
    var second = d3.select($icons[1]);
    moveMouseOverIcon($icons[0]);
    expect(first.classed('foo')).toBe(true);
    moveMouseOutOfIcon($icons[0]);
    expect(first.classed('hover-out')).toBe(true);
    moveMouseOutOfIcon($icons[1]);
    expect(second.classed('bar')).toBe(true);
    moveMouseOverIcon($icons[1]);
    expect(second.classed('hover-over')).toBe(true);
  });

});
