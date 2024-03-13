import { LitElement, html, css } from 'lit';

class Scenario extends LitElement {
  // This will make sure the component does not have a shadow root
  createRenderRoot() {
    return this;
  }

  static styles = css``;

  render() {
    return html` Senaryo giriş ekranı `;
  }
}

customElements.define('hack-scenario', Scenario);
