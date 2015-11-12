// package.js
// Author: Joel Lubrano
// Meteor package configuration file

Package.describe({
  summary: "A plugin to the Datamaps library that provides support for overlaying svg icons.",
  version: "0.2.5",
  name: "jdlubrano:datamaps-icons",
  git: "https://github.com/jdlubrano/datamaps-icons.git"
});

Package.onUse(function(api) {
  api.versionsFrom('0.9.0');
  api.use('hyperborea:datamaps@1.0.5', 'client');
  api.imply('hyperborea:datamaps', 'client');
  api.addFiles(['build/datamaps-icons.js'], 'client');
});

Package.onTest(function(api) {
  api.use("jdlubrano:datamaps-icons");
  api.use(["tinytest", "test-helpers"]);
  api.addFiles("tests/tinytest/plugin-is-defined-test.js", "client");
});

