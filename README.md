<div align='center'>
    <br/>
    <br/>
    <h3>Adaptation from Esbuild plugins</h3>
    <br/>
    <br/>
</div>

# Plugins

-   [x] `@esbuild-plugins/node-modules-polyfill`

## @esbuild-plugins/node-modules-polyfill

Polyfills nodejs builtin modules for the browser

```ts
import NodeModulesPolyfills from '@esbuild-plugins/node-modules-polyfill'
import { build } from 'esbuild'
build({
    plugins: [NodeModulesPolyfills()],
})
```
