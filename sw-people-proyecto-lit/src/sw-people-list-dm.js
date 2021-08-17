import { LitElement, html } from 'lit-element';

class SwPeopleListDm  extends LitElement {
    async getTotalPeople() {
        const results = [];
        let url = 'https://swapi.dev/api/people/';
        do {
          const res = await fetch(url);
          const data = await res.json();
          url = data.next;
          results.push(...data.results);
        } while(url)
        this.dispatchEvent(new CustomEvent('get-total-people',{
            bubbles: true,
            composed: true,
            detail: {
                peopleList: results,
            }  
          }));
    }
}

customElements.define('sw-people-list-dm', SwPeopleListDm);