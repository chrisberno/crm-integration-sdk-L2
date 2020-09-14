import React from 'react';
import { FlexPlugin } from 'flex-plugin';
import FeatherTheme from './FeatherCorpTheme';
import CustomCRM from './components/CustomCRM/CustomCRM';

const PLUGIN_NAME = 'FeathercorpPlugin';

export default class FeathercorpPlugin extends FlexPlugin {
  constructor() {
    super(PLUGIN_NAME);
  }

  /**
   * This code is run when your plugin is being started
   * Use this to modify any UI components or attach to the actions framework
   *
   * @param flex { typeof import('@twilio/flex-ui') }
   * @param manager { import('@twilio/flex-ui').Manager }
   */
  init(flex, manager) {
    // set logo
    flex.MainHeader.defaultProps.logoUrl =
      'https://tangerine-toad-5117.twil.io/assets/feathercorp-logo-white.svg';

    // set color theme
    manager.updateConfig({ colorTheme: FeatherTheme });

    // update task list with customer details
    manager.strings.TaskHeaderLine =
      '{{task.attributes.account_data.first_name}} ' +
      '{{task.attributes.account_data.last_name}}';
    manager.strings.TaskLineCallReserved =
      'SLA: {{task.attributes.account_data.service_level}}';

    // remove CRM container
    flex.AgentDesktopView.Panel2.Content.remove('container');

    // and replace it with our new component
    flex.AgentDesktopView.Panel2.Content.add(<CustomCRM key="custom_crm" />);
  }
}
