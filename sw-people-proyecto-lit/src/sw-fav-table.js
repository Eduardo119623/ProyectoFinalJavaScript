import { LitElement, html, css, unsafeCSS} from 'lit-element';
const mainColorFavTable = css`red`;

class SwFavTable  extends LitElement {

  static get styles() {
    return css`
    .container{ 
        position: absolute;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: rigth;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        height: 45%;
        width: 60%;
        color:black;
        overflow-y: scroll;
      }
      table {
        border-collapse: collapse;
        border-spacing: 0;
        width: 100%;
        border: 1px solid #ddd;
        background-color: #7D3C98; 
        color:black;
      }
      
      th, td {
        text-align: center;
        padding: 16px;
        font-family: 'Aldrich';
        font-size: 15px;
      }

      tr:nth-child(even) {
        background-color:  #EBDEF0; 
      }
      .btn { 
        position: absolute;
        top: 5%;
        left: 0%;
        text-align: center;
        height: 8%;
        width: 8%;
        background-color: gray;
        border-radius: 0%;
      }
    `;
  }

  static get properties() {
    return {
        favs:{type:Array},
        isSel:{type:Boolean},
        mainColor:{type:String},
        secondColor:{type:String}
    };
    
  }

  constructor() {
    super();
    this.favs = [];
    this.isSel = true;
    this.mainColor = 'red';
    this.secondColor = 'blue';
  }
  catchReturnButton() { 
    this.dispatchEvent(new CustomEvent('fav-table-button-event',{
        bubbles: true,
        composed: true,
      }));
  }
  cellAction(e){ 
    var currentRow = e.target.closest('tr');
    var id = currentRow.id;
    if (this.isSel) { 
        var list = [];
        this.favs.map((f,i) => {
            var key = Object.keys(f)[0];
            var obj = f[key];
            if (i == id) { 
                list = obj.peopleList
            }
        })
        this.dispatchEvent(new CustomEvent('fav-table-sele-event',{
            bubbles: true,
            composed: true,
            detail: {
                people: list
            }
        }));
    } else { 
        this.dispatchEvent(new CustomEvent('fav-table-erase-event',{
            bubbles: true,
            composed: true,
            detail: {
                index: id
            }
        }));
    }
    

  }
  render() {
    return html`
    <div class="container">
        <h1><button  class="btn" @click="${this.catchReturnButton}">X</button></h1>
        <table>
            <tr>
                <th><b>NOMBRE</b></th>
                <th><b>FECHA</b></th>
                ${this.isSel ? html `<th><b>SELECCIONAR</b></th>`: html `<th><b>ELIMINAR</b></th>`}
            </tr>
            ${this.favs.map(((f,i) => {
                var key = Object.keys(f)[0];
                var obj = f[key];
                var date = new Date(obj.date);
                var today = date.getDate()+'-'+(date.getMonth()+1) +'-'+ date.getFullYear();
                var time = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
                return html `
                <tr id="${i}">
                    <th>${key}</th>
                    <th>${today + ' ' + time}</th>
                    <th><a @click="${this.cellAction}" style="color: blue;text-decoration:underline;">${this.isSel ? html `Seleccionar`: html `Eliminar`}</a></th>
                </tr>
                     `;
                    }))}
        </table>
    </div>
    `;
  }
}

customElements.define('sw-fav-table', SwFavTable);