import { LitElement, html, css } from 'lit-element';
import './sw-people-card.js'
import './sw-loader.js'


class SwPeopleListUi  extends LitElement {

  static get styles() {
    return css`
    .peoplelistcontainer { 
        position: absolute;
        height: 85%;
        width: 65%;
        left: 33%;
        top: 10%;
        background-color:#FEF9E7;
        overflow-y: scroll;
        border-width: 1px;
        border-style: solid;
        border-color: #D4AC0D;
        border-radius: 8px;
    }
    .row {
        margin: 0 -5px;
    }
    .row:after {
        content: "";
        display: table;
        clear: both;
    }

    .previous {
        background-color: #f1f1f1;
        color: black;
      }
      a {
        text-decoration: none;
        display: inline-block;
        padding: 8px 16px;
      }
      
      a:hover {
        background-color: #ddd;
        color: black;
      }
    `;
  }

  static get properties() {
    return {
        peopleList: {type: Array},
        loadedFinish: {type: Boolean},
        isEmpty: {type: Boolean},
        overFlowList:{type: String}
    };
  }

  constructor() {
    super();
    this.peopleList = [];
    this.loadedFinish = false;
    this.overFlowList = "hidden";
    this.isEmpty = false;
  }

  returnAction() { 
    this.dispatchEvent (new CustomEvent('return-button-action',{
        composed: true,
        bubbles : true,
        }));
  }

  render() {
    return html`
    <div class="peoplelistcontainer" id="peoplelistcontainer" style="overflow:${this.overFlowList}"> 
        ${this.loadedFinish ? html `
        ${this.isEmpty ? html`<a class="previous" @click="${this.returnAction}">&laquo; Anterior</a>`:null}
        <div class="row">
            ${this.peopleList.map((p,i) => {
                return html `<sw-people-card .people="${p}" indice="${i}"></sw-people-card>`
            })}
        </div>`: html`<sw-loader></sw-loader>`}
    </div>
    `;
  }
}

customElements.define('sw-people-list-ui', SwPeopleListUi);