import React, { memo, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import {
  getList,
  getItem,
  postItem,
  putItem,
  deleteItem,
} from "./slices/DepartmentSlice";

const Test = memo(() => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector(
    (state) => state.DepartmentSlice
  );

  useEffect(() => {
    //dispatch(getList());
    //dispatch(getList({ query: "공학", page: 2, rows: 5 }));
    //dispatch(getItem({ deptno: 201 }));
    //dispatch(postItem({ dname: "React.js", loc: "1403호" }));
    //dispatch(putItem({ deptno: 234, dname: "React.js 수정", loc: "1403호" }));
    dispatch(deleteItem({ deptno: 233 }));
  }, [dispatch]);

  return loading ? (
    "loading..."
  ) : error ? (
    JSON.stringify(error)
  ) : (
    <>{JSON.stringify(data)}</>
  );
});

export default Test;
