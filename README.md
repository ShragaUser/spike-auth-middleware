# [Spike](https://github.com/rabiran/OSpike) npm module: "spike-auth-middleware"

This REPO is a Spike npm module that can be used to recieve a Authorization Bearer Token express.js middleware to allow certain scopes to certain endpoints.


### Install
```
npm install spike-auth-middleware
```

### Usage

```js
const { getSpikeAuthMiddleWare } = require("spike-auth-middleware");

const configuration = {
    audience: 'very-important-audience',
    allowedScopes: ["READ"],
    secretOrKey: 'key'
};

const allowForReadScopeOnly =  getSpikeAuthMiddleWare(configuration);

// express.js code:
app.get('/', allowForReadScopeOnly, (req,res,next) => {
    res.status(200).send('allowed for read scope');
})
```

### Options For getSpikeAuthMiddleWare

* _audience_: (String) audience to demand in JWT payload
* _secretOrKey_: (Buffer/String) secret to authenticate JWT signature with
* _allowedScopes_: (Array) list of all allowed scopes in this middleware







