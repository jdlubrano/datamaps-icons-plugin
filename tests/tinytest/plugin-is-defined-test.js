// plugin-is-defined-test.js
// Author: Joel Lubrano

Tinytest.add('Datamap instances have an icon method defined', function(test) {
  test.isNotUndefined(Datamap);
  var dm = new Datamap({ element: document.createElement('div') });
  test.isNotUndefined(dm.icons);
});

