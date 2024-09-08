export const fetchProducts = async (page = 1) => {
    try {
      const res = await fetch(`http://localhost:3000/api/products?page=${page}`);
      const data = await res.json();
      return data; // Assuming your API returns an object with products and totalPages
    } catch (error) {
      console.error("Error fetching products", error);
      return { products: [], totalPages: 0 };
    }
  };
  