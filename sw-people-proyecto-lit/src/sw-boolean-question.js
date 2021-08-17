import { LitElement, html, css } from 'lit-element';

class SwBooleanQuestion  extends LitElement {

  static get styles() {
    return css`
    .container { 
        display:flex;
        flex-direction: column;
        justify-content: center;
        align-items: rigth; 
        height: 100px;
        width: 100%;
    }
    .radiocontainer { 
        display:flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center; 
        height: 40px;
        width: 100%;
        font-family: 'Aldrich';
        font-size: 20px;
    }
    .textcontainer { 
        display:flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center; 
        height: 20px;
        width: 100%;
        font-family: 'Aldrich';
        font-size: 20px;
    }
    `;
  }

  static get properties() {
    return {
        questionText:{type:String},
        darkModeEn:{type:Boolean},
        idObj:{type:Number},
    };
  }

  constructor() {
    super();
    this.questionText = '';
    this.darkModeEn = false;
    this.idObj = 0;
  }
  darkMode(e){ 
    if (e) { 
        this.shadowRoot.querySelector('.textcontainer').style.color = 'white';
        this.shadowRoot.querySelector('.radiocontainer').style.color = 'white';
      } else { 
        this.shadowRoot.querySelector('.textcontainer').style.color = 'black';
        this.shadowRoot.querySelector('.radiocontainer').style.color = 'black';
      }
  }
  radioButtonClickEvent(e) { 
    console.log(e.target.value);
    this.dispatchEvent(new CustomEvent('event-radio-button-click',{
      bubbles: true,
      composed: true,
      detail: {
          selectedOpt: JSON.parse(e.target.value),
          indice: this.idObj
      }  
    }));
}
updated() { 
    this.darkMode(this.darkModeEn);
}
firstUpdated() { 
    var darkM = JSON.parse(localStorage.getItem("darkModeEnabled"));
    this.darkMode(darkM);
}
  render() {
    return html`
     <link href='https://fonts.googleapis.com/css?family=Aldrich' rel='stylesheet'>
    <div class="container">
        <div class="textcontainer">
            ${this.questionText}
        </div>
        <div class="radiocontainer">
            <input type="radio"  @click="${this.radioButtonClickEvent}" name="radio-group" value=true>
            <label>Verdadero</label>
        </div>
        <div class="radiocontainer">
            <input type="radio"  @click="${this.radioButtonClickEvent}" name="radio-group" value=false>
            <label>Falso</label>
        </div>
    </div>
    `;
  }
}

customElements.define('sw-boolean-question', SwBooleanQuestion);