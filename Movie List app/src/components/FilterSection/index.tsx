import axios from "axios";
import { debounce } from "lodash";

export const FilterSection = function (props) {
  const selectChangeHandler = (e) => {
    if (e.target.value === "all") {
      axios.get("http://localhost:3000/movies").then((response) => {
        props.dispatch({ type: "SET_STATE", payload: response.data });
      });
    }
    if (e.target.value !== "all") {
      axios
        .get(`http://localhost:3000/movies?movieGenre=${e.target.value}`)
        .then((response) => {
          props.dispatch({ type: "SET_SEARCH", payload: response.data });
        });
    }
  };
  const searchChangeHandler = (e) => {
    if (e.target.value === "") {
      axios.get("http://localhost:3000/movies").then((response) => {
        props.dispatch({ type: "SET_SEARCH", payload: response.data });
      });
    }
    if (e.target.value !== "") {
      axios
        .get(`http://localhost:3000/movies?q=${e.target.value}`)
        .then((response) => {
          props.dispatch({ type: "SET_SEARCH", payload: response.data });
        });
    }
  };
  return (
    <div className="flex flex-col justify-center md:flex-row gap-2 items-center mb-5">
      <div className="flex gap-2 items-center ml-auto text-xl font-bold">
        <div className="h-6 w-2 bg-yellow-500 rounded-sm"></div>
        <span>لیست فیلم</span>
      </div>
      <div className="flex flex-col sm:flex-row gap-5 grow md:pr-10">
        <input
          onChange={debounce((e) => {
            searchChangeHandler(e);
          }, 700)}
          placeholder="جستجو بر اساس نام فیلم"
          type="text"
          className="px-2 py-1 rounded bg-inherit border border-neutral-400 focus:outline-none focus:border-yellow-400 hover:border-yellow-400"
        />
        <select
          onChange={selectChangeHandler}
          className="px-2 py-1 rounded bg-inherit text-neutral-200 border border-neutral-400 focus:outline-none hover:border-yellow-400"
          name=""
          id=""
        >
          <option className="text-neutral-600" value="all">
            همه دسته‌ها
          </option>
          <option className="text-neutral-600" value="وحشت/جنایی">
            وحشت/جنایی
          </option>
          <option className="text-neutral-600" value="درام">
            درام
          </option>
          <option className="text-neutral-600" value="کمدی">
            کمدی
          </option>
        </select>
      </div>
    </div>
  );
};
