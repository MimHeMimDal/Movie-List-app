import { ToastContainer, toast } from "react-toastify";
import { InputContainer } from "../InputContainer";
import { SelectOptions } from "../SelectOptions";
import { TextArea } from "../TextArea";
import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useMovieTable } from "../../context";

export const Form = function (props) {
  const { state, dispatch } = useMovieTable();
  // const [inputsValue, setInputValue] = useState(props.formEditing.values);
  const handleSubmitForm = (e) => {
    e.preventDefault();
    const valuesInForm = props.formEditing.values;
    if (!props.formEditing.editing) {
      if (
        valuesInForm.movieName !== "" &&
        valuesInForm.movieDirectory !== "" &&
        valuesInForm.movieDate !== ""
      ) {
        const id = crypto.randomUUID();
        axios.post("http://localhost:3000/movies", {
          ...props.formEditing.values,
          id: id,
        });
        dispatch({
          type: "ADD_TO_TABLE",
          payload: { ...props.formEditing.values, id: id },
        });
        toast.success("فیلم مورد نظر با موفقیت ثبت شد", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        props.setFormEditing({
          editing: false,
          values: {
            movieName: "",
            movieDirector: "",
            movieGenre: "وحشت/جنایی",
            movieDate: "",
            movieDesc: "",
          },
        });
      } else {
        toast.warning("لطفا فیلدهای خواسته شده را پر کنید", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
    }
    if (props.formEditing.editing) {
      // e.stopPropagation();
      // console.log(props.formEditing.values);
      axios.patch(
        `http://localhost:3000/movies/${props.formEditing.values.id}`,
        props.formEditing.values
      );
      dispatch({
        type: "EDIT_THE_TABLE",
        payload: {
          id: props.formEditing.values.id,
          values: props.formEditing.values,
        },
      });
      toast.success("فیلم مورد نظر با موفقیت ویرایش شد", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      props.setFormEditing({
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
    }
  };
  const handleCancelForm = (e) => {
    e.preventDefault();
    props.setFormEditing({
      editing: false,
      values: {
        movieName: "",
        movieDirector: "",
        movieGenre: "وحشت/جنایی",
        movieDate: "",
        movieDesc: "",
      },
    });

    toast.error("درخواست شما لغو گردید", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };
  // const handleEdit = (e) => {
  //   // e.stopPropagation();
  //   // console.log(props.formEditing.values);
  //   axios.patch(
  //     `http://localhost:3000/movies/${props.formEditing.values.id}`,
  //     props.formEditing.values
  //   );
  //   dispatch({
  //     type: "EDIT_THE_TABLE",
  //     payload: {
  //       id: props.formEditing.values.id,
  //       values: props.formEditing.values,
  //     },
  //   });
  //   toast.success("فیلم مورد نظر با موفقیت ویرایش شد", {
  //     position: "top-right",
  //     autoClose: 2000,
  //     hideProgressBar: false,
  //     closeOnClick: true,
  //     pauseOnHover: true,
  //     draggable: true,
  //     progress: undefined,
  //     theme: "dark",
  //   });
  //   props.setFormEditing({
  //     editing: false,
  //     values: {
  //       id: "",
  //       movieName: "",
  //       movieDirector: "",
  //       movieGenre: "وحشت/جنایی",
  //       movieDate: "",
  //       movieDesc: "",
  //     },
  //   });
  // };

  // console.log(inputsValue);
  return (
    <>
      <ToastContainer></ToastContainer>
      <div className="bg-[#515050] px-10 py-6">
        <form
          onSubmit={handleSubmitForm}
          className="flex flex-col gap-5 md:flex-row max-w-[1000px] mx-auto"
        >
          <div className="flex flex-col gap-5 md:w-1/4">
            <InputContainer
              id="movieName"
              placeHolder="نام فیلم را بنویسید"
              labelName="نام فیلم"
              type="text"
              value={props.formEditing.values.movieName}
              rest={props.formEditing.values}
              editing={props.formEditing.editing}
              setValue={props.setFormEditing}
            />
            <InputContainer
              id="movieDirector"
              placeHolder="نام کارگردان را وارد کنید"
              labelName="کارگردان"
              type="text"
              value={props.formEditing.values.movieDirector}
              rest={props.formEditing.values}
              editing={props.formEditing.editing}
              setValue={props.setFormEditing}
            />
          </div>
          <div className="flex flex-col gap-5 md:w-1/4">
            <SelectOptions
              id="movieGenre"
              name="movieGenre"
              value={props.formEditing.values.movieGenre}
              rest={props.formEditing.values}
              editing={props.formEditing.editing}
              setValue={props.setFormEditing}
              options={[
                { value: "وحشت/جنایی", text: "وحشت/جنایی" },
                { value: "درام", text: "درام" },
                { value: "کمدی", text: "کمدی" },
              ]}
              labelName="ژانر"
            />
            <InputContainer
              id="movieDate"
              placeHolder="سال ساخت فیلم را وارد کنید"
              labelName="سال تولید"
              type="text"
              value={props.formEditing.values.movieDate}
              rest={props.formEditing.values}
              editing={props.formEditing.editing}
              setValue={props.setFormEditing}
            />
          </div>
          <div className="grow">
            <TextArea
              value={props.formEditing.values.movieDesc}
              setValue={props.setFormEditing}
              rest={props.formEditing.values}
              editing={props.formEditing.editing}
            />
            <div className="flex py-6 gap-4 justify-center md:justify-end items-center">
              {props.formEditing.editing ? (
                <button
                  type="submit"
                  // onClick={handleEdit}
                  className="bg-yellow-500 text-[#515050] px-6 py-2 rounded w-28"
                >
                  ویرایش
                </button>
              ) : (
                <button
                  type="submit"
                  className="bg-yellow-500 text-[#515050] px-6 py-2 rounded w-28"
                >
                  ذخیره
                </button>
              )}
              <button
                onClick={handleCancelForm}
                type="button"
                className="text-neutral-300 border border-neutral-400 px-5 py-2 rounded w-28"
              >
                انصراف
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};
