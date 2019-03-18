## `demo`

`oat demo`
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
  ├─ generates shared styles [file]
  │
  └─ generates sandbox for each demo (bundle with Parcel) 
  <!-- └─ generates sandbox for each demo 
      ├─ outputs React sandbox structure [file|folder]
      │   ├─ sandbox component [file]
      │   └─ form elements [folder]
      │       ├─ main form component [file]
      │       ├─ text component [file]
      │       ├─ textarea component [file]
      │       ├─ select component [file]
      │       ├─ checkbox component [file]
      │       └─ ...
      └─ outputs {demo-name.js(x)} [file]
          ├─ sandbox component
          ├─ component react template
          └─ render functionality -->

Server
	¯\_(ツ)_/¯