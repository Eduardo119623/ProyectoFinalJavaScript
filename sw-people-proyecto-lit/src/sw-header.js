import { LitElement, html, css } from 'lit-element';

class SwHeader  extends LitElement {

  static get styles() {
    return css`
.container {
    height: 12vh;
    width: 100vw;
    display: flex;
    flex-direction: row;
    justify-content:flex-end;
    background-image: url('https://fontmeme.com/permalink/210805/ade1fe3c56ef1fc2caab8b65e4dbee3c.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
    align-items: center;
  }
  .darkcontainer {
    height: 100%;
    width: 5%;
    display: flex;
    color: white;
    flex-direction: column;
    align-items: center;
    justify-content:center;
    font-family: 'Aldrich';
    font-size: 15px;
    text-align: center;
  }
    .switch {
        position: relative;
        display: inline-block;
        width: 60px;
        height: 34px;
      }
      
      .switch input { 
        opacity: 0;
        width: 0;
        height: 0;
      }.switch {
        position: relative;
        display: inline-block;
        width: 60px;
        height: 34px;
      }
      
      .switch input { 
        opacity: 0;
        width: 0;
        height: 0;
      }
      
      .slider {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #ccc;
        -webkit-transition: .4s;
        transition: .4s;
      }
      
      .slider:before {
        position: absolute;
        content: "";
        height: 26px;
        width: 26px;
        left: 4px;
        bottom: 4px;
        background-color: white;
        -webkit-transition: .4s;
        transition: .4s;
      }
      
      input:checked + .slider {
        background-color: #2196F3;
      }
      
      input:focus + .slider {
        box-shadow: 0 0 1px #2196F3;
      }
      
      input:checked + .slider:before {
        -webkit-transform: translateX(26px);
        -ms-transform: translateX(26px);
        transform: translateX(26px);
      }
      
      /* Rounded sliders */
      .slider.round {
        border-radius: 34px;
      }
      
      .slider.round:before {
        border-radius: 50%;
      }
      
      input:checked + .slider {
        background-color: #2196F3;
      }
      
      input:focus + .slider {
        box-shadow: 0 0 1px #2196F3;
      }
      
      input:checked + .slider:before {
        -webkit-transform: translateX(26px);
        -ms-transform: translateX(26px);
        transform: translateX(26px);
      }
      
      /* Rounded sliders */
      .slider.round {
        border-radius: 34px;
      }
      
      .slider.round:before {
        border-radius: 50%;
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
    console.log(this.darkModeEnabled);
  }
  darkModeClicked(e) { 
    var checkbox = this.shadowRoot.getElementById("checkbx");
    localStorage.setItem("darkModeEnabled",checkbox.checked)
    this.dispatchEvent (new CustomEvent('dark-mode-clicked',{
        composed: true,
        bubbles : true,
        detail: checkbox.checked
        }));
  }

  render() {
    return html`
    <link href='https://fonts.googleapis.com/css?family=Aldrich' rel='stylesheet'>
    <div class="container">
        <div class="darkcontainer">
            <div>
                <label> MODO OBSCURO</label>
            </div>
            <div>
                <label class="switch">
                    <input id ="checkbx"type="checkbox" @click="${this.darkModeClicked}" .checked="${this.darkModeEnabled}" >
                    <span class="slider round"></span>
                </label>
            </div>
        </div>
    </div>
    `;
  }
}

customElements.define('sw-header', SwHeader);