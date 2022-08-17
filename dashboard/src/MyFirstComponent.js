import UI5Element from '@ui5/webcomponents-base/dist/UI5Element.js';
import litRender from '@ui5/webcomponents-base/dist/renderer/LitRenderer.js';
import { getI18nBundle } from '@ui5/webcomponents-base/dist/i18nBundle.js';

// Template
import MyFirstComponentTemplate from './generated/templates/MyFirstComponentTemplate.lit.js';

// Styles
import MyFirstComponentCss from './generated/themes/MyFirstComponent.css.js';

import { PLEASE_WAIT } from './generated/i18n/i18n-defaults.js';

/**
 * @public
 */
const metadata = {
  tag: 'sap-dashboard',
  properties: {
    text: {
      type: String
    }
  },
  slots: {
    default: {
      type: Node
    }
  },
  events: {
    click: {}
  }
};

/**
 * @class
 *
 * <h3 class="comment-api-title">Overview</h3>
 *
 * The <code>my-first-component</code> component is a demo component that displays some text.
 *
 * @constructor
 * @alias demo.components.MyFirstComponent
 * @extends UI5Element
 * @tagname my-first-component
 * @public
 */
class MyFirstComponent extends UI5Element {
  static get metadata() {
    return metadata;
  }

  static get render() {
    return litRender;
  }

  static get template() {
    return MyFirstComponentTemplate;
  }

  static get styles() {
    return MyFirstComponentCss;
  }

  static async onDefine() {
    MyFirstComponent.i18nBundle = await getI18nBundle('luigi-dashboard');
  }

  get pleaseWaitText() {
    return ''; //MyFirstComponent.i18nBundle.getText(PLEASE_WAIT);
  }
}

// eslint-disable-next-line spaced-comment
//MyFirstComponent.define();

export default MyFirstComponent;
