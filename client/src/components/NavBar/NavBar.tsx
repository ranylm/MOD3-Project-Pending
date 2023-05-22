import React from "react";
import { Link } from "react-router-dom";

type Props = {};

export default function NavBar({}: Props) {
  return (
    <nav className="flex flex-col w-56 bg-red-700 ">
      <Link to="/" className="text-xl">
        Home
      </Link>
      <Link to="/organization" className="text-xl">
        Orgs
      </Link>
    </nav>
  );
}
