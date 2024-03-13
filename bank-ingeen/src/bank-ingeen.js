import { LitElement, html, css } from 'lit';
import { Router } from '@vaadin/router';
import './components/login/bank-login.js';
import './components/dashboard/bank-dashboard.js';

class BankIngeen extends LitElement {
  static properties = {
    header: { type: String },
  };

  static styles = css``;

  firstUpdated() {
    const router = new Router(this.shadowRoot.querySelector('.outlet'));
    router.setRoutes([
      { path: '/', component: 'hack-dashboard' },
      { path: '/login', component: 'hack-login' },
    ]);
  }

  render() {
    return html` <main class="outlet"></main> `;
  }
}

customElements.define('bank-ingeen', BankIngeen);
