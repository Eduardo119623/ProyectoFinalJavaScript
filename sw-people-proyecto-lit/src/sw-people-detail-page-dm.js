import { LitElement} from 'lit-element';

class SwPeopleDetailPageDm  extends LitElement {
    async getDetailData(urls) { 
        const data = [];
        try {
            const response = await Promise.all(
              urls.map(url => fetch(url).then(res => res.json()))
            );
            return response
          } catch (error) {
            console.log('Error', error);
          }
    }
}
customElements.define('sw-people-detail-page-dm', SwPeopleDetailPageDm);