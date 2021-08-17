import { LitElement, html, css } from 'lit-element';
import 'fa-icons';

class SwSearchBarIu  extends LitElement {

  static get styles() {
    return css`
    * {
        box-sizing: border-box;
    }
    form.example input[type=text] {
        padding: 10px;
        font-size: 16px;
        border: 1px solid grey;
        float: left;
        width: 80%;
        background: #f1f1f1;
    }
    form.example button {
        position: absolute;
        height: 100%;
        width: 20%;
        top: 0%;
        rigth:100%;
        background: #2196F3;
        color: white;
        font-size: 17px;
        border: 1px solid grey;
        border-left: none;
        cursor: pointer;
    }
    form.example button:hover {
        background: #0b7dda;
    }
    form.example::after {
        content: "";
        clear: both;
        display: table;
    }
    .searchbarcontainer { 
        position: absolute;
        height: 7%;
        width: 30%;
        left: 2%;
        top: 10%;
    }
    `;
  }

  static get properties() {
    return {};
  }

  constructor() {
    super();
  }
  searchEvent() { 
      const el = this.shadowRoot.querySelector('input[type=text]');
      this.dispatchEvent (new CustomEvent('search-event-writing',{
        composed: true,
        bubbles : true,
        detail: el.value
        }));
  }
  render() {
    return html`
    <div class= "searchbarcontainer">
        <form class="example">
            <input class ="search" type="text" placeholder="Search.." name="search">
            <button type="button" @click="${this.searchEvent}"><fa-icon class="fa fa-search"></fa-icon></button>
        </form>
    </div>
    `;
  }
}

customElements.define('sw-search-bar-iu', SwSearchBarIu);