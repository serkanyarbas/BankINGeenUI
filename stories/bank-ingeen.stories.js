import { html } from 'lit';
import '../src/bank-ingeen.js';

export default {
  title: 'BankIngeen',
  component: 'bank-ingeen',
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};

function Template({ header, backgroundColor }) {
  return html`
    <bank-ingeen
      style="--bank-ingeen-background-color: ${backgroundColor || 'white'}"
      .header=${header}
    >
    </bank-ingeen>
  `;
}

export const App = Template.bind({});
App.args = {
  header: 'My app',
};
