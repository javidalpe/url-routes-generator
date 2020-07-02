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
import generator from "url-routes-generator";

export const Routes = {
  home: params                     => generator.build("/")(params),
  invoices: params                 => generator.build("/invoices")(params),
  invoice: (id, params)            => generator.build("/invoices/:id", {id})(params),
  sendInvoice: (id, email, params) => generator.build("/invoices/:id/sendto/:email", {id, email})(params),
  about: params                    => generator.build("/about")(params)
};
```

A more complex example using a default prefix:

```javascript
import generator from "url-routes-generator";

const apiGenerator = generator.create({ baseURL: "/api/v1/" });

const Routes = {
  home: params       => generator.build("/")(params),
  about: params      => generator.build("/about")(params),

  api: {
    messages: params => apiGenerator.build("/messages")(params),
    message: id      => apiGenerator.build("/messages/:id", {id})(),
  }
};

```

You can also use full URLs:

```javascript
import generator from "url-routes-generator";

const externalGenerator = generator.create({ baseURL: "https://help.example.com" });

const Routes = {
  faq: () => externalGenerator.build("/faq")()
};

```

Then, you can call the Routes object to generate a valid URL.

### Generate a route
Following the examples above, you can get the routes by doing:

```javascript
console.log(Routes.home()); // /
console.log(Routes.about()); // /about
console.log(Routes.invoice(23)); // /invoices/23
console.log(Routes.sendInvoice(23, "hello@example.com")); // /invoices/23/sendto/hello@example.com
console.log(Routes.invoices({orderBy:"date")); // /about?orderBy=date
console.log(Routes.invoice(23, {print:true, page: 2})); // /invoices/23?print=true&page=2
console.log(Routes.api.messages({ unread: true }); // /api/v1/messages?unread=true
console.log(Routes.api.message(15)); // /api/v1/messages/15
console.log(Routes.faq()); // https://help.example.com/faq
```

Example usage with react-router:

```javascript
<Link to={Routes.about()}>About us</Link>
<Link to={Routes.invoice(23)}>Invoice</Link>
<Redirect to={Routes.about({source: "dashboard"})}/>
```

Example usage with axios:

```javascript
axios.get(Routes.api.messages()).then( /* ... */ );
axios.get(Routes.api.message(15)).then( /* ... */ );
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

## Config
You can specify global defaults that will apply to every route.

### Global defaults

```javascript
generator.defaults.baseURL = "/api/v1/";
```

### Custom instance defaults

```javascript
// Set config defaults when creating the instance
const instance = generator.create({
  baseURL: "https://api.example.com"
});

// Alter defaults after instance has been created
instance.defaults.baseURL = "https://different.api.com";
```

## Upgrading

### 1.x -> 2.x

#### Module Import
In 2.x the generator is exported as an object:

Before:
```javascript
import { uri } from "url-routes-generator";

const route = uri("/home")();
```

After:
```javascript
import generator from "url-routes-generator";

const route = generator.build("/home")();
```

_Note: using `uri` will still work but we encourage the use of `generator` starting from version 2.x._

## Typescript
Type declarations are included with the package.

## License
Open-sourced software licensed under the [MIT license](http://opensource.org/licenses/MIT)
