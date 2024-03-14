import { LitElement, html, css } from 'lit';
import '@lion/ui/define/lion-input.js';
import { Router } from '@vaadin/router';

class Home extends LitElement {
  static styles = css`
    .text-center {
      margin: auto;
      width: 50%;
      padding: 10px;
    }

    .text-center .form-signin {
      width: 100%;
      max-width: 330px;
      padding: 15px;
      margin: auto;
    }

    .form-signin .checkbox {
      font-weight: 400;
    }

    .form-signin .form-floating:focus-within {
      z-index: 2;
    }

    .form-signin input[type='email'] {
      margin-bottom: -1px;
      border-bottom-right-radius: 0;
      border-bottom-left-radius: 0;
    }

    .form-signin input[type='password'] {
      margin-bottom: 10px;
      border-top-left-radius: 0;
      border-top-right-radius: 0;
    }

    .bd-placeholder-img {
      font-size: 1.125rem;
      text-anchor: middle;
      -webkit-user-select: none;
      -moz-user-select: none;
      user-select: none;
    }

    @media (min-width: 768px) {
      .bd-placeholder-img-lg {
        font-size: 3.5rem;
      }
    }
  `;

  static properties = {};

  submit() {
    window.sessionStorage.setItem('authorized', true);
    this.dispatchEvent(
      new CustomEvent('login-event', {
        bubbles: true,
        composed: true,
        detail: true,
      })
    );
    Router.go('/dashboard');
  }

  render() {
    return html`
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
        rel="stylesheet"
        integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC"
        crossorigin="anonymous"
      />
      <div class="text-center">
        <div class="form-signing">
          <form>
            <img
              class="mb-4"
              src="https://getbootstrap.com/docs/5.0/assets/brand/bootstrap-logo.svg"
              alt=""
              width="72"
              height="57"
            />
            <h1 class="h3 mb-3 fw-normal">Please sign in</h1>

            <div class="form-floating">
              <input
                type="email"
                class="form-control"
                id="floatingInput"
                placeholder="name@example.com"
              />
              <label for="floatingInput">Email address</label>
            </div>
            <div class="form-floating">
              <input
                type="password"
                class="form-control"
                id="floatingPassword"
                placeholder="Password"
              />
              <label for="floatingPassword">Password</label>
            </div>

            <div class="checkbox mb-3">
              <label>
                <input type="checkbox" value="remember-me" /> Remember me
              </label>
            </div>

            <lion-button
              class="w-100 btn btn-lg btn-primary"
              @click=${this.submit}
              >Sign in</lion-button
            >
            <p class="mt-5 mb-3 text-muted">© 2017–2021</p>
          </form>
        </div>
      </div>
    `;
  }
}

customElements.define('hack-login', Home);
