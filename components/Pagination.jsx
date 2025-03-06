"use client"
import { ProductContext } from "@/app/context";
import { fetchProducts } from "@/utils/FetchProducts";
import { useContext, useState } from "react";
import { toast } from 'react-toastify';

const Pagination = ({ initPagination}) => {
  const { page, totalPages } = initPagination;
  const { products, setProducts } = useContext(ProductContext);
  const { pagination, setPagination } = useContext(ProductContext);
  const [loading, setLoading] = useState(0)

  const handlePageChange =  (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setLoading(1)
        fetchProducts({page:newPage}).then(data=>{
            setProducts(data.products);
            setPagination(data.pagination);
            setLoading(0)
            initPagination = pagination
        }).catch(err=> {
          setLoading(0)
          toast.error("Something went wrong!")
        });
    }
  };

  return (
    <nav className="d-flex align-items-baseline" aria-label="Page navigation">
      <ul className="pagination">
        <li className={`page-item ${page === 1 ? "disabled" : ""}`}>
          <button className="page-link" onClick={() => handlePageChange(page - 1)}>
            &laquo;
          </button>
        </li>

        {Array.from({ length: totalPages }, (_, index) => (
          <li key={index} className={`page-item ${page === index + 1 ? "active" : ""}`}>
            <button className="page-link" onClick={() => handlePageChange(index + 1)}>
              {index + 1}
            </button>
          </li>
        ))}

        <li className={`page-item ${page === totalPages ? "disabled" : ""}`}>
          <button className="page-link" onClick={() => handlePageChange(page + 1)}>
         &raquo;
          </button>
        </li>
      </ul>
      <span className={loading ? "spinner-border spinner-border-sm text-primary ms-2" : "d-none"} role="status" aria-hidden="true" ></span>
    </nav>
  );
};

export default Pagination;
