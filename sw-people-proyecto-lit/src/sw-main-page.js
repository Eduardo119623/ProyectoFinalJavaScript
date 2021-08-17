import { LitElement, html, css } from 'lit-element';
import './sw-search-bar-iu.js'
import './sw-search-bar-dm.js'
import './sw-user-options-ui.js'
import './sw-user-options-dm.js'
import './sw-people-list-ui.js'
import './sw-people-list-dm.js'
import './sw-people-detail-page-ui.js'
import './sw-people-detail-page-dm.js'
import './sw-page-quizz-ui.js'
import './sw-scores-saved.js'
import './sw-storage-manager.js'
import './sw-fav-table.js'

class SwMainPage  extends LitElement {

  static get styles() {
    return css`
      .mainpage {
        display:flex;
        position: fixed;
        height: 78vh;
        left: 0;
        bottom: 10vh;
        width: 100vw;
        color: white;
      }
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
    `;
  }

  static get properties() {
    return {
        mainpeopleList: {type: Array},
        auxMainpeopleList: {type: Array},
        peopleListSelected:{type: Array},
        loadedFinish: {type: Boolean},
        listIsEmpty: {type:Boolean},
        detailPeopleObject: {type:Object},
        overFlowList: {type:String},
        peopleFilms:{type: Array},
        peopleStarships:{type: Array},
        peopleVehicles:{type: Array},
        peopleSpecies:{type:Array},
        pagerManagerId:{type:String},
        scoresSaved: {type:Array},
        setOverLay: {type:Boolean},
        favStoreObject: {type:Object},
        userOptionsSelectedId:{type:String},
        favSaved: {type:Array},
        isFavTableSel: {type: Boolean},
        enabledDarkMode:{type:Boolean},
        peoplePlanets:{type: Array}
    };
  }

