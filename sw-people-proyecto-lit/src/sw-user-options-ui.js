import { LitElement, html, css } from 'lit-element';

class SwUserOptionsUi  extends LitElement {

  static get styles() {
    return css`
      .useroptionscontainer{
        display:flex;
        position: absolute;
        height: 75%;
        width: 30%;
        left: 2%;
        top: 20%;
        flex-direction: column;
        align-items: center;
        justify-content:center;
        justify-content: space-between;
      }
      .userbutton { 
        height: 15%;
        width: 80%;
        background-color: #5499C7;
        font-family: 'Aldrich';
        font-size: 15px;
        text-align: center;
        padding: 0px;
        margin: 0 auto;
        padding: 0;
        border-radius: 5px;
      }
    `;
  }

  static get properties() {
    return {};
  }

  constructor() {
    super();
  }

  userButtonAction(e) { 
    this.dispatchEvent (new CustomEvent('user-button-event',{
        composed: true,
        bubbles : true,
        detail: e.target.value
        }));
  }

  render() {
    return html`
     <link href='https://fonts.googleapis.com/css?family=Aldrich' rel='stylesheet'>
    <div class="useroptionscontainer">
        <button type="button" class="userbutton" value="1" @click="${this.userButtonAction}">MOSTRAR FAVORITOS</button>
        <button type="button" class="userbutton" value="2" @click="${this.userButtonAction}">GUARDAR FAVORITOS</button>
        <button type="button" class="userbutton" value="3" @click="${this.userButtonAction}">BORRAR FAVORITOS</button>
        <button type="button" class="userbutton" value="4" @click="${this.userButtonAction}">QUIZZ</button>
        <button type="button" class="userbutton" value="5" @click="${this.userButtonAction}">MOSTRAR RESULTADOS GUARDADOS</button>
    </div>
    `;
  }
}

customElements.define('sw-user-options-ui', SwUserOptionsUi);