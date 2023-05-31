import React from 'react';

type CompProps = {
  num: number,
}

const BringYour = (props: CompProps) => {
  return <h2>You brought this on urself! {props.num}</h2>;
};

export default BringYour;
