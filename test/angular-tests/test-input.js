/**
 * MUI test angular input module
 * @module test/angular-tests/test-input
 */

import assert from 'assert';

let helpers = require('./angular-helper'),
    ngModule = helpers.module,
    inject = helpers.inject,
    jqLite = helpers.jqLite;

require('../../src/angular/input.js');


describe('angular/input', function() {
  let $compile,
      scope;


  beforeEach(ngModule('mui.input'));


  beforeEach(inject(function(_$compile_, _$rootScope_) {
    $compile = _$compile_;
    scope = _$rootScope_.$new();
  }));


  afterEach(function() {
    scope.$destroy();
  });


  it('renders properly', function() {
    let s = '<mui-input ng-model="myModel"></mui-input>';
    let wrapperEl = $compile(s)(scope)[0];

    scope.$digest();

    // check wrapper <div>
    assert.equal(wrapperEl.tagName, 'DIV');
    assert.equal(jqLite.hasClass(wrapperEl, 'mui-textfield'), true);
    assert.equal(wrapperEl.children.length, 2);

    // check inner <input>
    let inputEl = wrapperEl.children[0];
    assert.equal(inputEl.tagName, 'INPUT');
    assert.equal(inputEl._muiTextfield, true);
    assert.equal(jqLite.hasClass(inputEl, 'mui--is-empty'), true);
    assert.equal(jqLite.hasClass(inputEl, 'mui--is-pristine'), true);
    assert.equal(jqLite.hasClass(inputEl, 'mui--is-untouched'), true);
    assert.equal(jqLite.hasClass(inputEl, 'mui--is-dirty'), false);
    assert.equal(jqLite.hasClass(inputEl, 'mui--is-touched'), false);
    assert.equal(jqLite.hasClass(inputEl, 'mui--is-not-empty'), false);

    // check label
    let labelEl = wrapperEl.children[1];
    assert.equal(labelEl.tagName, 'LABEL');
  });


  it('handles name attribute', function() {
    let s = '<mui-input ng-model="myModel" name="myvar"></mui-input>';
    let inputEl = $compile(s)(scope)[0].children[0];

    scope.$digest();

    // check name attribute
    assert.equal(inputEl.hasAttribute('name'), true);
    assert.equal(inputEl.getAttribute('name'), 'myvar');
  });
});
