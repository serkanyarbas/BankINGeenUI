import { LitElement, html, css } from 'lit';
import '@lion/ui/define/lion-combobox.js';
import '@lion/ui/define/lion-option.js';
import '@lion/ui/define/lion-input.js';
import '@lion/ui/define/lion-fieldset.js';
import '@lion/ui/define/lion-checkbox.js';
import '@lion/ui/define/lion-listbox.js';
import { SessionMixin } from '../../mixin/sessionMixin.js';
import '@lion/ui/define/lion-textarea.js';

class Scenario extends SessionMixin(LitElement) {
  // This will make sure the component does not have a shadow root
  createRenderRoot() {
    return this;
  }

  static styles = css``;

  static properties = {
    listboxData: { type: Array, reflect: true },
    columnData: { type: Array, reflect: true },
  };

  constructor() {
    super();
    this.listboxData = [];
  }

  submit() {
    debugger;

    const data = {
      scenarioName: this.querySelector('#scenarioName').value,
      tableName: this.querySelector('#tableSelection').value,
      columns: this.columnData,
      makerGroupId: this.querySelector('#starterRole').modelValue,
      checkerGroupId: this.querySelector('#approverRole').modelValue,
    };

    fetch('http://localhost:8080/admin/scenario/create/v1', {
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
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error, status = ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        Toastify({
          text: 'Scenario Created',
          duration: 3000,
          newWindow: true,
          close: true,
          gravity: 'top', // `top` or `bottom`
          position: 'center', // `left`, `center` or `right`
          stopOnFocus: true, // Prevents dismissing of toast on hover
          style: {
            background: 'linear-gradient(to right, #00b09b, #96c93d)',
          },
          onClick: function () {}, // Callback after click
        }).showToast();
      });
  }

  firstUpdated() {
    fetch('http://localhost:8080/admin/table/list/v1', {
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
      body: null, // body data type must match "Content-Type" header
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error, status = ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        this.listboxData = data.tableNames;
      });
  }

  render() {
    this.roles = ['1', '2', '3'];

    return html`
      <lion-fieldset name="tableGroup" label="Table">
        <lion-combobox
          id="tableSelection"
          name="combo"
          label="Table Name"
          @active-changed="${e => {
            e.preventDefault();
            if (this.tableName != e.target.value) {
              this.tableName = e.target.value;
            } else {
              return;
            }
            fetch('http://localhost:8080/admin/table/column/list/v1', {
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
                tableName: e.target.value,
              }), // body data type must match "Content-Type" header
            })
              .then(response => {
                if (!response.ok) {
                  throw new Error(`HTTP error, status = ${response.status}`);
                }
                return response.json();
              })
              .then(data => {
                this.columnData = data.tableColumns;
              });
          }}"
        >
          ${this.listboxData?.map(
            (entry, i) =>
              html`
                <lion-option .checked="${i === 0}" .choiceValue="${entry}"
                  >${entry}</lion-option
                >
              `
          )}
        </lion-combobox>

        <lion-input id="scenarioName" label="Senaryo Adı"></lion-input>

        <lion-textarea
          id="scenarioDesc"
          label="Senaryo Açıklaması"
          max-rows="4"
        ></lion-textarea>

        <div class="table-responsive">
          <table class="table table-striped table-sm">
            <thead>
              <tr>
                <th scope="col">Column</th>
                <th scope="col">Key</th>
                <th scope="col">Edit</th>
                <th scope="col">Visible</th>
              </tr>
            </thead>
            <tbody>
              ${this.columnData?.map(
                (entry, i) =>
                  html`
                    <tr>
                      <td>${entry.columnName}</td>
                      <td>
                        <input
                          name="key${i}"
                          type="checkbox"
                          .checked=${entry.isPrimaryKey}
                          @click=${() => {
                            entry.isPrimaryKey = !entry.isPrimaryKey;
                          }}
                        />
                      </td>
                      <td>
                        <input
                          name="edit${i}"
                          type="checkbox"
                          .checked=${entry.isEditable}
                          @click=${() => {
                            entry.isEditable = !entry.isEditable;
                          }}
                        />
                      </td>
                      <td>
                        <input
                          name="visible${i}"
                          type="checkbox"
                          .checked=${entry.isVisible}
                          @click=${() => {
                            entry.isVisible = !entry.isVisible;
                          }}
                        />
                      </td>
                    </tr>
                  `
              )}
            </tbody>
          </table>
        </div>

        <lion-listbox
          id="starterRole"
          name="starterRoles"
          label="Giriş Rolleri"
        >
          ${this.roles.map(
            entry =>
              html` <lion-option .choiceValue=${entry}>${entry}</lion-option> `
          )}
        </lion-listbox>

        <lion-listbox
          id="approverRole"
          name="approverRoles"
          label="Onay Rolleri"
        >
          ${this.roles.map(
            entry =>
              html` <lion-option .choiceValue=${entry}>${entry}</lion-option> `
          )}
        </lion-listbox>

        <lion-button class="w-100 btn btn-lg btn-primary" @click=${this.submit}
          >Create</lion-button
        >
      </lion-fieldset>
    `;
  }
}

customElements.define('hack-scenario', Scenario);
