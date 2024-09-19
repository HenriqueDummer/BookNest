import React from "react";
import { getBooksByStatus } from "../util/http";
import { useQuery } from "@tanstack/react-query";

import Book from "../components/BookComponent";
import BookCollection from "../components/BookCollection";

const Read = () => {
  return (

    <BookCollection title={"Read"} status={"read"} />
  );
};

export default Read;
