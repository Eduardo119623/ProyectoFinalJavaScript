import { LitElement } from 'lit-element';

class SwSearchBarDm  extends LitElement {
    async getSearchPeople(name) {
        const results = [];
        let url = 'https://swapi.dev/api/people/' + '?search=' + name;
        do {
          const res = await fetch(url);
          const data = await res.json();
          url = data.next;
          results.push(...data.results);
        } while(url)
        this.dispatchEvent(new CustomEvent('get-people',{
            bubbles: true,
            composed: true,
            detail: {
                peopleList: results,
            }  
          }));
    }
}

customElements.define('sw-search-bar-dm', SwSearchBarDm);