import { browser, element, by } from 'protractor';
import { protractor } from 'protractor/built/ptor';

describe('Login', function() {
  const EC = protractor.ExpectedConditions;

  // Login form
  const username = element(by.id('mat-input-1'));
  const password = element(by.id('mat-input-2'));
  const loginButton = element(by.css('.submit-button'));

  beforeEach(function() {
    browser.get('http://localhost:4200/');
  });

  it('Should log in', function() {
    expect(browser.getTitle()).toEqual(
      'Fuse - Angular 6+ Material Design Admin Template'
    );
    username.sendKeys('Admin');
    password.sendKeys(
      'f5486a9039bc7afbfb6b486e7420f57697b5274ecffb6d1aa736d7b4c3368ce4'
    );
    loginButton.click();
    browser.wait(EC.urlIs('http://localhost:4200/sample'), 5000);
    expect(browser.getCurrentUrl()).toContain('/sample');
  });
});
