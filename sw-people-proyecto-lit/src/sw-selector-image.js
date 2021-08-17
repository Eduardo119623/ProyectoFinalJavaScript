import { LitElement, html, css } from 'lit-element';

class SwSelectorImage  extends LitElement {

  static get styles() {
    return css`
    .container { 
        display:flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center; 
        height: 250px;
        width: 100%;
    }
    .imagecontainer { 
        height: 200px;
        width: 200px;
        background-color: red;
    }
    .selectorcontainer { 
        height: 10%;
        width: 20%;
        background-color: blue;
    }
    `;
  }

  static get properties() {
    return {
        image:{type:String},
        idObj:{type:Number},
        options:{type:Array}
    };
  }

  constructor() {
    super();
    this.image = "";
    this.idObj = 0;
    this.options = [];
  }
  catchValueSelected(e) { 
      this.dispatchEvent(new CustomEvent('event-value-selected-list',{
        bubbles: true,
        composed: true,
        detail: {
            selectedOpt: e.target.value,
            indice: this.idObj
        }  
      }));
  }
  
  render() {
    return html`
    <div class="container">
        <div class="imagecontainer"> <img src="${this.image}" style="height: 100%;width: 100%;"></div>
        <div class="selectorcontainer" @change="${this.catchValueSelected}">
            <select style="height: 100%;width: 100%;">
            ${this.options.map((value,i) => {
                return html `<option value="${i}">${value}</option>`;
            })}
        </select>
        </div>
    </div>
    `;
  }
}

customElements.define('sw-selector-image', SwSelectorImage);