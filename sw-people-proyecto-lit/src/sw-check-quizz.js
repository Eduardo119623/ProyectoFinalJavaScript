import { LitElement, html, css } from 'lit-element';

class SwCheckQuizz  extends LitElement {

  static get styles() {
    return css`
    .container { 
        display:flex;
        position:relative;
        flex-direction: row;
        justify-content: center;
        align-items: center; 
        height: 100px;
        width: 35%;
        left:32.5%;
    }
    .btn {
        padding: 15px 25px;
        font-size: 24px;
        text-align: center;
        cursor: pointer;
        outline: none;
        color: #fff;
        border: none;
        border-radius: 15px;
        box-shadow: 0 9px #999;
      }
      .success:active {
          background-color: #46a049;
          box-shadow: 0 5px #666;
          transform: translateY(4px);
        }
        .info:active {
            background-color: #0b7dda;
            box-shadow: 0 5px #666;
            transform: translateY(4px);
          }
      .success {background-color: #04AA6D;} /* Green */
      .success:hover {background-color: #46a049;}
      .success:disabled{background-color: gray;}
      
      .info {background-color: #2196F3;} /* Blue */
      .info:hover {background: #0b7dda;}
    `;
  }

  checkQuizzButtonEvent() { 
    this.dispatchEvent(new CustomEvent('check-quizz-button-event',{
        bubbles: true,
        composed: true, 
      }));
  }

  static get properties() {
    return {
        isDisabled:{type:Boolean}
    };
  }

  constructor() {
    super();
    this.isDisabled = false;
  }

  render() {
    return html`
    <div class="container">
        <button class="btn success" @click="${this.checkQuizzButtonEvent}" ?disabled="${this.isDisabled}">Check</button>
    </div>
    `;
  }
}

customElements.define('sw-check-quizz', SwCheckQuizz);