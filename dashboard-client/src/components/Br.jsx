import React from 'react';

let arr = Array.from(Array(50).keys());

const Br = () => {
  return arr.map((a, i) => <br key={i} />);
};

export default Br;
