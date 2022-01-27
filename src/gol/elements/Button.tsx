import styled from '@emotion/styled';

interface ButtonProps {
  mode?: 'primary' | 'secondary';
}

export const Button = styled.button((props: ButtonProps) => ({
  fontFamily: 'Roboto, Golos, monospace',
  fontSize: '1rem',
  backgroundColor: getBackgroundColor(props.mode),
}));

function getBackgroundColor(mode: ButtonProps['mode']) {
  switch (mode) {
    case 'primary':
      return 'lightgreen';
    case 'secondary':
      return '#fafad2';
    default:
      return '#fff';
  }
}
