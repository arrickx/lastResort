import React, { useState } from 'react';

function App() {
  function sayHello() {
    console.log('hello click');
  }

  return (
    <div>
      <h1>react hello</h1>
      <h2>testing</h2>
      <h3>yep</h3>
      <button onClick={sayHello}>submit</button>
    </div>
  );
}
export default App;