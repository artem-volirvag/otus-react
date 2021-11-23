import React from 'react';
import { FlexBox } from './FlexBox';

interface InputRangeProps {
  value: number | undefined;
  [key: string]: unknown;
}

export default function InputRange(props: InputRangeProps) {
  return (
    <FlexBox alignItems={'center'}>
      <input type="range" {...props} />
      <span>{props.value}</span>
    </FlexBox>
  );
}
