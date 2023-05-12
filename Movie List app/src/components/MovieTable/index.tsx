import { useMovieTable } from "../../context";
import { FilterSection } from "../FilterSection";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import axios from "axios";
import { Modal } from "../Modal";
import { useState } from "react";

export const MovieTable = function (props) {
  const { state, dispatch } = useMovieTable();
  const [modalStatus, setModalStatus] = useState({ open: false, message: "" });
  const rows = state.map((item, i) => {
    const handleDelete = (id) => {
      dispatch({ type: "REMOVE_FROM_TABLE", payload: id });
      axios.delete(`http://localhost:3000/movies/${id}`);
      toast.success("فیلم مورد نظر با موفقیت حذف شد", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    };
    const handleShowModal = (message) => {
      setModalStatus({ open: true, message });
    };
    const handleChangeInputs = (values) => {
      props.setFormEditing({ editing: true, values });
    };
    return (
      <tr
        key={item.id}
        id={item.id}
        className="[&_>_*]:text-center [&_>_*]:py-3"
      >
        <td>{i + 1}</td>
        <td>{item.movieName}</td>
        <td>{item.movieDirector}</td>
        <td>{item.movieGenre}</td>
        <td>{item.movieDate}</td>
        <td>
          <button
            onClick={() => {
              handleShowModal(item.movieDesc);
            }}
            className="border border-blue-300 py-1 px-4 rounded"
          >
            توضیحات
          </button>
        </td>
        <td>
          <button
            onClick={() => handleChangeInputs(item)}
            className="border border-yellow-300 py-1 px-4 rounded"
          >
            ویرایش
          </button>
        </td>
        <td>
          <button
            onClick={() => {
              handleDelete(item.id);
            }}
            className="border border-red-300 py-1 px-4 rounded"
          >
            حذف
          </button>
        </td>
      </tr>
    );
  });
  return (
    <>
      <Modal modalStatus={modalStatus} setModalStatus={setModalStatus} />
      <div className="bg-[#595959] h-full px-5 py-5 [&_>_*]:max-w-[1300px] [&_>_*]:mx-auto">
        <FilterSection state={state} dispatch={dispatch} />
        <div className="md:px-10 w-full overflow-x-auto">
          <table className="w-full min-w-[800px] mx-auto text-neutral-400">
            <thead className="border-b-2 border-white text-neutral-300">
              <tr className="[&_>_*]:py-2">
                <th>ردیف</th>
                <th>نام فیلم</th>
                <th>کارگردان</th>
                <th>ژانر فیلم</th>
                <th>سال ساخت</th>
                <th>توضیحات</th>
                <th>ویرایش</th>
                <th>حذف</th>
              </tr>
            </thead>
            <tbody>{rows}</tbody>
          </table>
          {rows.length === 0 ? (
            <div className="w-full text-lg text-center text-neutral-100 mt-10">
              موردی برای نمایش وجود ندارد
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
};
