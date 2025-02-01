"use client"
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState, useContext } from "react";
import { ProductContext } from "../context";
import { fetchProducts } from '../../utils/FetchProducts';

const AddClothProductForm = () => {
  const { products, setProducts } = useContext(ProductContext);
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState({
    name: '',
    sizes: [],
    price: '',
    description: '',
    category: '',
    colors: [],
    stock: '',
    images: [] // This will store the base64 strings
  });
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    setLoading(true)
    fetchProducts().then(res => {
      if (res && res.status == 200) {
        setProducts(res.products);
        setLoading(false);
      } else {
        setLoading(false)
        console.log('Product already exist!')
      }
    }).catch(err => {
      setLoading(false)
      console.log(err)
    })
  }, [])

  const handleChange = (e) => {
    let { name, value } = e.target;
    if(name == 'stock'||name=='price'){
      value = Number(value)
    }
    console.log('name vlaue ', name,typeof(value))
    setProduct((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSizeChange = (e) => {
    const { value } = e.target;
    setProduct((prevState) => {
      let newSizes;
      if (prevState.sizes.includes(value)) {
        newSizes = prevState.sizes.filter(s => s !== value);
      } else {
        switch (value) {
          case 'S':
            newSizes = ['S', ...prevState.sizes.filter(s => s !== 'S')];
            break;
          case 'M':
            newSizes = [...prevState.sizes.filter(s => s !== 'M'), 'M'];
            break;
          case 'L':
            newSizes = [...prevState.sizes.filter(s => s !== 'L'), 'L'];
            break;
          case 'XL':
            newSizes = [...prevState.sizes.filter(s => s !== 'XL'), 'XL'];
            break;
          case 'XXL':
            newSizes = [...prevState.sizes.filter(s => s !== 'XXL'), 'XXL'];
            break;
          default:
            newSizes = [...prevState.sizes, value];
        }
      }
      return { ...prevState, sizes: newSizes };
    });
  };


  const handleColorChange = (color) => {
    setProduct((prevState) => {
      const newColors = prevState.colors.includes(color)
        ? prevState.colors.filter(c => c !== color)
        : [...prevState.colors, color];
      return { ...prevState, colors: newColors };
    });
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);

    Promise.all(files.map((file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = (event) => {
          // `event.target.result` contains the base64 encoded file data
          const base64String = event.target.result;
          resolve(base64String);
        };

        reader.onerror = (error) => {
          reject(error);
        };

        reader.readAsDataURL(file);
      });
    })).then((base64Strings) => {
      console.log('Base64 encoded files:', base64Strings);
      // Update the state with the base64Strings array
      setProduct((prevState) => ({
        ...prevState,
        images: base64Strings
      }));
    }).catch((error) => {
      console.error('Error reading files:', error);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true)
    console.log('Product added:', product);
    try {
      let res = await fetch("http://localhost:3000/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product)
      }).then(() => {
        setProcessing(false)
        // setProduct({
        //   name: '',
        //   sizes: [],
        //   price: '',
        //   description: '',
        //   category: '',
        //   colors: [],
        //   stock: '',
        //   images: [] // This will store the base64 strings
        // })
      })
    } catch (error) {
      setProcessing(false)
      console.error('Error fetching data', error);
    }
  };

  const colors = ['Red', 'Blue', 'Green', 'Yellow', 'Black', 'White', 'Purple', 'Pink', 'Orange'];

  return (
    <div className="container my-5 py-4">
      <h2 className="mb-4 text-success">Add Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={product.name}
            onChange={handleChange}
            placeholder="Product Name"
            required
          />
          <label htmlFor="name" className="text-black">Product Name</label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="number"
            className="form-control"
            id="price"
            name="price"
            value={product.price}
            onChange={handleChange}
            placeholder="Price"
            required
          />
          <label htmlFor="price" className="text-black">Price</label>
        </div>
        <fieldset className="form-group mb-3">
          <legend className="text-black">Sizes</legend>
          <div className="btn-group btn-group-toggle" data-toggle="buttons">
            {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
              <label
                key={size}
                className={`btn btn-outline-success ${product.sizes.includes(size) ? 'active' : ''}`}
              >
                <input
                  type="checkbox"
                  name="sizes"
                  id={`size${size}`}
                  value={size}
                  checked={product.sizes.includes(size)}
                  onChange={handleSizeChange}
                  className="d-none"
                />
                {size}
              </label>
            ))}
          </div>
        </fieldset>
        <div className="form-floating mb-3">
          <select
            className="form-control"
            id="category"
            name="category"
            value={product.category}
            onChange={handleChange}
            required
          >
            <option value="" disabled>Select Category</option>
            <option value="T-shirt">T-shirt</option>
            <option value="Pants">Pants</option>
            <option value="Jacket">Jacket</option>
            <option value="Shoes">Shoes</option>
          </select>
          <label htmlFor="category" className="text-black">Category</label>
        </div>
        <fieldset className="form-group mb-3">
          <legend className="text-black">Colors</legend>
          <div className="d-flex flex-wrap">
            {colors.map((color) => (
              <div
                key={color}
                className={`color-box ${product.colors.includes(color) ? 'border border-success' : ''}`}
                onClick={() => handleColorChange(color)}
                style={{
                  width: '40px',
                  height: '40px',
                  margin: '5px',
                  cursor: 'pointer',
                  backgroundColor: color.toLowerCase(),
                  border: '1px solid #000'
                }}
              >
                {product.colors.includes(color) ? '✓' : ''}
              </div>
            ))}
          </div>
        </fieldset>
        <div className="form-floating mb-3">
          <input
            type="number"
            className="form-control"
            id="stock"
            name="stock"
            value={product.stock}
            onChange={handleChange}
            placeholder="Stock Quantity"
            required
          />
          <label htmlFor="stock" className="text-black">Stock Quantity</label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="file"
            className="form-control"
            id="images"
            name="images"
            onChange={handleFileChange}
            placeholder="Upload Images"
            multiple
            required
          />
          <label htmlFor="images" className="text-black">Upload Images</label>
        </div>
        <div className="form-floating mb-3">
          <textarea
            className="form-control"
            id="description"
            name="description"
            value={product.description}
            onChange={handleChange}
            placeholder="Description"
            rows="4"
            required
          />
          <label htmlFor="description" className="text-black">Description</label>
        </div>
        <button type="submit" className="btn btn-success btn-block">
          <span className={processing ? "spinner-border spinner-border-sm" : "d-none"} role="status" aria-hidden="true" ></span>
          Add Product
        </button>
      </form>
      <hr />
      <h2 className="mb-4 text-success">Product Management</h2>
      {
        loading ? <div className="d-flex justify-content-center align-items-center w-100" style={{ height: "80px" }}>
          <div className="spinner-border text-primary me-2" role="status">
          </div>
          <h5 className="m-0">Fetching products...</h5>
        </div> :
        (products && products.length > 0 ? 
          <table className="table" style={{ minWidth: '500px', overflow: 'auto' }}>
            <thead>
              <tr>
                <th scope="col">Sr No</th>
                <th scope="col">Product Name</th>
                <th scope="col">Price</th>
                <th scope="col">Category</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.category}</td>
                </tr>
              ))}
            </tbody>
          </table> :
           <div className="container d-flex flex-column justify-content-center align-items-center">
           <div className="text-center">
             <h1 className="display-4">No Products Found</h1>
             <p className="lead">
               We couldn't find any products matching your search.
             </p>
             <a href="/products" className="btn btn-secondary">
               Browse All Products
             </a>
           </div>
         </div>
        )
          
      }

    </div>
  );
};

export default AddClothProductForm;




