export const SelectOptions = function (props) {
  const options = props.options.map((item) => {
    return (
      <option
        className="px-2 py-1 text-neutral-600"
        key={item.value}
        value={item.value}
      >
        {item.text}
      </option>
    );
  });

  const selectChangeHandler = (e) => {
    props.setValue({
      editing: props.editing,
      values: { ...props.rest, movieGenre: e.target.value },
    });
  };

  return (
    <div className="flex flex-col gap-2 h-16">
      <label className="flex items-center text-white gap-1" htmlFor={props.id}>
        <div className="w-2 h-5 bg-yellow-400 rounded-sm"></div>
        {props.labelName}
      </label>
      <select
        onChange={selectChangeHandler}
        className="py-[6px] rounded bg-inherit text-neutral-300 border border-neutral-400 focus:outline-none focus:border-yellow-400 hover:border-yellow-400"
        value={props.value}
        name={props.name}
        id={props.id}
      >
        {options}
      </select>
    </div>
  );
};