  constructor() {
    super();
    this.mainpeopleList = [];
    this.auxMainpeopleList =[];
    this.peopleListSelected = [];
    this.loadedFinish = false;
    this.listIsEmpty = false;
    this.overFlowList = "hidden";
    this.detailPeopleObject = {};
    this.peopleFilms = [];
    this.peopleStarships = [];
    this.peopleVehicles = [];
    this.peopleSpecies = [];
    this.peoplePlanets = [];
    this.pagerManagerId = "1";
    this.scoresSaved = [];
    this.setOverLay = false;
    this.favStoreObject = {};
    this.favSaved = [];
    this.isFavTableSel = true;
    this.userOptionsSelectedId = "1";
    this.enabledDarkMode = false;
  }
  catchGetTotalPeople(e) { 
    this.overFlowList = "scroll";
    this.loadedFinish = true;
    this.listIsEmpty = false;
    this.mainpeopleList = e.detail.peopleList;
  }
  catchSearchEvent(e) { 
      console.log(e.detail);
      if (e.detail !== ""){ 
        this.overFlowList = "hidden";
        this.loadedFinish = false;
        this.shadowRoot.querySelector("sw-search-bar-dm").getSearchPeople(e.detail);
      } else { 
        this.getTotalPeple();
      }
  }
  catchUserButtonEvent(e) { 
      switch (e.detail) {
          case "1":
          /*  const localArray = JSON.parse(localStorage.getItem("peopleListSelected"));
            if (localArray.length === 0) { 
                this.listIsEmpty = true;
                this.auxMainpeopleList = this.mainpeopleList;
            } 
            this.peopleListSelected = [];
            this.mainpeopleList = localArray;*/
            this.setOverLay = true;
            this.userOptionsSelectedId = "1";
            this.isFavTableSel = true;
            var favs = JSON.parse(localStorage.getItem('favs'));
            if (favs === null) { 
              this.favSaved = [];
            } else { 
              this.favSaved = favs;
            }
          break;
          case "2":
            //localStorage.setItem("peopleListSelected",JSON.stringify(this.peopleListSelected));
            if (this.peopleListSelected.length !== 0) { 
              this.setOverLay = true;
              this.userOptionsSelectedId = "2";
              this.favStoreObject = {
                peopleList: this.peopleListSelected,
                date: new Date()
              }
            }
          break;
          case "3":
            this.setOverLay = true;
            this.userOptionsSelectedId = "1";
            this.isFavTableSel = false;
            var favs = JSON.parse(localStorage.getItem('favs'));
            if (favs === null) { 
              this.favSaved = [];
            } else { 
              this.favSaved = favs;
            }
          break; 
          case "4":
            this.pagerManagerId = "3";
          break;
          case "5":
            var s = JSON.parse(localStorage.getItem('scores'));
            if (s === null) { 
              this.scoresSaved = [];
            } else { 
              this.scoresSaved = s;
            }
            this.pagerManagerId = "4";
          break; 
          default:
            console.log("nada");
          break;
      }
  }
  catchGetPeopleSearch(e) { 
      this.overFlowList = "scroll";
      this.listIsEmpty = false;
      this.mainpeopleList = e.detail.peopleList;
      this.loadedFinish = true;
      console.log(this.mainpeopleList);
  }
  catchButtonDetailAction(e) { 
      console.log(e.detail);
      this.pagerManagerId = "2";
      this.detailPeopleObject = e.detail;
      console.log(this.shadowRoot.querySelector("sw-people-detail-page-dm"));
  }
  catchAddSelectionCardAction(e) { 
      console.log(this.peopleListSelected);
      this.peopleListSelected.push(e.detail);
      console.log(this.peopleListSelected);
  }
  catchRemoveSelectionCardAction(e) {
    const index = this.peopleListSelected.indexOf(e.detail);
    if (index > -1) {
        this.peopleListSelected.splice(index, 1);
    }
    console.log(this.peopleListSelected);
}
  firstUpdated() {
      this.enabledDarkMode = JSON.parse(localStorage.getItem("darkModeEnabled"));
      this.darkModeEn(this.enabledDarkMode);
      this.getTotalPeple();
  }
  getTotalPeple() { 
    this.loadedFinish = false;
    this.overFlowList = "hidden";
    this.shadowRoot.querySelector("sw-people-list-dm").getTotalPeople();
  }
  catchReturnActionDetail() { 
    this.pagerManagerId = "1";
  }
  catchReturnActionList() { 
    this.listIsEmpty = false;
    this.mainpeopleList = this.auxMainpeopleList;
  }
  catchEraseScoreEvent(e) {
    var index = e.detail.row;
    var s = JSON.parse(localStorage.getItem('scores'));
    console.log(s[index]);
    if (index > -1) {
      s.splice(index, 1);
    }
    localStorage.setItem("scores",JSON.stringify(s));
    this.scoresSaved = JSON.parse(localStorage.getItem('scores'));
  }
  catchCloseStorageManagerEvent() { 
    this.setOverLay = false;
    this.peopleListSelected = [];
  }
  catchFavTableButtonEvent() { 
    this.setOverLay = false;
  }
  darkModeEn(e) { 
    if (e) { 
      this.shadowRoot.querySelector('.mainpage').style.background = 'black';
      this.shadowRoot.querySelector('.mainpage').style.color = 'white';
    } else { 
      this.shadowRoot.querySelector('.mainpage').style.background = 'white';
      this.shadowRoot.querySelector('.mainpage').style.color = 'black';
    }
  }
  pagerManager(managerId){ 
    switch (managerId) { 
      case "1": 
      return html `
        <sw-search-bar-iu @search-event-writing = "${this.catchSearchEvent}"></sw-search-bar-iu>
        <sw-search-bar-dm @get-people ="${this.catchGetPeopleSearch}"></sw-search-bar-dm>
        <sw-user-options-ui @user-button-event="${this.catchUserButtonEvent}"></sw-user-options-ui>
        <sw-people-list-ui @return-button-action="${this.catchReturnActionList}" .isEmpty="${this.listIsEmpty}" .overFlowList="${this.overFlowList}" .loadedFinish="${this.loadedFinish}" .peopleList="${this.mainpeopleList}" @button-detail-action="${this.catchButtonDetailAction}" @add-selection-card-action="${this.catchAddSelectionCardAction}" @remove-selection-card-action="${this.catchRemoveSelectionCardAction}"></sw-people-list-ui>
        <sw-people-list-dm @get-total-people=${this.catchGetTotalPeople}></sw-people-list-dm>
      `;
      case "2":
        return html `
        <sw-people-detail-page-ui @return-button-action="${this.catchReturnActionDetail}" .people="${this.detailPeopleObject}"> </sw-people-detail-page-ui>
        `;
      case "3":
        return html `
        <sw-page-quizz-ui .darkMode="${this.enabledDarkMode}" @return-button-action="${this.catchReturnActionDetail}"></sw-page-quizz-ui>
        `;
      case "4":
        return html `
        <sw-scores-saved .scores="${this.scoresSaved}" @erase-score-event="${this.catchEraseScoreEvent}" @return-button-action="${this.catchReturnActionDetail}"></sw-scores-saved>
        `;
      default: 
      console.log("nada");
    }
  }
  catchFavTableSeleEvent(e) { 
    this.mainpeopleList = e.detail.people;
    this.setOverLay = false;
  }

  catchFavTableEraseEvent(e) { 
    var index = e.detail.index;
    var s = JSON.parse(localStorage.getItem('favs'));
    console.log(s[index]);
    if (index > -1) {
      s.splice(index, 1);
    }
    localStorage.setItem("favs",JSON.stringify(s));
    this.favSaved = JSON.parse(localStorage.getItem('favs'));
  }
  userOptionsSelected(id){ 
    switch(id) { 
      case "1": 
      return html `
      <sw-fav-table @fav-table-erase-event="${this.catchFavTableEraseEvent}" @fav-table-sele-event="${this.catchFavTableSeleEvent}" .isSel="${this.isFavTableSel}" .favs="${this.favSaved}" @fav-table-button-event="${this.catchFavTableButtonEvent}"></sw-fav-table>
      `;
      case "2": 
      return html `
      <sw-storage-manager @close-storage-manager-event="${this.catchCloseStorageManagerEvent}" storeKey="favs" .storeObject="${this.favStoreObject}"></sw-storage-manager>
      `;
      case "3":

        return html `
      
        `;
    }
  }
  render() {
    return html`
    ${this.setOverLay ? html `
    <div id="overlay">
      ${this.userOptionsSelected(this.userOptionsSelectedId)}
    </div>
    `: html ``}
    <div class="mainpage">
      ${this.pagerManager(this.pagerManagerId)}
    </div>
    `;
  }
}

customElements.define('sw-main-page', SwMainPage);