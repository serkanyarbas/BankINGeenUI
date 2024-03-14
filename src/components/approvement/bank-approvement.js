import { LitElement, html, css } from 'lit';
import '@lion/ui/define/lion-combobox.js';
import '@lion/ui/define/lion-select-rich.js';
import { SessionMixin } from '../../mixin/sessionMixin.js';
import '@lion/ui/define/lion-input.js';

class Approvement extends SessionMixin(LitElement) {
  // This will make sure the component does not have a shadow root
  createRenderRoot() {
    return this;
  }

  static styles = css``;

  static properties = {
    tableData: { type: Object },
  };

  submit(item) {
    fetch('http://localhost:8080/checker/approve-decline/list/v1', {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json',
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify({
        approvementId: item.approvementId,
        checkerUserId: 2,
        approved: true,
      }), // body data type must match "Content-Type" header
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error, status = ${response.status}`);
        }
        return response.json();
      })
      .then(data => {});
  }

  firstUpdated() {
    fetch('http://localhost:8080/checker/approvement/list/v1', {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json',
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify({
        userCode: 'ibrahima',
      }), // body data type must match "Content-Type" header
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error, status = ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        this.tableData = data.approvementList;
      });
  }

  render() {
    return html`
      <div class="table-responsive">
        <h2>eski hali</h2>
        ${this.tableData?.map(
          (entry, i) =>
            html`
              <table class="table table-striped table-sm">
                <thead>
                  <tr>
                    ${this.tableData[i]?.columnMeta.map(
                      (entry, i) =>
                        html` <th scope="col">${entry.columnName}</th> `
                    )}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    ${this.tableData[i].oldContent.map(
                      (entry, i) => html` <td>${entry.columnValue}</td> `
                    )}
                  </tr>
                </tbody>
              </table>
            `
        )}
      </div>

      <div class="table-responsive">
        <h2>yeni hali</h2>

        ${this.tableData?.map(
          (entry, i) =>
            html`
              <table class="table table-striped table-sm">
                <thead>
                  <tr>
                    ${this.tableData[i]?.columnMeta.map(
                      (entry, i) =>
                        html` <th scope="col">${entry.columnName}</th> `
                    )}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    ${this.tableData[i].newContent.map(
                      (entry, i) => html` <td>${entry.columnValue}</td> `
                    )}
                  </tr>
                </tbody>
              </table>

              <lion-button
                class="w-100 btn btn-lg btn-primary"
                @click=${this.submit(entry)}
                >Approve</lion-button
              >
            `
        )}
      </div>
    `;
  }
}

customElements.define('hack-approve', Approvement);
