import { LitElement, html, css } from 'lit';
import '@lion/ui/define/lion-combobox.js';
import '@lion/ui/define/lion-select-rich.js';
import { SessionMixin } from '../../mixin/sessionMixin.js';

class Demands extends SessionMixin(LitElement) {
  // This will make sure the component does not have a shadow root
  createRenderRoot() {
    return this;
  }

  static styles = css``;

  static properties = {
    listboxData: { type: Array },
    tableData: { type: Object },
  };

  submit() {
    console.log(this.tableData);
  }

  updateTableData(event, rowIndex, cellKey) {
    var old = this.tableData.scenarioRecordList[
      rowIndex
    ].columnContentList.find(item => item.columnName == cellKey);
    const newData = event.target.innerText;
    old[cellKey] = newData;
  }

  render() {
    this.listboxData = [
      'ING Asistan Bilgirimleri',
      'BDDK Bildirimleri',
      'Kampanya Bildirimleri',
    ];
    this.tableData = {
      scenarioRecordList: [
        {
          columnContentList: [
            {
              columnName: 'id',
              columnValue: 1,
              type: 'integer',
            },
            {
              columnName: 'title',
              columnValue: 'here a title',
              type: 'string',
            },
            {
              columnName: 'description',
              columnValue: 'this is description',
              type: 'string',
            },
            {
              columnName: 'language',
              columnValue: 'tr',
              type: 'string',
            },
          ],
        },
        {
          columnContentList: [
            {
              columnName: 'id',
              columnValue: 2,
              type: 'integer',
            },
            {
              columnName: 'title',
              columnValue: 'other title',
              type: 'string',
            },
            {
              columnName: 'description',
              columnValue: 'other description',
              type: 'string',
            },
            {
              columnName: 'language',
              columnValue: 'en',
              type: 'string',
            },
          ],
        },
      ],
      columnMeta: [
        {
          columnName: 'id',
          isPrimaryKey: true,
          isEditable: false,
          isVisible: false,
        },
        {
          columnName: 'title',
          isPrimaryKey: false,
          isEditable: true,
          isVisible: true,
        },
        {
          columnName: 'description',
          isPrimaryKey: false,
          isEditable: true,
          isVisible: true,
        },
        {
          columnName: 'language',
          isPrimaryKey: false,
          isEditable: false,
          isVisible: true,
        },
      ],
    };

    console.log(this.tableData);

    return html`
     <lion-fieldset name="tableGroup" label="">
      <lion-combobox name="combo" label="Select a demand">
        ${this.listboxData.map(
          (entry, i) =>
            html`
              <lion-option .checked="${i === 0}" .choiceValue="${entry}"
                >${entry}</lion-option
              >
            `
        )}
      </lion-combobox>

      <br />

      <div class="table-responsive">
        <table class="table table-sm">
          <thead>
            <tr>
              ${this.tableData.columnMeta.map(
                meta => html`
                  <th ?hidden=${!meta.isVisible}>${meta.columnName}</th>
                `
              )}
            </tr>
          </thead>
          <tbody>
            ${this.tableData.scenarioRecordList.map(
              record => html`
                <tr>
                  ${record.columnContentList.map(
                    (row, rowIndex) => html`
                      ${this.getColumnMeta(row.columnName).isVisible
                        ? html`<td
                            ?contenteditable=${this.isEditable(row.columnName)}
                            @input=${event =>
                              this.updateTableData(
                                event,
                                rowIndex,
                                row.columnName
                              )}
                          >
                            ${row.columnValue}
                          </td>`
                        : ''}
                    `
                  )}
                </tr>
              `
            )}
          </tbody>
        </table>
      </div>

      <lion-button class="w-100 btn btn-lg btn-primary" @click=${this.submit}
          >Continue</lion-button
      >

      </lion-fieldset
    `;
  }

  getColumnMeta(columnName) {
    return (
      this.tableData.columnMeta.find(
        meta => meta.columnName === columnName
      ) || { isVisible: true }
    );
  }

  isEditable(columnName) {
    const meta = this.getColumnMeta(columnName);
    return meta.isEditable ? 'true' : 'false';
  }
}

customElements.define('hack-demands', Demands);
