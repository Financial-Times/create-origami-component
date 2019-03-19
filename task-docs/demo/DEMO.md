## `demo`

`oat demo`
flags: 
- `--serve` or `s` [Boolean]
- `--watch` or `w` [Boolean]
- `--brand` or `b` [String] One of 'master', 'internal', 'whitelabel'. Defaults to 'master'.
Setup:
  ├─ gets component's `origami.json`
  │    ├─ shared demo config [object]
  │    │   ├─ demo react template [file]
  │    │   ├─ demo variant rules [array]
  │    │   ├─ demo browserFeaters [array]
  │    │   ├─ demo documentClasses [string]
  │    │   ├─ demo dependencies [string]
  │    │   └─ ...
  │    └─ individual demo config [object] 
  │        ├─ title [string]
  │        ├─ description [string]
  │        ├─ name [string]
  │        └─ data object with same keys as variant rules [object]
  │
  ├─ generates HTML for each demo
  │    └─ outputs {demo-name}.html [file]
  │        ├─ demo title
  │        ├─ shared documentClasses
  │        ├─ shared browserFeatures [head:<script>]
  │        ├─ shared dependencies [head:<script>]
  │        ├─ shared styles [head:<link>]
  │        ├─ entry element with id [body:<main>]
  │        └─ demo-name.js(x) [body:<script>] (output below)
  │
  ├─ generates SCSS for each demo styles [file]
  │    └─ outputs {demo-name}.scss [file]
  │        ├─ brand
  │        ├─ main.scss [component styles]
  │        └─ demo.scss [demo styles]
  │
  └─ generates sandbox for each demo (bundled with Parcel) 

Server
	¯\_(ツ)_/¯