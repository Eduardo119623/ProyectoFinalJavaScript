import { LitElement, html, css } from 'lit-element';
import './sw-selector-image.js'
import './sw-page-quizz-dm.js'
import './sw-text-question.js'
import './sw-boolean-question.js'
import './sw-check-quizz.js'
import './sw-score.js'

class SwPageQuizzUi  extends LitElement {

  static get styles() {
    return css`
    .maincontainer {
      height: 78vh;
      left: 0;
      bottom: 10vh;
      width: 100vw;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      overflow-y: scroll;
      align-items: rigth;
    }

    h1 { 
        display: flex;
        flex-direction: row;
        text-align: center;
        justify-content: flex-start;
        align-items: rigth;
        width: 100%;
        height: 10%;
        margin: 0 auto;
    }
    a {
        text-decoration: none;
        text-align: center;
        display: flex;
        justify-content: center; 
        align-items: center; 
        width: 50px;
        height: 50px;
      }
      
      a:hover {

        background-color: #ddd;
        color: black;
      }
      .previous {
        background-color: #f1f1f1;
        color: black;
      }
      .round {
        border-radius: 10px;
      }
    `;
  }

  static get properties() {
    return {
      selectorQuestions:{type:Array},
      selectorQuestionsAnswers:{type:Array},
      textQuestions:{type:Array},
      textQuestionsAnswers:{type:Array},
      booleanQuestions:{type:Array},
      booleanQuestionsAnswers:{type:Array},
      isDisableButton:{type:Boolean},
      darkMode:{type:Boolean},
      showScore: {type:Boolean},
    };
  }

  constructor() {
    super();
    this.selectorQuestions = [];
    this.textQuestions = [];
    this.booleanQuestions = [];
    this.selectorQuestionsAnswers = [];
    this.textQuestionsAnswers = [];
    this.booleanQuestionsAnswers = [];
    this.showScore = false;
    this.numberSelAns = 0;
    this.numberBooleanAns = 0;
    this.numberTextAns = 0;
    this.isDisableButton = true;
    this.darkMode = false;
  }
  catchGetQuizzObject(e) { 
    const data = e.detail.data;
    this.selectorQuestions = data.selectors;
    for (var i=0;i<this.selectorQuestions.length;i++) { 
      this.selectorQuestionsAnswers.push(false);
    }
    this.textQuestions = data.textQuestions;
    for (var i=0;i<this.textQuestions.length;i++) { 
      this.textQuestionsAnswers.push(false);
    }
    this.booleanQuestions = data.booleanQuestions;
    for (var i=0;i<this.booleanQuestions.length;i++) { 
      this.booleanQuestionsAnswers.push(false);
    }
  }
  catchValueSelectedList (e) { 
    this.isDisableButton = false;
    this.selectorQuestions.map((sel,i) => {
      if (i === e.detail.indice) { 
        if (sel.correct ===e.detail.selectedOpt) { 
          this.selectorQuestionsAnswers[i] = true;
        } else {
          this.selectorQuestionsAnswers[i] = false;
        }
      }
    })
    console.log(this.selectorQuestionsAnswers);
  }
  catchInputChangeEvent(e) { 
    this.isDisableButton = false;
    this.textQuestions.map((q,i) => { 
      if (i === e.detail.indice) { 
        if (q.correct === e.detail.ans) { 
          this.textQuestionsAnswers[i] = true;
        } else { 
          this.textQuestionsAnswers[i] = false;
        }
      }
    })
  }
  catchRadiobButtonClickEvent(e) { 
    this.isDisableButton = false;
    this.booleanQuestions.map((q,i) => { 
      if (i === e.detail.indice) { 
        if (q.correct === e.detail.selectedOpt) { 
          this.booleanQuestionsAnswers[i] = true;
        } else { 
          this.booleanQuestionsAnswers[i] = false;
        }
      }
    })
  }

  firstUpdated() { 
    return html `
    ${this.shadowRoot.querySelector('sw-page-quizz-dm').getQuizzObject()}
    `;
  }
  returnAction(){ 
    this.dispatchEvent (new CustomEvent('return-button-action',{
        composed: true,
        bubbles : true,
        }));
  }
  catchCheckQuizzButtonEvent(){ 
    this.showScore = true;
  }
  catchScoreButtonEvent() { 
    this.showScore = false;
  }
  catchCloseStorageEvent(){ 
    this.showScore = false;
  }
  render() {
    return html`
    <sw-page-quizz-dm @get-quizz-object="${this.catchGetQuizzObject}"></sw-page-quizz-dm>
    <div class="maincontainer">
      <h1><a @click="${this.returnAction}" class="previous round">&#8249;-</a></h1>
      ${this.selectorQuestions.map((selector,i) => html `<sw-selector-image @event-value-selected-list="${this.catchValueSelectedList}" .idObj="${i}" .options="${selector.options}" .image="${selector.image}"></sw-selector-image>`)}
      ${this.textQuestions.map((q,i) => html `<sw-text-question .darkModeEn="${this.darkMode}" @input-change-event="${this.catchInputChangeEvent}" .indice="${i}" .questionText="${q.text}"></sw-text-question>`)}
      ${this.booleanQuestions.map((q,i) => html `<sw-boolean-question .darkModeEn="${this.darkMode}" @event-radio-button-click="${this.catchRadiobButtonClickEvent}" .idObj="${i}" .questionText="${q.text}"></sw-boolean-question>`)}
      <sw-check-quizz .isDisabled="${this.isDisableButton}" @check-quizz-button-event="${this.catchCheckQuizzButtonEvent}"></sw-check-quizz>
      ${this.showScore ? html `<sw-score  @close-storage-manager-event="${this.catchCloseStorageEvent}" @score-Button-event ="${this.catchScoreButtonEvent}" .selectorAnswers="${this.selectorQuestionsAnswers}" .textAnswers="${this.textQuestionsAnswers}" .booleanAnswers="${this.booleanQuestionsAnswers}"></sw-score>`: html ``}
    </div>
    `;
  }
}

customElements.define('sw-page-quizz-ui', SwPageQuizzUi);