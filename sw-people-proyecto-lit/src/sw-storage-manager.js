import { LitElement, html, css } from 'lit-element';

class SwStorageManager  extends LitElement {

  static get styles() {
    return css`
    body {
        font-family: Arial, Helvetica, sans-serif;
        background-color: black;
      }
      .container {
        position: absolute;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        text-align: left;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        height: 40%;
        width: 40%;
        background-color: white;
        color:black;
      }
      
      /* Full-width input fields */
      input[type=text], input[type=password] {
        padding: 15px;
        margin: 5px 0 22px 0;
        display: flex;
        border: none;
        background: #f1f1f1;
      }
      
      input[type=text]:focus, input[type=password]:focus {
        background-color: #ddd;
        outline: none;
      }
      
      /* Overwrite default styles of hr */
      hr {
        border: 1px solid #f1f1f1;
        margin-bottom: 25px;
      }
      
      .registerbtn {
        background-color: #04AA6D;
        color: white;
        padding: 16px 20px;
        margin: 8px 0;
        border: none;
        cursor: pointer;
        width: 100%;
        opacity: 0.9;
      }
      
      .registerbtn:hover {
        opacity: 1;
      }
    `;
  }

  static get properties() {
    return {
        storeObject: {type: Object},
        storeKey: {type:String}
    };
  }

  constructor() {
    super();
    this.storeObject = {};
    this.storeKey = '';
  }

catchSaveButtonEvent() { 
    const el = this.shadowRoot.querySelector('input[type=text]');
    var texto = el.value.trim();
    if (texto != "") { 
        var ob = {};
        ob[texto] = this.storeObject;
        var exitingScores = JSON.parse(localStorage.getItem(this.storeKey));
        if ( exitingScores === null) { 
            localStorage.setItem(this.storeKey,JSON.stringify([]));
            exitingScores = JSON.parse(localStorage.getItem(this.storeKey));
        }
        exitingScores.push(ob);
        localStorage.setItem(this.storeKey,JSON.stringify(exitingScores));
        this.dispatchEvent(new CustomEvent('close-storage-manager-event',{
            bubbles: true,
            composed: true,
          }));
    }
}
  render() {
    return html`
    <div class="container">
        <h1>&nbsp;Registro</h1>
        <p>&nbsp;Introduzca su nombre para guardar</p>
        <hr>
        <label for="Nombre"><b>&nbsp;Nombre</b></label>
        <input type="text" placeholder="Nombre" name="Nombre" id="Nombre" maxlength="5">
        <button type="submit" @click="${this.catchSaveButtonEvent}" class="registerbtn">Guardar</button>
    </div>
    `;
  }
}

customElements.define('sw-storage-manager', SwStorageManager);