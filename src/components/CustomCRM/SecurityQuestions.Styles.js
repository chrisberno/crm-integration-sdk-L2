import styled from 'react-emotion';

export const SqGrid = styled('div')`
  display: grid;
  grid-template-rows: auto auto;
  row-gap: 20px;
`;

export const SqContainer = styled('div')`
  padding-top: 7vh;
  align-items: center;
  display: flex;
  flex-direction: column;
`;

export const SqButton = styled('button')`
  text-align: center;
  color: ${(props) => props.theme.colors.base8};
  line-height: 1.3;
  padding: 0.4em 0.8em 0.3em;
  box-sizing: border-box;
  border: 1px solid #aaa;
  background: #eee;
  box-shadow: 0 1px 0 1px rgba(0, 0, 0, 0.04);
  border-radius: 0.5em;
  cursor: pointer;
`;

export const SqQuestion = styled('div')`
  color: ${(props) => props.theme.colors.base7};
  letter-spacing: 1px;
`;
