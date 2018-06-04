import { browser, element, by } from 'protractor';
import { protractor } from 'protractor/built/ptor';

describe('Trucks', function() {
  // Edit modal
  const modalToolbar = element(by.css('.mat-toolbar-row'));
  const modalBrandField = element(by.name('brand'));
  const modalSaveButton = element(by.css('.save-button'));

  // Insering
  const addButton = element(by.css('.dx-icon-edit-button-addrow'));
  const saveButton = element(by.css('.dx-icon-save'));
  const inputFields = element.all(
    by.css('.dx-row-inserted input[class="dx-texteditor-input"]')
  );

  // Filtering
  const filterButton = element(by.css('.dx-icon-apply-filter'));
  const filterFields = element.all(
    by.css('.dx-datagrid-filter-row input[class="dx-texteditor-input"]')
  );

  // Deletion
  const deleteButton = element(by.css('.dx-icon-trash'));
  const confirmButton = element.all(by.css('.dx-dialog-button')).get(0);

  // Grid
  const firstListItem = element(by.css('tr[aria-rowindex="1"'));
  const tableRows = element.all(by.css('.dx-data-row'));
  const pages = element.all(by.css('.dx-page'));
  const pageAmounts = element.all(by.css('.dx-page-size'));

  beforeEach(function() {
    browser.get('http://localhost:4200/truckData');
  });

  it('Should add a record', function() {
    // Adding the record
    addButton.click();
    inputFields.get(0).sendKeys('967');
    inputFields.get(1).sendKeys('Koen');
    inputFields.get(2).sendKeys('XX-000-X');
    inputFields.get(3).sendKeys('100 ft.');
    saveButton.click();

    // Checking the results
    filterFields.get(0).clear();
    filterFields.get(0).sendKeys('967');
    filterButton.click();

    expect(firstListItem.getText()).toContain('Koen');
  });

  it('Should edit a record', function() {
    // Editing the record
    filterFields.get(0).sendKeys('967');
    filterButton.click();
    firstListItem.click();
    modalBrandField.clear();
    // This sendkeys sometimes malfunctions for inexplainable reasons
    modalBrandField.sendKeys('New');
    modalSaveButton.click();

    // Checking the results
    filterFields.get(0).clear();
    filterFields.get(0).sendKeys('967');
    filterButton.click();

    expect(firstListItem.getText()).toContain('New');
  });

  it('Should delete a record', function() {
    // Deleting the record
    filterFields.get(0).sendKeys('967');
    filterButton.click();
    deleteButton.click();
    confirmButton.click();

    // Checking the results
    filterFields.get(0).clear();
    filterFields.get(0).sendKeys('967');
    filterButton.click();

    expect(firstListItem.isPresent()).toBeFalsy();
  });

  it('Page amount buttons should change amount of records', function() {
    expect(tableRows.count()).toBe(10);
    pageAmounts.get(1).click();
    expect(tableRows.count()).toBe(20);
  });
});
