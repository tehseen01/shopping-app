import axios from "axios";
import { useEffect, useState } from "react";
import "./paginate.scss";

const Paginate = ({ products, page, setPage }) => {
  const [state, setState] = useState({});

  const fetchPage = async () => {
    const res = await axios.get(
      import.meta.env.VITE_API_URL + `?limit=18&page=${page}`
    );
    const data = await res.data;
    setState(data);
  };

  useEffect(() => {
    fetchPage();
  }, [page]);

  return (
    <>
      {products.length > 0 && (
        <div className="pagination">
          <button onClick={() => setPage(page - 1)} disabled={page <= 1}>
            previous
          </button>
          {[...Array(state.totalPages)].map((_, i) => {
            return (
              <button
                key={i}
                className={page === i + 1 ? "pagination__selected" : ""}
                onClick={() => setPage(i + 1)}
              >
                {i + 1}
              </button>
            );
          })}
          <button onClick={() => setPage(page + 1)} disabled={page - 1}>
            next
          </button>
        </div>
      )}
    </>
  );
};

export default Paginate;
