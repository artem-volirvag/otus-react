import styled from '@emotion/styled';

interface ButtonProps {
  mode?: 'primary' | 'secondary';
}

export const Button = styled.button((props: ButtonProps) => ({
  fontFamily: 'Roboto, Golos, monospace',
  fontSize: '1rem',
  backgroundColor: getBackgroundColor(props.mode),
}));

const backgroundColor = {
  primary: 'lightgreen',
  secondary: '#fafad2',
};

function getBackgroundColor(mode: ButtonProps['mode']) {
  return (mode && backgroundColor[mode]) || '#fff';
}
