# Introduction
A simple URL generator in Javascript.

## Installation
To install the stable version:
```
	npm install --save url-routes-generator
```

This assumes you are using npm as your package manager.

## Usage
First, register your routes:
```
import { uri } from "url-routes-generator";

export const Routes = {
  home: params                     => uri("/")(params),
  invoices: params                 => uri("/invoices")(params),
  invoice: (id, params)            => uri("/invoices/:id", {id})(params),
  sendInvoice: (id, email, params) => uri("/invoices/:id/sendto/:email", {id, email})(params),
  about: params                    => uri("/about")(params)
};
```

Then, you can call the Routes object to get a valid URL.

### Get a route

```javascript
console.log(Routes.home());
```

/

```javascript
console.log(Routes.invoices());
```

/invoices

```javascript
console.log(Routes.about());
```

/about

### Get a route with params

```javascript
console.log(Routes.invoice(23));
```

/invoices/23

### Get a route with query params

```javascript
console.log(Routes.invoices({orderBy:"date"));
```

/about?orderBy=date

```javascript
console.log(Routes.invoice(23, {print:true, page: 2}));
```

/invoices/23?print=true&page=2

### Get the route pattern

If you are using react-router, this is necessary to define the routes structure.

```javascript
<Switch>
    <Route exact path={Routes.invoices()} component={Dashboard}/>
    <Route path={Routes.invoice()} component={Invoice}/>
</Switch>
```

### License

The Laravel Idempotency is open-sourced software licensed under the [MIT license](http://opensource.org/licenses/MIT)
