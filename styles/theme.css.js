import { css } from 'lit';

/**
 * Re-usable styles to inject theme variables into components.
 */

export default css`
  :host {
    --link: var(--gdwc-link, var(--indigo-7));
    --link-visited: var(--gdwc-link-visited, var(--grape-7));
    --text-1: var(--gdwc-text-1, var(--gray-9));
    --text-2: var(--gdwc-text-2, var(--gray-7));
    --surface-1: var(--gdwc-surface-1, var(--gray-0));
    font-family: var(--gdwc-font-family, var(--font-sans));
    line-height: var(--gdwc-font-lineheight, var(--font-lineheight-3));
  }

  :where(a):where([href]) {
    text-decoration-color: var(--gdwc-link, var(--indigo-2));
  }
  :where(a):where([href]):where(:visited) {
    text-decoration-color: var(--gdwc-link, var(--grape-2));
  }

  @media (prefers-color-scheme: dark) {
    :host {
      --text-1: var(--gdwc-text-1, var(--gray-1));
      --text-2: var(--gdwc-text-2, var(--gray-4));
      --surface-1: var(--gdwc-surface-1, var(--gray-9));
    }
  }
`;
