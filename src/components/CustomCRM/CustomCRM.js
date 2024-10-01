import React from 'react';
import { withTheme, withTaskContext } from '@twilio/flex-ui';
import SecurityQuestions from './SecurityQuestions';
import { Label, Value, Header, HeaderLine } from './Common.Styles';
import {
  CustomCRMContainer,
  ProfileCanvas,
  ProfilePhoto,
  ProfileGrid,
  LargeCaption
} from './CustomCRM.Styles';

// OwlCRM URL for loading profile images
const CRM_baseurl = 'https://storkcrm-3329-dev.twil.io';

function CustomCRM(props) {
  const { task } = props;

  // build visual representation of the customer profile data
  let profileDetails;
  if (task && task.attributes && task.attributes.account_data) {
    profileDetails = (
      <ProfileGrid>
      <div>
        <Label>Service Level</Label>
        <Value>{task.attributes.account_data.service_level}</Value>
      </div>
      <div>
        <Label>Account Balance</Label>
        <Value>{task.attributes.account_data.account_balance}</Value>
      </div>
        <div>
          <Label>Address</Label>
          <Value>
            {task.attributes.account_data.address}
            <br />
            {task.attributes.account_data.city},&nbsp;
            {task.attributes.account_data.state},&nbsp;
            {task.attributes.account_data.zip}
          </Value>
        </div>
        <div>
          <Label>Date of Birth</Label>
          <Value>{task.attributes.account_data.birthday}</Value>
        </div>
      </ProfileGrid>
    );
  }

  // build the CRM content based on whether a Task is selected and whether
  // it contains a customer profile
  let content;
  if (!task || !task.attributes) {
    // no task is selected
    content = (
      <ProfileCanvas>
        <HeaderLine>
          <Header>
            <span>Custom CRM</span>
          </Header>
        </HeaderLine>
        <LargeCaption>No task selected</LargeCaption>
      </ProfileCanvas>
    );
  } else if (!task.attributes.account_data) {
    // task is selected, but doesn't contain profile data from CRM
    content = (
      <ProfileCanvas>
        <HeaderLine>
          <Header>
            <span>Custom CRM</span>
          </Header>
        </HeaderLine>
        <LargeCaption>No customer data found</LargeCaption>
      </ProfileCanvas>
    );
  } else {
    // task is selected and profile data are present
    content = (
      <ProfileCanvas>
        <ProfilePhoto
          alt=""
          src={CRM_baseurl + task.attributes.account_data.img_src}
        />
        <HeaderLine>
          <Header>
            <Value>Customer Profile</Value>
          </Header>
        </HeaderLine>
        <LargeCaption>
          {task.attributes.account_data.first_name +
            ' ' +
            task.attributes.account_data.last_name}
        </LargeCaption>
        {profileDetails}
        <SecurityQuestions />
      </ProfileCanvas>
    );
  }

  return <CustomCRMContainer>{content}</CustomCRMContainer>;
}

export default withTaskContext(withTheme(CustomCRM));
