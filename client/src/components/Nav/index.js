import React from "react";
import { useStoreContext } from "../../utils/GlobalState";
import "../../styles/homeStyle.css";


function Nav() {
  const [store] = useStoreContext();

  return (
    <nav className="navbar navbar-dark  bg-transparent">
      <div className="container-fluid justify-content-center">
        <a class="navbar-brand" href="/">
          <h1 className="titl">Early Bird Generator</h1>
        </a>
      </div>
      {/* {store.loading ? <a className="navbar-brand ml-auto">Loading...</a> : ""} */}
    </nav>

  );
}

export default Nav;
