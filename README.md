# iframe-dialog

Library to use dialogs inside iframe

## Installation

NPM:  
```To do```

## API Documentations

If library is used as CDN. Functions wil be contained in object `IframeDialog`:  
i.e `window.IframeDialog._alert`  

_You would need to use this library in both parent window and iframe._

> Note: Iframe must have a unique name.
### Inside parent window

#### **`IframeDialog.Registration: Class`**
Class for registration cross-origin dialogs in parent window. Below is its methods.

#### `constructor({serviceKey: String})`  
Initialize the Registration object. **serviceKey** is required and must be equal to **serviceKey** set in Iframe part.  

#### `register()`  
Call this funtion to add post message handler to parent window.  

#### `unregister()`  
Call this funtion to remove the post message handler added to parent window.  
### Inside iframe

#### `initialize({parentOrigin: String, serviceKey: String})`

Call this API when page loaded inside Iframe. This function take parent window's origin as argument. **serviceKey** is required and must be equal to **serviceKey** in parent window part.  

#### `_alert({message: String})`

Same with normal alert

#### `_confirm({message: String, okCallback: function, cancelCallback: function})`

The 2nd param is a callback. It will be called when user click `OK` on confirm box.

#### `_prompt({message: String, okCallback: function(result), defaultValue: String})`

The 2nd param is a callback with prompt result value. It will be called when user click `OK` or `Cancel` on prompt box.

## Example

Suppose we have: `https://example.com` which contains a cross-origin iframe `https://iframe.com`.  
User will need to install iframe-dialog in **both sites**  

#### In `https://example.com`:  
With CDN:  
```javascript
const registration = new IframeDialog.Registration({serviceKey: 'ROP_KEY'});

registration.register();
``` 
With npm package:     
```javascript
import { Registration } from 'iframe-dialog';

var dialog = new Registration({serviceKey: 'ROP'})
dialog.register()
``` 

#### In `https://iframe.com`:
With CDN:  
```javascript
IframeDialog.initialize({ parentOrigin: 'https://example.com', serviceKey: 'ROP_KEY' });
```

Use dialogs:

```javascript
// alert
IframeDialog._alert({ message: 'This is a sample alert' });

// confirm
IframeDialog._confirm({
  message: 'Are you sure?',
  okCallback: () => {
    console.log('Sure');
    //Do something else
  },
});

// prompt
window.IframeDialog._prompt({
  message: 'What is your age',
  okCallback: (age) => {
    console.log('Your age is: ', age);
    //Do something else
  },
  defaultValue: 20,
});
```  
  
With npm package:  

```javascript
import { initialize, _alert, _confirm, _prompt } from 'iframe-dialog';

//init
initialize({ parentOrigin: 'https://example.com', serviceKey: 'ROP_KEY' });

// alert
_alert({ message: 'This is a sample alert' });

// confirm
_confirm({
  message: 'Are you sure?',
  okCallback: () => {
    console.log('Sure');
    //Do something else
  },
});

// prompt
_prompt({
  message: 'What is your age',
  okCallback: (age) => {
    console.log('Your age is: ', age);
    //Do something else
  },
  defaultValue: 20,
});
```


## Development

### Installation

`nvm use 12.22.1`  
`npm install` 

### Build

`npm run build:bundle`  
`npm run build:lib`

