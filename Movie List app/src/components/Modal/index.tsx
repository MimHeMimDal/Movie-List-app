export const Modal = function (props) {
  const closeModalHandle = (e) => {
    e.stopPropagation();
    props.setModalStatus({ open: false, message: "" });
  };
  return (
    <div
      onClick={closeModalHandle}
      className={`fixed z-0 top-0 h-screen w-screen bg-black bg-opacity-60 flex items-center justify-center ${
        props.modalStatus.open ? "" : "hidden"
      }`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-1/4 min-w-[300px] min-h-[200px] max-h-[400px] overflow-y-auto rounded bg-white relative px-2 py-2"
      >
        <div className="flex items-center justify-between">
          <div className="text-neutral-600">توضیحات</div>
          <div
            onClick={closeModalHandle}
            className="flex items-center gap-1 cursor-pointer opacity-40 hover:opacity-100"
          >
            <div>بستن</div>
            <div>
              <svg
                className=""
                stroke="currentColor"
                fill="currentColor"
                strokeWidth={0}
                viewBox="0 0 1024 1024"
                height="1em"
                width="1em"
              >
                <path d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 0 0 203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z" />
              </svg>
            </div>
          </div>
        </div>
        <div className="h-fit min-h-[200px] mt-3 rounded border p-2">
          {props.modalStatus.message.length === 0
            ? "توضیحات ندارد"
            : props.modalStatus.message}
        </div>
      </div>
    </div>
  );
};
