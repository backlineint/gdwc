---
inject: true
to: 'index.js'
prepend:
skip_if: import './<%= elementName %>.js';
---
import './<%= elementName %>.js';