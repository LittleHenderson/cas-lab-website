/* Deliberately small SVG dialect for cas_svg.py and cas_cubes.py.
 * Reconstruct, never import, untrusted markup. Incoming CSS is not supported:
 * the renderer emits no inline styles and its one stylesheet is fixed below.
 * When the renderer changes, update this policy and its regression fixtures.
 */
const CASDiagramSanitizer = (() => {
  'use strict';
  const NS = 'http://www.w3.org/2000/svg';
  const tags = new Set('svg g defs filter feGaussianBlur feDropShadow marker path rect line polyline polygon circle ellipse text tspan title desc'.split(' '));
  const numeric = new Set('x y x1 y1 x2 y2 cx cy r rx ry width height dx dy refX refY markerWidth markerHeight stdDeviation opacity fill-opacity stroke-opacity flood-opacity stroke-width stroke-dasharray stroke-dashoffset font-size font-weight'.split(' '));
  const tokens = new Set('role display visibility text-anchor dominant-baseline alignment-baseline stroke-linecap stroke-linejoin fill-rule clip-rule paint-order pointer-events orient filterUnits primitiveUnits markerUnits preserveAspectRatio'.split(' '));
  const references = new Set(['filter','marker-start','marker-mid','marker-end']);
  const color = /^(?:#[\da-f]{3,8}|[a-z]+|rgba?\([\d.,%\s]+\))$/i;
  const fragment = /^url\(#([A-Za-z_][\w.-]*)\)$/;
  // This trusted constant is copied from cas_cubes.py's renderer, not the input.
  const cubeCSS = '.cas-cube{cursor:grab;touch-action:none;outline:none}.cas-cube:active{cursor:grabbing}.cas-cube:hover .cube-glow,.cas-cube:focus .cube-glow{opacity:.2}.cas-cube[aria-pressed="true"] .cube-glow{opacity:.32}.cas-cube[aria-pressed="true"] .cube-border{stroke:#fafafa;stroke-width:2}.cube-control{cursor:pointer;outline:none}.cube-control:focus rect{stroke:#fff}.cube-control[aria-pressed="true"] rect{fill:#25405b}.cube-label{pointer-events:none}';

  function attributeAllowed(name, value) {
    // The cube inspector copies this dataset field into an SVG fill attribute.
    // Validate it as paint, rather than treating it as inert label data.
    if (name === 'data-stroke' || name === 'data-fill') return color.test(value);
    // These are inert strings; runtime consumers must continue treating labels
    // and records as text, never HTML/CSS/script or a navigation destination.
    if (/^(?:data|aria)-[a-z0-9-]+$/.test(name)) return true;
    if (name === 'id') return /^[A-Za-z_][\w.-]*$/.test(value);
    if (name === 'class') return /^[\w -]*$/.test(value);
    if (name === 'tabindex') return /^(?:0|-1)$/.test(value);
    if (numeric.has(name)) return /^[+\-\d.eE,%\s]+$/.test(value);
    if (tokens.has(name)) return /^[a-zA-Z0-9 -]+$/.test(value);
    if (name === 'fill' || name === 'stroke' || name === 'flood-color') return color.test(value);
    if (references.has(name)) return value === 'none' || fragment.test(value);
    if (name === 'viewBox' || name === 'points') return /^[+\-\d.eE,\s]+$/.test(value);
    if (name === 'd') return /^[MmZzLlHhVvCcSsQqTtAa+\-\d.eE,\s]+$/.test(value);
    if (name === 'transform') return /^(?:(?:matrix|translate|scale|rotate|skewX|skewY)\([+\-\d.eE,\s]+\)\s*)+$/.test(value);
    if (name === 'font-family') return /^[a-zA-Z0-9 ,_-]+$/.test(value);
    return false;
  }

  function sanitize(svgText) {
    if (typeof svgText !== 'string' || svgText.length > 2097152) return null;
    const parsed = new DOMParser().parseFromString(svgText, 'image/svg+xml');
    const source = parsed.documentElement;
    if (parsed.doctype || parsed.querySelector('parsererror') || source?.localName !== 'svg' || source.namespaceURI !== NS) return null;
    const output = document.createElementNS(NS, 'svg');
    const pending = [[source, output, 0]];
    let count = 0;
    while (pending.length) {
      const [input, clean, depth] = pending.pop();
      if (++count > 20000 || depth > 64) return null;
      // Identical policy for the root and every descendant. All namespaced
      // attributes (including xml:base and xlink:href) are discarded.
      for (const attr of input.attributes) {
        if (!attr.namespaceURI && attributeAllowed(attr.name, attr.value)) clean.setAttribute(attr.name, attr.value);
      }
      for (const child of input.childNodes) {
        if (child.nodeType === Node.TEXT_NODE || child.nodeType === Node.CDATA_SECTION_NODE) {
          clean.append(document.createTextNode(child.textContent));
        } else if (child.nodeType === Node.ELEMENT_NODE && child.namespaceURI === NS && tags.has(child.localName)) {
          const element = document.createElementNS(NS, child.localName);
          clean.append(element);
          pending.push([child, element, depth + 1]);
        }
      }
    }
    if (output.hasAttribute('data-cas-cubes')) {
      const style = document.createElementNS(NS, 'style');
      style.textContent = cubeCSS;
      output.prepend(style);
    }
    return output;
  }
  return Object.freeze({sanitize});
})();
