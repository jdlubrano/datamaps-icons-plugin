// ClickEventsSpec.js
// Author: Joel Lubrano

jasmine.getFixtures().fixturesPath = 'tests/fixtures';

describe('icons plugin - click events', function() {

  var dm, map, clickOnSpy, clickOffSpy, icons;

  var TEST_DATA, TEST_OPTS;

  beforeEach(function() {
    TEST_DATA = [
      {
        lat: 10,
        lng: -10
      },
      {
        lat: -20,
        lng: 20
      }
    ];

    loadFixtures('map.html');
    clickOnSpy = jasmine.createSpy('clickOn');
    clickOffSpy = jasmine.createSpy('clickOff');
    
    TEST_OPTS = {
      click: {
        onFn: clickOnSpy,
        offFn: clickOffSpy
      }
    };

    map = document.getElementById('map');
    dm = new Datamap({ element: map });
    dm.icons(TEST_DATA, TEST_OPTS);
    icons = map.getElementsByClassName('datamap-icon');
  });

  var clickIcon = function(idx) {
    var icon = icons[idx];
    var evt = document.createEvent('MouseEvent');
    evt.initMouseEvent('click');
    icon.dispatchEvent(evt);
  };

  it('should call only options.click.onFn the first time an icon is clicked', function() {
    clickIcon(0);
    expect(clickOnSpy).toHaveBeenCalled();
  });

  it('should call options.click.offFn the second time an icon is clicked', function() {
    clickIcon(0);
    expect(clickOffSpy).not.toHaveBeenCalled();
    clickIcon(0);
    expect(clickOffSpy).toHaveBeenCalled();
  });

  it('should pass the icon svg element as the context (i.e. this)', function() {
    clickIcon(0);
    expect(clickOnSpy.calls.first().object).toBe(icons[0]);
    clickIcon(0);
    expect(clickOffSpy.calls.first().object).toBe(icons[0]);
    clickIcon(1);
    expect(clickOnSpy.calls.mostRecent().object).toBe(icons[1]);
    clickIcon(1);
    expect(clickOffSpy.calls.mostRecent().object).toBe(icons[1]);
  });

  it('should pass the data for the icon as the argument', function() {
    clickIcon(0);
    expect(clickOnSpy).toHaveBeenCalledWith(TEST_DATA[0]);
    clickIcon(0);
    expect(clickOffSpy).toHaveBeenCalledWith(TEST_DATA[0]);
    clickIcon(1);
    expect(clickOnSpy).toHaveBeenCalledWith(TEST_DATA[1]);
    clickIcon(1);
    expect(clickOffSpy).toHaveBeenCalledWith(TEST_DATA[1]);
  });

  it('should only allow one icon to be in clicked state at a time by default', function() {
    clickIcon(0);
    clickIcon(1);
    expect(clickOffSpy).toHaveBeenCalledWith(TEST_DATA[0]);
    expect(clickOnSpy).toHaveBeenCalledWith(TEST_DATA[1]);
    expect(d3.select(icons[0]).classed('click-on')).toBe(false);
    expect(d3.select(icons[0]).classed('click-off')).toBe(true);
    expect(d3.select(icons[1]).classed('click-on')).toBe(true);
  });

  it('should apply a class of click-on by default', function() {
    clickIcon(0);
    expect(d3.select(icons[0]).classed('click-on')).toBe(true);
    expect(d3.select(icons[0]).classed('click-off')).toBe(false);
  });

  it('should apply a class of click-off by default', function() {
    clickIcon(0);
    clickIcon(0);
    expect(d3.select(icons[0]).classed('click-on')).toBe(false);
    expect(d3.select(icons[0]).classed('click-off')).toBe(true);
  });

  it('should allow the click-on class to be overridden via options.click.onClass', function() {
    var opts = {
      click: {
        onClass: 'foo'
      }
    };
    dm.icons(TEST_DATA, opts);
    clickIcon(0);
    expect(d3.select(icons[0]).classed('foo')).toBe(true);
    expect(d3.select(icons[0]).classed('click-on')).toBe(false);
  });

  it('should allow the click-off class to be overridden via options.click.offClass', function() {
    var opts = {
      click: {
        offClass: 'foo'
      }
    };
    dm.icons(TEST_DATA, opts);
    clickIcon(0);
    clickIcon(0);
    var icon0 = d3.select(icons[0]);
    expect(icon0.classed('foo')).toBe(true);
    expect(icon0.classed('click-off')).toBe(false);
  });

  it('css classes in the data level should override those in the options level', function() {
    TEST_DATA[0].click = {
      onClass: 'foo'
    };
    TEST_DATA[1].click = {
      offClass: 'bar'
    };
    dm.icons(TEST_DATA, TEST_OPTS);
    var icon0 = d3.select(icons[0]);
    var icon1 = d3.select(icons[1]);
    clickIcon(0);
    expect(icon0.classed('foo')).toBe(true);
    expect(icon0.classed('click-on')).toBe(false);
    clickIcon(1);
    clickIcon(1);
    expect(icon1.classed('bar')).toBe(true);
    expect(icon1.classed('click-off')).toBe(false);
  });

  it('should allow multiple icons to be in the clicked state when options.click.allowMultiple is true', function() {
    TEST_OPTS.click.allowMultiple = true;
    dm.icons(TEST_DATA, TEST_OPTS);
    var icon0 = d3.select(icons[0]);
    var icon1 = d3.select(icons[1]);
    clickIcon(0);
    clickIcon(1);
    expect(icon0.classed('click-on')).toBe(true);
    expect(icon1.classed('click-on')).toBe(true);
    // sneak in a test to check that the icons operate independently.
    clickIcon(0);
    expect(icon0.classed('click-off')).toBe(true);
    expect(icon1.classed('click-on')).toBe(true);
  });

});
