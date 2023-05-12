export const TextArea = function (props) {
  const changeHandler = (e) => {
    props.setValue({
      editing: props.editing,
      values: { ...props.rest, movieDesc: e.target.value },
    });
  };

  return (
    <div className="flex flex-col gap-1">
      <label className="flex items-center text-white gap-1" htmlFor="movieDesc">
        <div className="w-2 h-5 bg-yellow-400 rounded-sm"></div>
        توضیحات
      </label>
      <textarea
        className="bg-inherit text-sm py-2 px-2 border h-20 border-neutral-400 rounded focus:outline-none focus:border-yellow-400 hover:border-yellow-400"
        placeholder="توضیحات درباره فیلم (اختیاری)"
        name=""
        onChange={changeHandler}
        value={props.value}
        id="movieDesc"
      ></textarea>
    </div>
  );
};
