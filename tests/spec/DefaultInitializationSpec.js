// DefaultInitializationSpec.js
// Author: Joel Lubrano

jasmine.getFixtures().fixturesPath = 'tests/fixtures';

describe('icons plugin - defaults', function() {
  var map;
  var defaultData = [
    {
      lat: -10,
      lng: 10
    },
    {
      lat: 10,
      lng: -10
    }
  ];

  beforeEach(function() {
    loadFixtures('map.html');
    map = document.getElementById('map');
  });

  function verifyIconCount(selector, dataset) {
    var iconCount = $(map).find(selector).length;
    expect(iconCount).toBe(dataset.length);
  };

  it('should place one datamap-icon for each data point provided', function() {
    var dm = new Datamap({ element: map });
    dm.icons(defaultData);
    verifyIconCount('.datamap-icon', defaultData);
  });

  it('should create black circles as the default icon', function() {
    var dm = new Datamap({ element: map });
    dm.icons(defaultData);
    var icons = $(map).find('.datamap-icon');
    icons.each(function(index, el) {
      var $el = $(el);
      expect($el.is('circle')).toBe(true);
      expect($el.attr('fill')).toBe('#000');
    });
  });

  it('should add icons to a USA-only map too', function() {
    var dm = new Datamap({
      element: map,
      scope: 'usa'
    });
    dm.icons(defaultData);
    verifyIconCount('.datamap-icon', defaultData);
  });

});
