"use client"
import 'bootstrap/dist/css/bootstrap.min.css';
import { fetchProducts } from '../../utils/FetchProducts';
import { useEffect, useState, useContext } from "react";
import { ProductContext } from "../context";
import { toast } from 'react-toastify';
import { MdDeleteOutline } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { Modal } from "bootstrap";


const AddClothProductForm = () => {
  const { products, setProducts } = useContext(ProductContext);
  const [loading, setLoading] = useState(false);
  const [productID, setProductID] = useState(null);
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
  const deleteModal = document.getElementById("deleteProduct");
  const createModal = document.getElementById("addEditProduct");

  useEffect(() => {
    if (deleteModal || createModal) {
      deleteModal.addEventListener("shown.bs.modal", () => {
        document.getElementById("deletion")?.focus();
      });
      createModal.addEventListener("shown.bs.modal", () => {
        document.getElementById("name")?.focus();
      });
    }

    const loadProducts = async () => {
      const data = await fetchProducts();
      return data
    }; 

    try {
      setLoading(true)
      if (products.length === 0) {
        loadProducts().then((res) => {
          if (res.status == 200) {
            setProducts(res.products);
            setLoading(false);
          } else {
            setLoading(false)
            toast.error(res.error || "Something went wrong")
          }
        })
          .catch((error) => {
            setLoading(false);
            toast.error(error.message);
          });
      } else {
        setLoading(false)
      }
    } catch (error) {
      setLoading(false)
      toast.error(error.message);
    }
  }, [products])

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
      // Update the state with the base64Strings array
      setProduct((prevState) => ({
        ...prevState,
        images: base64Strings
      }));
    }).catch((error) => {
      toast.error(error)
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true)
    try {
      let res = await fetch("http://localhost:3000/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product)
      }).then((data) => {
        if (data.status == 200) {
          setProcessing(false)
          setProduct({
            name: '',
            sizes: [],
            price: '',
            description: '',
            category: '',
            colors: [],
            stock: '',
            images: []
          })
          toast.success("Product added!")
          closeModal("addEditProduct")
          setLoading(true);
          fetchProducts().then(res => {
            if (res.status == 200) {
              setProducts(res.products);
              setLoading(false);
            } else {
              setLoading(false)
            }
          }).catch(err => {
            setLoading(false)
            toast.error(err)
          })
        } else {
          toast.error("Something went wrong")
        }

      }).catch(err => {
        toast.error(err.message)
        setProcessing(false)
      })
    } catch (error) {
      setProcessing(false)
      toast.error(error.message);
    }
  };

  const closeModal = (modalID) => {
    const modalElement = document.getElementById(modalID);
    if (modalElement) {
      const modalInstance = Modal.getInstance(modalElement) || new Modal(modalElement);
      const modalBackdrop = document.querySelector(".modal-backdrop");
      modalInstance.hide();
      if (modalBackdrop) {
        modalBackdrop.remove();
      }

    }
  };

  const deleteProduct = async (id) => {
    try {
      setProcessing(true)
      const res = await fetch(`/api/products?id=${id}`, { method: "DELETE" })
      const data = await res.json();
      if (data.status == 200) {
        setProcessing(false)
        toast.success("Product deleted successfully")
        setLoading(true)
        fetchProducts().then(res => {
          if (res.status == 200) {
            setProducts(res.products);
            setLoading(false);
          } else {
            setLoading(false)
          }
        }).catch(err => {
          setLoading(false)
          toast.error(err)
        })
      } else {
        setProcessing(false)
        toast.error(data.error)
      }
    } catch (error) {
      setProcessing(false)
      toast.error("Something went wrong!")
    }
  }

  const colors = ['#FF0000', '#0000FF', '#008000', '#FFFF00', '#000000', '#FFFFFF', '#800080', '#FFC0CB', '#FFA500', '#A52A2A', '#808080', '#C0C0C0', '#2F4F4F', '#556B2F', '#8B4513', '#4682B4', '#D2B48C', '#708090', '#B22222', '#696969', '#1E90FF', '#5F9EA0', '#191970', '#808000', '#DAA520'];

  return (
    <div className="container my-5 py-4">
      <h2 className="mb-4 text-success">Product Management</h2>
      <div className={`d-flex w-100 justify-content-between align-items-center`}>
        <button className={`btn btn-primary`} disabled={loading} data-bs-toggle="modal" data-bs-target="#addEditProduct">Add Product</button>
        <div className="d-flex form-inline">
          <input className="form-control mr-sm-2" name="search" type="search" placeholder="Search" aria-label="Search" onChange={e => setSearchInput(e.target.value)} />
        </div>
      </div>
      <div className="overflow-x-auto">
        {
          loading ? <div className="d-flex justify-content-center align-items-center w-100" style={{ height: "80px" }}>
            <div className="spinner-border text-primary me-2" role="status">
            </div>
            <h5 className="m-0">Fetching products...</h5>
          </div> :
            (products && products.length > 0 ?
              <table className="table" style={{ minWidth: '600px', overflow: 'auto' }}>
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
                      <td>
                        <button className="btn btn-primary" onClick={e => setProductID(product._id)} data-bs-toggle="modal" data-bs-target="#addEditProduct">
                          <FaRegEdit />
                        </button>

                        <button className="btn btn-danger ms-2" data-bs-toggle="modal" data-bs-target="#deleteProduct" onClick={e => setProductID(product._id)}><MdDeleteOutline /></button>
                      </td>
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
        {/*Delete product modal */}
        <div className="modal fade" id="deleteProduct" tabIndex="-1" role="dialog" aria-labelledby="deleteProductLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="deleteProductLabel">Delete product permanently</h5>
                <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <p className="text-center">Are you sure you want to delete this product ?</p>
                <input type="hidden" id="deletion" />
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-danger" onClick={() => deleteProduct(productID)}><span className={processing ? "spinner-border spinner-border-sm" : "d-none"} role="status" aria-hidden="true" ></span>Delete</button>
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>

        {/*Add/Edit product modal */}
        <div className="modal fade" id="addEditProduct" tabIndex="-1" role="dialog" aria-labelledby="deleteProductLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <form onSubmit={handleSubmit}>
                <div className="modal-header">
                  <h5 className="modal-title" id="deleteProductLabel">{productID ? 'Edit' : 'Add'} Product</h5>
                  <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
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
                </div>
                <div className="modal-footer">
                  <button type="submit" className="btn btn-primary"><span className={processing ? "spinner-border spinner-border-sm" : "d-none"} role="status" aria-hidden="true" ></span> Submit</button>
                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

    </div>

  );
};

export default AddClothProductForm;




