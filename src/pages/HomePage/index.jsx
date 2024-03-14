import React from "react";

function Home() {
  return (
    <nav>
      <ul>
        <li>
          <a href={`/Mode`}>Play Online</a>
        </li>
        <li>
          <a href={`/`}>Play with friends</a>
        </li>
      </ul>
    </nav>
  );
}

export default Home;
