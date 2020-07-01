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

```javascript
import { uri } from "url-routes-generator";

export const Routes = {
  home: params                     => uri("/")(params),
  invoices: params                 => uri("/invoices")(params),
  invoice: (id, params)            => uri("/invoices/:id", {id})(params),
  sendInvoice: (id, email, params) => uri("/invoices/:id/sendto/:email", {id, email})(params),
  about: params                    => uri("/about")(params)
};
```

Then, you can call the Routes object to generate a valid URL.

### Generate a route
Printing routes:

```javascript
console.log(Routes.home()); // /
console.log(Routes.about()); // /about
console.log(Routes.invoice(23)); // /invoices/23
console.log(Routes.sendInvoice(23, 'hello@example.com')); // /invoices/23/sendto/hello@example.com
console.log(Routes.invoices({orderBy:"date")); // /about?orderBy=date
console.log(Routes.invoice(23, {print:true, page: 2})); // /invoices/23?print=true&page=2
```

Example usage with react-router:

```javascript
<Link to={Routes.about()}>About us</Link>
<Link to={Routes.invoice(23)}>Invoice</Link>
<Redirect to={Routes.about({source: "dashboard"})}/>
```

### Get the route pattern

If you are using react-router, you need to place the route pattern (`/invoices/:id`) in the route definition. To get the route pattern, call the route with no params.

Example:

```javascript
<Switch>
    <Route exact path={Routes.invoices()} component={Dashboard}/>
    <Route path={Routes.invoice()} component={Invoice}/>
</Switch>
```

### Typescript
Type declarations are included in the package.

### License

Open-sourced software licensed under the [MIT license](http://opensource.org/licenses/MIT)
