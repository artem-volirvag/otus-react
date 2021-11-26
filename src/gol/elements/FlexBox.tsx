import styled from '@emotion/styled';

interface FlexBoxProps {
  flex?: 'block' | 'inline';
  flexDirection?: 'vertical' | 'horisontal';
  alignItems?: string;
  justifyContent?: string;
  gap?: number;
  width?: string;
}

export const FlexBox = styled.div((props: FlexBoxProps) => ({
  display: props.flex === 'inline' ? 'inline-flex' : 'flex',
  flexDirection: props.flexDirection === 'vertical' ? 'column' : 'row',
  gap: props.gap || '.5rem',
  alignItems: props.alignItems || 'unset',
  justifyContent: props.justifyContent || 'unset',
  fontFamily: 'Roboto, Golos',
  width: props.width,
}));
