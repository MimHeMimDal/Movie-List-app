import axios from "axios";
import {
  useReducer,
  useContext,
  createContext,
  Dispatch,
  ReactNode,
  useEffect,
  useState,
} from "react";

type tableContext = {
  state: any[];
  dispatch: Dispatch<actions>;
};
type actions = {
  type: string;
};

const TableContext = createContext<tableContext | []>([]);

export const useMovieTable = () => {
  return useContext(TableContext);
};

function TableProvider({ children }: { children: ReactNode }) {
  function tableReducer(state: any[], action: actions) {
    switch (action.type) {
      case "SET_STATE":
        return [...action.payload];
      case "SET_SEARCH":
        return [...action.payload];
      case "ADD_TO_TABLE":
        return [...state, action.payload];
      case "SHOW_FROM_TABLE":
        return [...state, action.payload];
      case "REMOVE_FROM_TABLE":
        //   axios.delete(`http://localhost:3000/movies/${action.payload}`);
        return state.filter((item) => item.id !== action.payload);
      case "EDIT_THE_TABLE": {
        console.log(action.payload.values);
        const tempObj = action.payload.values;
        return state.map((item) => {
          if (item.id === action.payload.id) {
            item = tempObj;
            return item;
          }
          return item;
        });
      }
      default:
        return state;
    }
  }
  const [state, dispatch] = useReducer(tableReducer, []);
  useEffect(() => {
    axios.get("http://localhost:3000/movies").then((response) => {
      dispatch({ type: "SET_STATE", payload: response.data });
    });
  }, []);
  return (
    <TableContext.Provider value={{ state, dispatch }}>
      {children}
    </TableContext.Provider>
  );
}

export default TableProvider;
