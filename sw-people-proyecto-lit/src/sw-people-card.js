import { LitElement, html, css } from 'lit-element';
import 'fa-icons';

class SwPeopleCard  extends LitElement {

  static get styles() {
    return css`
    * {
        box-sizing: border-box;
    }
    link {
        display: none;
      }
    body {
        font-family: Arial, Helvetica, sans-serif;
    }
    .column {
        float: left;
        width: 25%;
        padding: 10px 10px;
    }
    @media screen and (max-width: 600px) {
        .column {
            width: 100%;
            display: block;
            margin-bottom: 20px;
        }
    }
    .card {
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
        padding: 16px;
        text-align: center;
        background-color: #f1f1f1;
        color: black;
        white-space: nowrap;
    }
    button{
        border: none;
        outline: 0;
        display: inline-block;
        padding: 8px;
        color: white;
        background-color: #000;
        text-align: center;
        cursor: pointer;
        width: 100%;
        font-size: 12px;
    }
    
    button:hover, a:hover {
        opacity: 0.7;
      }
      .button {
        background-color: #ddd;
        border: none;
        color: black;
        padding: 10px;
        width: 30px;
        height: 30px;
        text-decoration: none;
        margin: 4px 2px;
        cursor: pointer;
        float: right;
        border-radius: 15px;
      }
      
      .button:hover {
        background-color: #f1f1f1;
      }
    `;
  }

  static get properties() {
    return {
        people: {type: Object},
        indice:{type: Number},
        isFav: {type:Boolean}
    };
  }

  constructor() {
    super();
    this.people = {};
    this.indice = 0;
    this.isFav = false;
  }
  buttonDetailAction() { 
    this.dispatchEvent (new CustomEvent('button-detail-action',{
        composed: true,
        bubbles : true,
        detail: this.people,
        }));
  }
  selectedCard(e) { 
      const card = this.shadowRoot.getElementById("card");
      console.log(card);
      if (card.style.backgroundColor === "") { 
        card.style.backgroundColor = "gray";
        this.dispatchEvent (new CustomEvent('add-selection-card-action',{
            composed: true,
            bubbles : true,
            detail: this.people,
            }));
      } else {
        card.style.backgroundColor = "#ddd";
        card.style.color = "black";
        this.dispatchEvent (new CustomEvent('remove-selection-card-action',{
            composed: true,
            bubbles : true,
            detail: this.people,
            }));
      }
  }
  toggleFavButton(e) { 
      this.isFav = !this.isFav;
      const favButton = this.shadowRoot.getElementById("favButton");
      if (this.isFav) { 
        favButton.style.backgroundColor = "black";
        favButton.style.color = "white";
        this.dispatchEvent (new CustomEvent('add-selection-card-action',{
            composed: true,
            bubbles : true,
            detail: this.people,
            }));
      } else { 
        favButton.style.backgroundColor = "#ddd";
        favButton.style.color = "black";
        this.dispatchEvent (new CustomEvent('remove-selection-card-action',{
            composed: true,
            bubbles : true,
            detail: this.people,
            }));
      }
  }
  render() {
    return html`
    <div class="column"> 
        <div class="card">
            <button class="button" @click="${this.toggleFavButton}" id="favButton"><fa-icon class="far fa-heart" size="1em"></fa-icon></button><br><br>
            <h3>${this.people.name}</h3> 
            <b>Genero:</b><p>${this.people.gender}</p>
            <b>Cumpleaños:</b><p>${this.people.birth_year}</p>
            <b>Masa:</b><p>${this.people.mass} kg</p>
            <b>Estatura:</b><p>${this.people.height} cm</p>
            <p><button @click=${this.buttonDetailAction}>DETALLE</button></p>
        </div>
    </div>
    `;
  }
}

customElements.define('sw-people-card', SwPeopleCard);