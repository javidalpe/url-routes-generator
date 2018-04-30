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
Print routes

```javascript
console.log(Routes.home()); // /
console.log(Routes.invoices()); // /invoices
console.log(Routes.about()); // /about
```

Example usage with react-router Links

```javascript
<Link to={Routes.about()}>About us</Link>
```


### Get a route with params
Print routes

```javascript
console.log(Routes.invoice(23)); // /invoices/23
```

Example usage with react-router Links

```javascript
<Link to={Routes.invoice(23)}>About us</Link>
```

### Get a route with query params
Print routes

```javascript
console.log(Routes.invoices({orderBy:"date")); // /about?orderBy=date
console.log(Routes.invoice(23, {print:true, page: 2})); // /invoices/23?print=true&page=2
```

Example usage with react-router Redirect

```javascript
<Redirect to={Routes.about({source: "dashboard"})}/>
```

### Get the route pattern

If you are using react-router, you need to place `/invoices/:id` in the route definition. To get the route pattern, call the route with no params.

```javascript
<Switch>
    <Route exact path={Routes.invoices()} component={Dashboard}/>
    <Route path={Routes.invoice()} component={Invoice}/>
</Switch>
```

### License

The Laravel Idempotency is open-sourced software licensed under the [MIT license](http://opensource.org/licenses/MIT)
