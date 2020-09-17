import React from 'react';
import { withTheme, withTaskContext } from '@twilio/flex-ui';
import {
  SqContainer,
  SqGrid,
  SqButton,
  SqQuestion
} from './SecurityQuestions.Styles';
import { Value, Header, HeaderLine } from './Common.Styles';

class SecurityQuestions extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      questions: undefined
    };

    // bind `this` so that it can be used from inside getSecQuestions()
    this.getSecQuestions = this.getSecQuestions.bind(this);
  }

  componentDidUpdate(prevProps) {
    // if another task has been selected, clear security questions
    if (this.props.task !== prevProps.task) {
      this.setState({ questions: undefined });
    }
  }

  // retrieve security questions using the Twilio function as a proxy
  getSecQuestions() {
    this.setState({ questions: 'Loading...' });
    // first, test if account number is provided via Task attributes
    if (
      this.props.task &&
      this.props.task.attributes &&
      this.props.task.attributes.account_number
    ) {
      // if there is an account number, fetch the security questions
      fetch(/* insert URL of the proxy function + profile ID here */)
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            // throw an error if we received any error from the Function
            console.error('CRM fetch failed, response:', response);
            throw new Error('Failed to fetch from CRM');
          }
        })
        .then((questions) => {
          // save fetched questions in component's state
          this.setState({ questions: questions.security_questions });
        })
        .catch((error) => {
          // handle errors received from the Function or from the fetch
          console.error('CRM request failed', error);
          this.setState({
            questions: `Error: Couldn't fetch questions from CRM.`
          });
        });
    } else {
      this.setState({ questions: 'Error: Account number not found' });
    }
  }

  render() {
    const header = (
      <HeaderLine>
        <Header>
          <Value>Security Questions</Value>
        </Header>
      </HeaderLine>
    );
    switch (typeof this.state.questions) {
      // by default, show the 'Show' button
      case 'undefined':
        return (
          <SqContainer>
            {header}
            <SqButton onClick={this.getSecQuestions}>Show</SqButton>
          </SqContainer>
        );
      // if we encountered any error during the fetch, show it to the user
      case 'string':
        return (
          <SqContainer>
            {header}
            <Value>{this.state.questions}</Value>
          </SqContainer>
        );
      // otherwise render the security questions
      default:
        return (
          <SqContainer>
            {header}
            <SqGrid>
              {this.state.questions.q1 && this.state.questions.a1 && (
                <div>
                  <SqQuestion>{this.state.questions.q1}</SqQuestion>
                  <Value>{this.state.questions.a1}</Value>
                </div>
              )}
              {this.state.questions.q2 && this.state.questions.a2 && (
                <div>
                  <SqQuestion>{this.state.questions.q2}</SqQuestion>
                  <Value>{this.state.questions.a2}</Value>
                </div>
              )}
            </SqGrid>
          </SqContainer>
        );
    }
  }
}

export default withTaskContext(withTheme(SecurityQuestions));
