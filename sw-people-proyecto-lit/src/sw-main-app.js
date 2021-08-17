import { LitElement, html, css } from 'lit-element';

import './sw-header.js'
import './sw-footer.js'
import './sw-main-page.js'

class SwMainApp  extends LitElement {

  static get styles() {
    return css`
      body {
        padding: 25px;
        background-color: white;
        color: black;
        font-size: 25px;
      }
      .dark-mode {
        background-color: black;
        color: white;
      }
    `;
  }

  static get properties() {
    return {
      darkModeEnabled: {type: Boolean},
    };
  }

  constructor() {
    super();
    this.darkModeEnabled = JSON.parse(localStorage.getItem("darkModeEnabled"));
  }

  catchDarkMode(e) { 
    var main = this.shadowRoot.querySelector('sw-main-page');
   main.darkModeEn(e.detail);
   this.darkModeEnabled = e.detail;
  }
  render() {
    return html`
    <sw-header @dark-mode-clicked="${this.catchDarkMode}"></sw-header>
    <sw-main-page .enabledDarkMode="${this.darkModeEnabled}"></sw-main-page>
    <sw-footer></sw-footer>
    `;
  }
}

customElements.define('sw-main-app', SwMainApp);