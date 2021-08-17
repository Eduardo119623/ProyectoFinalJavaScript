import { LitElement, html, css } from 'lit-element';

class SwTextQuestion  extends LitElement {

  static get styles() {
    return css`
    .container { 
        display:flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: rigth; 
        height: 150px;
        width: 100%;
    }
    p { 
        font-family: 'Aldrich';
        font-size: 20px;
        color: white;
    }
     input { 
        font-family: 'Aldrich';
        font-size: 20px;
        color: black;
        height: 20px;
        width: 150px;
    }
    `;
  }
  inputChangeEvent(e) { 
      const answer = e.target.value.trim().toLowerCase();
      this.dispatchEvent(new CustomEvent('input-change-event',{
        bubbles: true,
        composed: true,
        detail: {
            ans: answer,
            indice: this.indice
        }  
      }));
  }

  static get properties() {
    return {
        questionText: {type: String},
        darkModeEn:{type:Boolean},
        indice: {type:Number},
    };
  }

  constructor() {
    super();
    this.questionText = '';
    this.indice = 0;
    this.darkModeEn = false;
  }
  darkMode(e){ 
    if (e) { 
        this.shadowRoot.querySelector('p').style.color = 'white';
        this.shadowRoot.querySelector('input').style.background = 'white';
      } else { 
        this.shadowRoot.querySelector('p').style.color = 'black';
        this.shadowRoot.querySelector('input').style.background = '#F2F3F4';
      }
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
        <p>${this.questionText}</p><br>
        <input @keyup="${this.inputChangeEvent}" type="text"> 
    </div>
    `;
  }
}

customElements.define('sw-text-question', SwTextQuestion);