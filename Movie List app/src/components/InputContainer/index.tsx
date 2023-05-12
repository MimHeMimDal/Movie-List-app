export function InputContainer(props) {
  const inputChangeHandler = (e) => {
    switch (props.id) {
      case "movieDirector":
        props.setValue({
          editing: props.editing,
          values: { ...props.rest, movieDirector: e.target.value },
        });
        break;
      case "movieDate":
        props.setValue({
          editing: props.editing,
          values: { ...props.rest, movieDate: e.target.value },
        });
        break;
      case "movieName":
        props.setValue({
          editing: props.editing,
          values: { ...props.rest, movieName: e.target.value },
        });
        break;

      default:
        break;
    }
  };
  return (
    <div className="h-16">
      <div className="flex flex-col gap-2 text-neutral-200 h-16">
        <label
          className="flex items-center text-white gap-1"
          htmlFor={props.id}
        >
          <div className="w-2 h-5 bg-yellow-400 rounded-sm"></div>
          {props.labelName}
        </label>
        <input
          className={`bg-inherit h-full focus:outline-none focus:border-yellow-400 hover:border-yellow-400 text-inherit pr-3 border align-top placeholder:align-top placeholder:text-neutral-400 border-neutral-400 rounded py-2 text-sm ${props.className}`}
          id={props.id}
          onChange={inputChangeHandler}
          value={props.value}
          placeholder={props.placeHolder}
          type={props.type}
        />
      </div>
      <p></p>
    </div>
  );
}
