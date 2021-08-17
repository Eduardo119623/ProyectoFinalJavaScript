import { LitElement, html, css } from 'lit-element';

class SwFlipCard  extends LitElement {

  static get styles() {
    return css`
      .flip-card {
        background-color: transparent;
        text-align: center;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
        color: black;
        border: 0;
        flex-grow: 0;
        flex-shrink: 0;
        margin-left: 10px;
        margin-top: 5px;
        margin-bottom: 5px;
        width:200px;
        height:265px;
      }
      h2{
        font-family: 'Aldrich';
        font-size: 22px;
     }
     p{
        font-family: 'Aldrich';
        font-size: 18px;
     }
      .flip-card-inner {
        position: relative;
        width: 100%;
        height: 100%;
        text-align: center;
        transition: transform 0.6s;
        transform-style: preserve-3d;
        box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
      }
      
      .flip-card:hover .flip-card-inner {
        transform: rotateY(180deg);
      }
      
      .flip-card-front, .flip-card-back {
        position: absolute;
        width: 100%;
        height: 100%;
        -webkit-backface-visibility: hidden;
        backface-visibility: hidden;
      }
      
      .flip-card-front {
        background-color: #bbb;
        color: black;
      }
      
      .flip-card-back {
        background-color: #FFE81F;
        color: black;
        transform: rotateY(180deg);
      }
    `;
  }

  static get properties() {
    return {
        data: {type:Object},
        srcImage: {type:String},
        typeId: {type:String}
    };
  }

  constructor() {
    super();
    this.data = {};
    this.srcImage = "";
    this.typeId ="";
  }
  writeObject(inde) { 
    switch (inde) {
        case "1":
            return html `
            <h2>Episodio ${this.data.episode_id} ${this.data.title}</h2> 
            <p>${this.data.director}</p> 
            <p>${this.data.release_date}</p>
            `
        case "2":
            return html `
            <h2>${this.data.name}</h2> 
            <p> modelo: <br> ${this.data.model}</p> 
            <p>costo: <br> ${this.data.cost_in_credits}</p>
            <p>clase: <br> ${this.data.vehicle_class}</p>
            `;
        case "3":
            return html `
            <h2>${this.data.name}</h2> 
            <p> modelo: <br> ${this.data.model}</p> 
            <p>costo: <br> ${this.data.cost_in_credits}</p>
            <p>clase: <br> ${this.data.starship_class}</p>
            `;
        default:
          console.log("nada");
        break;
    }
  }
  render() {
    return html`
    <link href='https://fonts.googleapis.com/css?family=Aldrich' rel='stylesheet'>
     <div class="flip-card">
            <div class="flip-card-inner">
                <div class="flip-card-front">
                    <img src="${this.srcImage}" alt="image" style="width:100%;height:100%;">
                </div>
                <div class="flip-card-back">
                    ${this.writeObject(this.typeId)}
                </div>
            </div>
        </div>
    `;
  }
}

customElements.define('sw-flip-card', SwFlipCard);