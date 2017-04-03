The following examples explain the Branding Themes section of the SDK.  The API documentation on Branding Themes can be found [here](https://developer.xero.com/documentation/api/branding-themes).

### Supported functions

* Retrieve Branding Themes (all, paginated, by ID, with 'where' clause)

These functions are explained further below.

### Entity Helper

The entity helper that has been created for the branding themes functions exists in the following place:

`client.core.brandingThemes`

This helper contains the following functions:

* `getBrandingTheme(id[, modifiedAfter])`
* `getBrandingThemes([options])`

### Retrieving All Branding Themes

This example shows how to retrieve all Branding Themes in a single call.

```javascript

xeroClient.core.brandingThemes.getBrandingThemes()
   .then(function(brandingThemes) {
      //We've got some Branding Themes
      brandingThemes.forEach(function(theme){
         //do something useful
         console.log(theme.Name);
      });
   })
```

### Retrieving Branding Theme by ID

This example shows how to retrieve a Branding Theme using the Xero supplied GUID.

```javascript

var brandingThemeID = '5ff690e5-074e-4421-8f8a-c139ee15393a';

xeroClient.core.brandingThemes.getBrandingTheme(brandingThemeID)
   .then(function(theme) {
      //We've got the Branding Theme so do something useful
      console.log(theme.Name);
   });
```

### Retrieving Branding Themes with filters

This example shows how to retrieve a Branding Theme using the 'where' filter.

```javascript

//filter branding themes that have name == 'Standard'
var filter = 'Name == "Standard"';

xeroClient.core.brandingThemes.getBrandingThemes({where: filter})
   .then(function(brandingThemes) {
      //We've got some branding themes
      brandingThemes.forEach(function(theme){
         //do something useful
         console.log(theme.Name); //'Standard'
      });
   })
```

### Retrieving Branding Themes Modified Since X

This example shows how to retrieve a list of branding themes that have been updated since a specified date.

```javascript

//Return dates with an UpdatedDateUTC greater than midnight on March 24th, 2017.
var modifiedDate = new Date("March 24, 2017 00:00:00");

xeroClient.core.brandingThemes.getBrandingThemes({ modifiedAfter: modifiedDate })
   .then(function(brandingThemes) {
      //We've got some branding themes
      brandingThemes.forEach(function(theme){
         //do something useful
         console.log(theme.Name);
      });
   })
```