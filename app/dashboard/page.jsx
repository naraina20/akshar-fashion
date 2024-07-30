"use client"
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const AddClothProductForm = () => {
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

  const handleChange = (e) => {
    const { name, value } = e.target;
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
    console.log('Product added:', product);
    try {
      let res = await fetch("http://localhost:3000/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product)
      });

      let allPosts = await res.json();
      console.log('allPosts', allPosts);
    } catch (error) {
      console.error('Error fetching data', error);
    }
  };

  const colors = ['Red', 'Blue', 'Green', 'Yellow', 'Black', 'White', 'Purple', 'Pink', 'Orange'];

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-success">Add Cloth Product</h2>
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
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddClothProductForm;




