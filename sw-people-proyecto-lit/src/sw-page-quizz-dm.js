import { LitElement} from 'lit-element';

class SwPageQuizzDm  extends LitElement {

    async getQuizzObject() { 
        const response = await fetch('../../resources/quizzObject.json');
        const {questions} = await response.json();
        this.dispatchEvent(new CustomEvent('get-quizz-object',{
            bubbles: true,
            composed: true,
            detail: {
                data: questions,
            }  
          }));
    }
}

customElements.define('sw-page-quizz-dm', SwPageQuizzDm);