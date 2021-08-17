import { LitElement, html, css } from 'lit-element';

class SwScoresSaved  extends LitElement {

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
      .previous {
        background-color: #f1f1f1;
        color: black;
      }
      .round {
        border-radius: 12px;
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
    table {
        border-collapse: collapse;
        border-spacing: 0;
        width: 100%;
        border: 1px solid #ddd;
        background-color: #DC7633;
        color:black;
      }
      
      th, td {
        text-align: left;
        padding: 16px;
        font-family: 'Aldrich';
        font-size: 15px;
      }

      tr:nth-child(even) {
        background-color: #F6DDCC;
      }
    `;
  }

  returnAction(){ 
    this.dispatchEvent (new CustomEvent('return-button-action',{
        composed: true,
        bubbles : true,
        }));
  }

  static get properties() {
    return {
        scores:{type:Array}
    };
  }

  constructor() {
    super();
    this.scores = [];
  }
  eraseScore(e){ 
      var currentRow = e.target.closest('tr');
      this.dispatchEvent(new CustomEvent('erase-score-event',{
        bubbles: true,
        composed: true,
        detail: {
            row: currentRow.id
        }
      }));
  }
  render() {
    return html`
    <div class="maincontainer">
        <h1><a @click="${this.returnAction}" class="previous round">&#8249;-</a></h1>
        ${this.scores.length !== 0 ? html `
        <table>
            <tr>
            <th><b>NOMBRE</b></th>
            <th><b>SELECTORES</b></th>
            <th><b>ABIERTAS</b></th>
            <th><b>TRUE/FALSE</b></th>
            <th><b>TOTAL</b></th>
            <th><b>MEDALLA</b></th>
            <th><b>FECHA</b></th>
            <th><b>ELIMINAR</b></th>
            </tr>
            ${this.scores.map((s,i) => {
                var key = Object.keys(s)[0];
                var obj = s[key];
                var date = new Date(obj.date);
                var today = date.getDate()+'-'+(date.getMonth()+1) +'-'+ date.getFullYear();
                var time = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
                return html `
                <tr id="${i}">
                    <th>${key}</th>
                    <th>${obj.numSele}/${obj.selector}</th>
                    <th>${obj.numText}/${obj.text}</th>
                    <th>${obj.numBoolean}/${obj.boolean}</th>
                    <th>${obj.scoreOb}/${obj.total}</th>
                    <th><img src="${obj.medal}" style="height: 60px;width: 50px;"></th>
                    <th>${today + ' ' + time}</th>
                    <th><a @click="${this.eraseScore}" style="color: blue;text-decoration:underline;">Eliminar</a></th>
                </tr>
                `;
            })}
        </table>
        `: html ``}
    </div>
    `;
  }
}

customElements.define('sw-scores-saved', SwScoresSaved);