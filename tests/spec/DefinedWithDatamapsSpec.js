// DefinedWithDatamapsSpec.js
// Author: Joel Lubrano

describe('icons plugin - definition', function() {

  var DatamapFactory = function() {};

  DatamapFactory.create = function() {
    return new Datamap({ element: document.createElement('div') });
  };

  it('should make an icons function available on a Datamap instance', function() {
    var dm = DatamapFactory.create();
    expect(dm.icons).toBeDefined();
  });

});
