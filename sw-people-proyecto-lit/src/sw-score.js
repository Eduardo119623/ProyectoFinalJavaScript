import { LitElement, html, css } from 'lit-element';
import './sw-storage-manager.js'

class SwScore  extends LitElement {

  static get styles() {
    return css`
    #overlay {
        position: fixed;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0,0,0,0.5);
        z-index: 2;
      }
      .container{ 
        position: absolute;
        display: flex;
        flex-direction: column;
        text-align: center;
        justify-content: center;
        align-items: center;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        height: 85%;
        width: 35%;
        background-color: white;
        color:black;
        overflow-y: scroll;
      }
      h1{
        font-family: 'Aldrich';
        font-size: 15px;
     }
     p {
        font-family: 'Aldrich';
        font-size: 18px;
     }

     .buttoncontainer { 
        display:flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center; 
        height: 40px;
        width: 60%;
        
    }
    .btn {
        padding: 15px 25px;
        font-size: 15px;
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
        .danger:active {
            background-color: #f44336;
            box-shadow: 0 5px #666;
            transform: translateY(4px);
        }
      .success {background-color: #04AA6D;} /* Green */
      .success:hover {background-color: #46a049;}

      .danger {background-color: #f44336;} /* Red */
      .danger:hover {background: #da190b;}
      
      .info {background-color: #2196F3;} /* Blue */
      .info:hover {background: #0b7dda;}

       p em{
        color: red;
      }
    `;
  }

  static get properties() {
    return {
        selectorAnswers:{type:Array},
        textAnswers:{type:Array},
        booleanAnswers:{type:Array},
        numberSelAns:{type:Number},
        numberBooleanAns:{type:Number},
        showStorageManager:{type:Boolean},
        numberTextAns:{type:Number},
        totalScore:{type:Number},
        medal:{type:String},
        storeObject:{type:Object},
        totalScoreOb:{type:Number}
    };
  }

  constructor() {
    super();
    this.selectorAnswers = [];
    this.textAnswers = [];
    this.booleanAnswers = [];
    this.numberSelAns = 0;
    this.numberBooleanAns = 0;
    this.numberTextAns = 0;
    this.showStorageManager = false;
    this.totalScore = 0;
    this.totalScoreOb = 0;
    this.storeObject = {};
    this.medal = '';
  }
  scoreButtonEvent(e) { 
      if (e.target.value === '1') { 
        this.dispatchEvent(new CustomEvent('score-Button-event',{
            bubbles: true,
            composed: true,
          }));
      } else { 
          this.showStorageManager = true;
          this.storeObject = {
              'selector' : this.selectorAnswers.length,
              'text' : this.textAnswers.length,
              'boolean': this.booleanAnswers.length,
              'numSele' : this.numberSelAns,
              'numText' : this.numberTextAns,
              'numBoolean': this.numberBooleanAns,
              'scoreOb': this.totalScoreOb,
              'total': this.totalScore,
              'medal': this.medal,
              'date': new Date()
          };
      }
  }
  scoreCalculate() { 
    this.selectorAnswers.map((b) => {
        if (b) { 
          this.numberSelAns++;
        }
      })
      this.textAnswers.map((b) => {
        if (b) { 
          this.numberTextAns++;
        }
      })
      this.booleanAnswers.map((b) => {
        if (b) { 
          this.numberBooleanAns++;
        }
      })
  }

  printInfo() { 
    this.totalScore = this.selectorAnswers.length + this.textAnswers.length + this.booleanAnswers.length
    this.totalScoreOb = this.numberSelAns + this.numberBooleanAns + this.numberTextAns;
    var image = "";
    var text = "";
    if (this.totalScoreOb < Math.trunc(this.totalScore/3)) { 
        this.medal = "../../resources/images/bronce.png";
        image = "../../resources/images/darthVader.png";
        text = "La Fuerza está contigo joven Skywalker... pero todavía no eres un Jedi";
    } else if ((this.totalScoreOb > Math.trunc(this.totalScore/3)) && (this.totalScoreOb < Math.trunc(2*this.totalScore/3))) { 
        this.medal = "../../resources/images/plata.png";
        image = "../../resources/images/chewbacca.png";
        text = "UUURRRGH AAARGH UUUURGH!!";
    } else  if (this.totalScoreOb > Math.trunc(2*this.totalScore/3)) { 
        this.medal = "../../resources/images/oro.png";
        image = "../../resources/images/Yoda.png";
        text = "Transmite lo que has aprendido: fuerza, maestría; pero insensatez, debilidad, fracaso también. ¡Sí, fracaso sobre todo! El mejor profesor, el fracaso es.";
    }
      return html ` 
            <img src="${image}" style="height: 150px;width: 150px;"><br>
            <p>
            "${text}"<br><br>
            Selector Imagen: ${this.numberSelAns}/${this.selectorAnswers.length}<br>
            Abiertas: ${this.numberTextAns}/${this.textAnswers.length}<br>
            True/False: ${this.numberBooleanAns}/${this.booleanAnswers.length}<br>
            <em>Total: ${this.totalScoreOb}/${this.totalScore}<br><br></em>
            </p>
            <img src="${this.medal}" style="height: 150px;width: 150px;"><br>
      `;
  }
  
  render() {
    return html`
    <link href='https://fonts.googleapis.com/css?family=Aldrich' rel='stylesheet'>
    ${this.scoreCalculate()}
     <div id="overlay">
        ${this.showStorageManager ? html `
        <sw-storage-manager storeKey="scores" .storeObject="${this.storeObject}"></sw-storage-manager>
        ` : html `
        <div class="container">
            ${this.printInfo()}
            <div class="buttoncontainer">
            <button class="btn danger" @click="${this.scoreButtonEvent}" value="1">Salir</button>
            <button class="btn success" @click="${this.scoreButtonEvent}" value="2">Save</button>
            <br>
            <br>
            </div>
        </div>
        `}
    </div>
    `;
  }
}

customElements.define('sw-score', SwScore);