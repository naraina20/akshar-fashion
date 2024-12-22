export const fetchProducts = async (param) => {
    let page = param && param.page
    let limit = param && param.limit
    let search = param && param.search
    const url = `/api/products?page=${page?page:1}&limit=${limit?limit:10}&search=${search?search:''}`
    try {
      const res = await fetch(url);
      const data = await res.json();
      return data; // Assuming your API returns an object with products and totalPages
    } catch (error) {
      console.error("Error fetching products", error);
      return { products: [], totalPages: 0 };
    }
  };