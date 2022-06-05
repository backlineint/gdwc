import { LitElement, html } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';

export class GdwcTheme extends LitElement {
  static get properties() {
    return {
      /**
       * An object containing all allowed theme variables.
       */
      args: { type: Object },
    };
  }

  render() {
    const {
      gdwcFontFamily,
      gdwcFontLineheight,
      gdwcText1,
      gdwcText2,
      gdwcLink,
      gdwcLinkVisited,
      gdwcSurface1,
      gdwcBgLight,
      gdwcBgDark,
      gdwcPadding,
      gdwcBorderRadius,
      gdwcBorder,
      gdwcBackgroundGradient,
      gdwcShadow,
    } = this.args;
    return html`
      <div
        style=${styleMap({
          '--gdwc-font-family': gdwcFontFamily
            ? `var(${gdwcFontFamily})`
            : null,
          '--gdwc-font-lineheight': gdwcFontLineheight
            ? `var(${gdwcFontLineheight})`
            : null,
          '--gdwc-link': gdwcLink ? `var(${gdwcLink})` : null,
          '--gdwc-link-visited': gdwcLinkVisited
            ? `var(${gdwcLinkVisited})`
            : null,
          '--gdwc-text-1': gdwcText1 ? `var(${gdwcText1})` : null,
          '--gdwc-text-2': gdwcText2 ? `var(${gdwcText2})` : null,
          '--gdwc-surface-1': gdwcSurface1 ? `var(${gdwcSurface1})` : null,
          '--gdwc-bg-light': gdwcBgLight ? `var(${gdwcBgLight})` : null,
          '--gdwc-bg-dark': gdwcBgDark ? `var(${gdwcBgDark})` : null,
          '--gdwc-padding': gdwcPadding ? `var(${gdwcPadding})` : null,
          '--gdwc-border-radius': gdwcBorderRadius
            ? `var(${gdwcBorderRadius})`
            : null,
          '--gdwc-border': gdwcBorder ? `${gdwcBorder}` : null,
          '--gdwc-background-image': gdwcBackgroundGradient
            ? `var(${gdwcBackgroundGradient})`
            : null,
          '--gdwc-shadow': gdwcShadow ? `var(${gdwcShadow})` : null,
        })}
      >
        <slot></slot>
      </div>
    `;
  }
}

if (!customElements.get('gdwc-theme')) {
  customElements.define('gdwc-theme', GdwcTheme);
}
