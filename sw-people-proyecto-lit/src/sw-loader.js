import { LitElement, html, css } from 'lit-element';

class SwLoader  extends LitElement {

  static get styles() {
    return css`
    .loadercontainer { 
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        height: 80px;
        width: 80px;
    }
    #loader {
        position: absolute;
        left: 75%;
        top: 75%;
        z-index: 1;
        width: 100%;
        height: 100%;
        margin: -76px 0 0 -76px;
        border: 16px solid #BDC3C7;
        border-radius: 50%;
        border-top: 16px solid blue;
        border-bottom: 16px solid blue;
        -webkit-animation: spin 2s linear infinite;
        animation: spin 2s linear infinite;
      }
      @-webkit-keyframes spin {
        0% { -webkit-transform: rotate(0deg); }
        100% { -webkit-transform: rotate(360deg); }
      }
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
      .animate-bottom {
        position: relative;
        -webkit-animation-name: animatebottom;
        -webkit-animation-duration: 1s;
        animation-name: animatebottom;
        animation-duration: 1s
      }
      
      @-webkit-keyframes animatebottom {
        from { bottom:-100px; opacity:0 } 
        to { bottom:0px; opacity:1 }
      }
      
      @keyframes animatebottom { 
        from{ bottom:-100px; opacity:0 } 
        to{ bottom:0; opacity:1 }
      }
    `;
  }

  static get properties() {
    return {};
  }

  constructor() {
    super();
  }
  showLoader() { 
   this.shadowRoot.getElementById("loader").style.display = "inline";
  }

  removeLoader() { 
    this.shadowRoot.getElementById("loader").style.display = "none";
  }

  render() {
    return html`
    <div class="loadercontainer"> 
        <div id="loader"></div>
    </div>
    `;
  }
}

customElements.define('sw-loader', SwLoader);