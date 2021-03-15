export class GdwcMenu extends HTMLElement {

  constructor() {
    super();

    this.attachShadow({ mode: 'open' });

    const template = document.createElement('template');
    template.innerHTML = `
      <div class="gdwc-menu">
        <h2>${this.getAttribute('heading')}</h2>
      </div>
    `;

    this.shadowRoot.appendChild(template.content);
  }

}