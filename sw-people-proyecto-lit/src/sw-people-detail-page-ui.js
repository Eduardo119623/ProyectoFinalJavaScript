import { LitElement, html, css } from 'lit-element';
import './sw-people-detail-page-dm.js'
import './sw-flip-card.js'

class SwPeopleDetailPageUi  extends LitElement {

  static get styles() {
    return css`
    .tablecontainer { 
        position: absolute;
        height: 42%;
        width: 75%;
        left: 50%;
        top: 30%;
        transform: translate(-50%, -50%);
        overflow-y: scroll;
    }
    .filmscontainer { 
        position: absolute;
        height: 45%;
        width: 15%;
        left: 6.25%;
        border-width: 1px;
        border-style: solid;
        border-color: #D4AC0D;
        border-radius: 8px;
        top: 52.5%;
    }
    .row{
        align-items: stretch;
        height: 100%;
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        overflow-x: auto;
        overflow-y: hidden;
        padding: 0%;
      }

    .vehiclescontainer { 
        position: absolute;
        height: 45%;
        width: 15%;
        left: 42.5%;
        top: 52.5%;
        border-width: 1px;
        border-style: solid;
        border-color: #D4AC0D;
        border-radius: 8px;
        overflow: scroll;
    }
    .starshipscontainer { 
        position: absolute;
        height: 45%;
        width: 15%;
        left: 79.5%;
        top: 52.5%;
        border-width: 1px;
        border-style: solid;
        border-color: #D4AC0D;
        border-radius: 8px;
        overflow: scroll;
    }
    h1 { 
        text-align: center;
        position: absolute;
        width: 100%;
        height: 8%;
        top: 0%;
        margin: 0 auto;
        font-family: 'Aldrich';
        font-size: 35px;
        color: white;
        background-color: black;
    }
    table {
        border-collapse: collapse;
        border-spacing: 0;
        width: 100%;
        border: 1px solid #ddd;
        background-color: #229954;
        color:black;
      }
      
      th, td {
        text-align: left;
        padding: 16px;
        font-family: 'Aldrich';
        font-size: 15px;
      }
      
      tr:nth-child(even) {
        background-color: #A9DFBF;
      }

      a {
        text-decoration: none;
        display: inline-block;
        position: absolute;
        width: 2.5%;
        height: 80%;
        top: 10%;
        left:1%;
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
        border-radius: 20%;
      }
    `;
  }

  static get properties() {
    return {
        people:{type: Object},
        films:{type: Array},
        starships:{type: Array},
        vehicles:{type: Array},
        species:{type:Array},
        imagesMovies:{type:Array},
        imageVehicles:{type:Array},
        imageShips:{type:Array},
        planets:{type: Array}
    };
  }

  constructor() {
    super();
    this.people = {};
    this.films = [];
    this.starships = [];
    this.vehicles = [];
    this.species = [];
    this.planets = [];
    this.imageShips = ['../../resources/images/v.jpg','../../resources/images/X-wing.png','../../resources/images/X-Wing2.jpg','../../resources/images/n.jpg','../../resources/images/l.jpeg','../../resources/images/mi.jpg'];
    this.imageVehicles = ['../../resources/images/Vehicles.png','../../resources/images/v1.png','../../resources/images/v2.jpg','../../resources/images/v3.png'];
    this.imagesMovies = ['../../resources/images/new.jpg','../../resources/images/m1.jpg','../../resources/images/m2.jpg','../../resources/images/m3.jpeg','../../resources/images/m4.jpeg','../../resources/images/m5.jpeg','../../resources/images/m6.jpeg','../../resources/images/m7.jpeg','../../resources/images/m8.jpeg']
  }
  async getDetailDataInfo() { 
    const detailPage = this.shadowRoot.querySelector("sw-people-detail-page-dm");
    const ve = await detailPage.getDetailData(this.people.vehicles);
    const star = await detailPage.getDetailData(this.people.starships);
    const fil = await detailPage.getDetailData(this.people.films);
    const pla = await detailPage.getDetailData([this.people.homeworld]);
    const spe = await detailPage.getDetailData(this.people.species);
    this.vehicles = ve;
    this.starships= star;
    this.films = fil;
    this.planets = pla;
    this.species = spe;
    this.printer();
  }
  firstUpdated() { 
      return html `
      ${this.getDetailDataInfo()}
      `;
  }
printer() { 
      console.log("vehiculos",this.vehicles);
      console.log("naves",this.starships);
      console.log("peliculas",this.films);
      console.log("planetas",this.planets);
      console.log("especies",this.species);
  }
  returnAction(){ 
    this.dispatchEvent (new CustomEvent('return-button-action',{
        composed: true,
        bubbles : true,
        }));
  }
  render() {
    return html`
    <sw-people-detail-page-dm></sw-people-detail-page-dm>
    <link href='https://fonts.googleapis.com/css?family=Aldrich' rel='stylesheet'>
    <h1> <a @click="${this.returnAction}" class="previous round">&#8249;-</a> ${this.people.name}</h1>
    <div class="tablecontainer"> 
    <table>
  <tr>
    <th><b>LENGUAJE</b></th>
    <th>${this.species.length === 0 ? html `n/a`: html `${this.species[0].language}`}</th>
    <th><b>PESO</b></th>
    <th>${this.people.mass} kg</th>
  </tr>
  <tr>
    <th><b>ESPECIE</b></th>
    <th>${this.species.length === 0 ? html `n/a`: html `${this.species[0].name}`}</th>
    <th><b>ALTURA</b></th>
    <th>${this.people.height} cm</th>
  </tr>
  <tr>
    <th><b>PLANETA DE ORIGEN</b></th>
    <th>${this.planets.length === 0 ? html `n/a`: html `${this.planets[0].name}`}</th>
    <th><b>COLOR DE PIEL</b></th>
    <th>${this.people.skin_color}</th>
  </tr>
  <tr>
    <th><b>GENERO</b></th>
    <th>${this.people.gender}</th>
    <th><b>COLOR DE CABELLO</b></th>
    <th>${this.people.hair_color}</th>
  </tr>
  <tr>
    <th><b>AÑO DE NACIMIENTO</b></th>
    <th>${this.people.birth_year}</th>
    <th><b>COLOR DE OJOS</b></th>
    <th>${this.people.eye_color}</th>
  </tr>
</table>
    </div>
    ${this.films.length !== 0 ? html `
    <div class="filmscontainer">
        <div class="row">
            ${this.films.map(e => {
                return html `<sw-flip-card typeId="1" .data="${e}" .srcImage="${this.imagesMovies[Math.floor(Math.random() * this.imagesMovies.length)]}"></sw-flip-card>`
            })}
        </div>
    </div>
    `: html ``}    
    ${this.vehicles.length !== 0 ? html `
    <div class="vehiclescontainer">
        <div class="row">
        ${this.vehicles.map(e => {
                return html `<sw-flip-card typeId="2" .data="${e}" .srcImage="${this.imageVehicles[Math.floor(Math.random() * this.imageVehicles.length)]}"></sw-flip-card>`
            })}
        </div>
    </div>
    `:html ``}
    ${this.starships.length !== 0 ? html `
    <div class="starshipscontainer">
        <div class="row">
        ${this.starships.map(e => {
                return html `<sw-flip-card typeId="3" .data="${e}" .srcImage="${this.imageShips[Math.floor(Math.random() * this.imageShips.length)]}"></sw-flip-card>`
            })}
        </div>
    </div>
    `:html ``}
    `;
  }
}

customElements.define('sw-people-detail-page-ui', SwPeopleDetailPageUi);