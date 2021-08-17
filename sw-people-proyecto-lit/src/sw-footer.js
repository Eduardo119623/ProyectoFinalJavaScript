import { LitElement, html, css } from 'lit-element';

class SwFooter  extends LitElement {

  static get styles() {
    return css`
    .footer {
        position: fixed;
        left: 0;
        bottom: 0;
        height: 10vh;
        width: 100%;
        color: white;
        text-align: center;
        background-image: url('https://media.giphy.com/media/TZf4ZyXb0lXXi/giphy.gif');
        background-repeat: no-repeat;
        background-size: 100% 100%;
      }
    `;
  }

  static get properties() {
    return {};
  }

  constructor() {
    super();
  }

  render() {
    return html`
    <footer class="footer">
    </footer>
    `;
  }
}

customElements.define('sw-footer', SwFooter);