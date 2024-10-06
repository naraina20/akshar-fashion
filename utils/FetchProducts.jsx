export const fetchProducts = async ({page,limit,search}) => {
    try {
      const res = await fetch(`http://localhost:3000/api/products?page=${page?page:1}&limit=${limit?limit:10}&search=${search?search:''}`);
      const data = await res.json();
      return data; // Assuming your API returns an object with products and totalPages
    } catch (error) {
      console.error("Error fetching products", error);
      return { products: [], totalPages: 0 };
    }
  };
  