# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

This is `banquetNinja`, the legacy AngularJS admin frontend for "banquet.ninja" - the events/banquet-booking side of the business (contracts, venues, customers, menus/recipes, staff). It talks to a separate sibling backend, `ninjaAPI` (Express + Mongoose), over REST. Both are being replaced by `restaurant-ninja`/`restaurant-ninja-api` - see that project's own CLAUDE.md for the migration context. Treat this repo as legacy: understand it well enough to port or interoperate with it, not as a place to build new long-term functionality.

## Commands

```bash
git submodule update --init      # required before first install - see Schemas submodule below
npm install                       # postinstall runs deploy.js, a no-op unless NODE_ENV=production

npm run dev                       # webpack-dev-server on :8080 (hot reload), proxied through server.js on :3000
npm run buildDev                  # one-off webpack build, NODE_ENV=development
npm run buildProd                 # one-off webpack build, NODE_ENV=production
npm run build_stage_OnLinux       # same as buildProd but NODE_ENV=stage (used by CI)
npm run build_production_OnLinux  # used by CI for the production branch

npm start                         # node server.js - serves ./public and (outside production) proxies /build/* to webpack-dev-server
```

There is no test suite (`npm test` is a stub that exits with an error) and no linter is wired to a script (`.eslintrc.json` exists but nothing runs it).

Node is pinned in `package.json` to `4.1.1 || 4.x.x`, but CI (see below) actually builds with Node 20.x - the engines field is stale, not authoritative.

## Environment / config

There's no runtime `.env` - instead, `webpack.config.js` aliases the module `config` to `app/config/<NODE_ENV>.js` at **build time**, so a different `apiBase` (the `ninjaAPI` backend URL) gets baked into the bundle per environment:
- `development.js` -> `http://localhost:3002/api/v1`
- `stage.js` -> `https://api.stage.banquet.ninja/api/v1`
- `production.js` -> `https://api.banquet.ninja/api/v1`

`app/config/routing.js` and `app/config/app.js` (the root Angular module) are also environment-loaded through this same `config` alias mechanism.

## CI/CD

`.github/workflows/webpack.yml` runs on push to `stage`/`production`: `git submodule update --init --recursive`, `npm install`, `npm run build_<branch>_OnLinux`, then `scp`s the resulting `public/` directory to a droplet at `/var/www/banquetNinja`. `.github/workflows/main.yml` is an unused placeholder scaffold (just echoes), not a real pipeline.

## Architecture

**AngularJS 1.5 + Webpack 1, not a modern Angular/React app.** Entry point `app/main.js` bootstraps the root module (`app/config/app.js`), which composes three top-level Angular modules: `Shell` (layout/header/footer/account), `Features` (every business domain screen), `Common` (shared factories/services/filters used across features).

**Feature domains** under `app/features/`: `home`, `customers/customers`, `administration/{lookups,settings,users}`, `events/{contracts,contractsPending,rentalitems,staffMembers,venues}`, `production/{ingredients,menugroups,menuitems,menus,recipes,units}`. These map directly to the Mongo collections the `ninjaAPI` backend serves.

**Every feature is built from the same three generic scaffolds in `app/common/`, not bespoke CRUD code:**
- `tmListFactory` - backs a feature's list controller (e.g. `tmVenuesCtrl`).
- `tmDetailFactory` - backs a feature's detail/edit controller (e.g. `tmVenueDetailCtrl`). Handles load/save/delete, dirty-tracking (via the doc service's dirty check), the add/refresh/delete menu, and the "leave without saving?" confirmation dialog. A feature controller just calls `this.__proto__ = tmDetailFactory(constructorArgs)` with its own `docSvc`, `schema`, `model` name, and list/detail state names.
- `tmDocFactory` - backs a feature's data/doc service (e.g. `tmVenueDocSvc`, via `this.__proto__ = tmDocFactory('Venue', ninjaSchemas.events.Venue)`). Wraps `$dataSource` (see below) for the actual HTTP calls, and drives client-side validation.

When adding or changing a feature, the pattern to follow is: a thin `tmXCtrl`/`tmXDetailCtrl`/`tmXDocSvc` per model, wired to these three factories, not new hand-rolled controllers.

**`$dataSource` (`dataNinja/`)** is the generic REST client abstraction underneath `tmDocFactory` - `.load(modelName)` returns a resource-like object (`getOne`, `remove`, etc.) that talks to `ninjaAPI`'s generic CRUD routes (see that repo's `crudCtrl.js`).

**Schemas are shared with the backend via a git submodule, and validation runs on both sides.** `schemas/` is the `ninjaSchemas` git submodule (`github.com/patterncoder/ninjaSchemas`) - the exact same submodule (same remote) is also checked out inside `ninjaAPI` at `server/domainModels/schemas`. These are two independent working-tree checkouts of one shared schema repo, not a shared filesystem link: **a schema change (e.g. adding a field) has to be made once in the submodule and then that submodule commit pulled into both parent repos separately**, or the two apps will disagree about a model's shape. On the frontend, `tmDocFactory`'s `saveChanges` validates the in-progress doc against the schema client-side using `tmMongoose` - a vendored browser build of Mongoose (`vendor/mongoose/`) - before ever hitting the API, using the identical schema the backend also validates against.

**Auth**: a token is stored in `localStorage` and sent as the `x-access-token` header (set once in `app.js`'s `.run()` block from `$window.localStorage['token']`). There's no interceptor watching for 401s - instead, a global `$http` response interceptor in `app.js` inspects the response *body* for the literal string `"Failed to authenticate token."` and broadcasts a `loggedOut` event on `$rootScope` if found, which `$dataSource.clearCache()` + `tmAuth.logout()` + a redirect to `root.login` respond to.

**Views are Jade templates** (`.jade`), loaded via `jade-loader`/`jade-html-loader`; per-feature dialogs (add-item, etc.) are also Jade, rendered through `tmDialogSvc`.
