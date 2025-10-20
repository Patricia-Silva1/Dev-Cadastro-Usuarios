import styled from 'styled-components';

export const MyButton = styled.button`
  border: ${props => (props.variant === 'primary' ? 'none' : '1px solid #fff')};
  background: ${props =>
    props.variant === 'primary'
      ? 'linear-gradient(180deg, #fe7e5d 0%, #7f3841 100%)'
      : '#444'};
  font-size: 16px;
  color: #fff;
  padding: 16px 32px;
  width: fit-content;
  cursor: pointer;
  border-radius: 30px;
  transition: all 0.3s ease-in-out;

  &:hover {
    opacity: 0.8;
  }

  &:active {
    opacity: 0.5;
  }
`;
