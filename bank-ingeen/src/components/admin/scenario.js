import { LitElement, html, css } from 'lit';
import '@lion/ui/define/lion-combobox.js';
import '@lion/ui/define/lion-option.js';
import '@lion/ui/define/lion-input.js';
import '@lion/ui/define/lion-fieldset.js';
import '@lion/ui/define/lion-checkbox.js';
import '@lion/ui/define/lion-listbox.js';

class Scenario extends LitElement {
  // This will make sure the component does not have a shadow root
  createRenderRoot() {
    return this;
  }

  static styles = css``;

  static properties = {
    listboxData: { type: Array },
    columnData: { type: Array },
  };

  submit() {
    console.log(this.columnData);
  }

  render() {
    this.listboxData = ['deneme', 'test'];
    this.columnData = [
      {
        name: 'column1',
        isKey: true,
        editable: false,
        view: true,
        description: 'description',
      },
      {
        name: 'column2',
        isKey: false,
        editable: true,
        view: true,
        description: 'description',
      },
    ];
    this.roles = ['A', 'B', 'C'];

    return html`
      <lion-fieldset name="tableGroup" label="Table">
        <lion-combobox name="combo" label="Table Name">
          ${this.listboxData.map(
            (entry, i) =>
              html`
                <lion-option .checked="${i === 0}" .choiceValue="${entry}"
                  >${entry}</lion-option
                >
              `
          )}
        </lion-combobox>

        <lion-input label="View Name"></lion-input>

        <div class="table-responsive">
          <table class="table table-striped table-sm">
            <thead>
              <tr>
                <th scope="col">Column</th>
                <th scope="col">Key</th>
                <th scope="col">Edit</th>
                <th scope="col">View</th>
              </tr>
            </thead>
            <tbody>
              ${this.columnData.map(
                entry =>
                  html`
                <tr>
                  <td>${entry.name}</td>
                  <td><input type="checkbox" .checked=${entry.isKey}></lion-checkbox> </td>
                  <td><input type="checkbox" .checked=${entry.editable}></td>
                  <td><lion-input>${entry.description}</lion-input> </td></td>
                </tr>
                  `
              )}
            </tbody>
          </table>
        </div>

        <lion-listbox name="starterRoles" label="Giriş Rolleri" multiple-choice>
          ${this.roles.map(
            entry =>
              html` <lion-option .choiceValue=${entry}>${entry}</lion-option> `
          )}
        </lion-listbox>

        <lion-listbox name="approverRoles" label="Onay Rolleri" multiple-choice>
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
