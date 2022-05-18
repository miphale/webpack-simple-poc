# Simple webpack, bootstrap project

This an 'I am bored and wanted to play around with javascript without going crazy' project. It's setup using bootstrap, vanilla router, handlebars. We are consuming the [countries rest api](https://restcountries.com)

# Code guide
1. wtpapi.js: This is where the calls to the countries api is made. I centralised the api calls just for control. It's geared to
2. uihelper.js: all UI on the fly styling,form validations, formatting, etc are handled through here utilising handlebars helper register.
3. index.js: page routing, api initialisation, template setup is handled here.

## Install

To install run.

``` bsh
npm install
```

## Build

To build run.

``` bsh
npm run-script build
```

## Test

To test launch, you will need to install the server first.

### Installing

``` bsh
npm install --global http-server
```

### Running

``` bsh
http-server dist
```
