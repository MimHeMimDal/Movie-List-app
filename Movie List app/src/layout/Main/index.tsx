import { Form } from "../../components/Form";
import { Header } from "../../components/Header";
import { MovieTable } from "../../components/MovieTable";
import TableProvider from "../../context";
import { useState } from "react";

export const Main = function () {
  const [formEditing, setFormEditing] = useState({
    editing: false,
    values: {
      id: "",
      movieName: "",
      movieDirector: "",
      movieGenre: "وحشت/جنایی",
      movieDate: "",
      movieDesc: "",
    },
  });
  return (
    <TableProvider>
      <main className="h-screen">
        <Header />
        <Form formEditing={formEditing} setFormEditing={setFormEditing} />
        <MovieTable formEditing={formEditing} setFormEditing={setFormEditing} />
      </main>
    </TableProvider>
  );
};
