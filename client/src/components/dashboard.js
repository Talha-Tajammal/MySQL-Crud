import React, { useState, useEffect } from "react";
import axios from "axios";
import "./style.css";

const Dashboard = () => {
    const [products, setProducts] = useState([]);
    const [form, setForm] = useState({ name: "", price: "", description: "" });
    const [editMode, setEditMode] = useState(false);
    const [editId, setEditId] = useState(null);

    useEffect(() => {
        fetchProducts();
    }, [products]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const fetchProducts = async () => {
        try {
            const res = await axios.get("http://localhost:3001/api/products");
            setProducts(res.data);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    

    const addProduct = async (e) => {
        e.preventDefault();
        try {
            await axios.post(
                "http://localhost:3001/api/products",
                form
            );
            setForm({ name: "", price: "", description: "" });
        } catch (error) {
            console.error("Error adding product:", error);
        }
    };

    const updateProduct = async (e) => {
        e.preventDefault();
        try {
            await axios.put(
                `http://localhost:3001/api/products/${editId}`,
                form
            );
            setForm({ name: "", price: "", description: "" });
            setEditMode(false);
            setEditId(null);
        } catch (error) {
            console.error("Error updating product:", error);
        }
    };

    const deleteProduct = async (id) => {
        try {
            await axios.delete(`http://localhost:3001/api/products/${id}`);
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    };

    const startEdit = (product) => {
        setEditMode(true);
        setEditId(product.id);
        setForm({
            name: product.name,
            price: product.price,
            description: product.description,
        });
    };

    return (
        <div className="dashboard-container">
            <h1>User Dashboard</h1>
            <div>
                <form onSubmit={editMode ? updateProduct : addProduct} className="form">
                    <div className="form-group">
                        <div>
                            <input
                                placeholder="Name"
                                type="text"
                                name="name"
                                value={form.name}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <div>
                            <input
                                placeholder="Price in USD"
                                type="number"
                                name="price"
                                value={form.price}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <div>
                            <input
                                placeholder="Description"
                                type="text"
                                name="description"
                                value={form.description}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div>
                            <button type="submit">
                                {editMode ? "Update Product" : "Add Product"}
                            </button>
                        </div>
                    </div>
                </form>
                <h2>Product List</h2>
                <div className="product-list">
                    <ul>
                        {products.map((product) => (
                            <li key={product.id}>
                            <div className="product-info">
                              <div className="product-name">
                                <strong>Name:</strong> {product.name}
                              </div>
                              <div className="product-price">
                                <strong>Price:</strong> ${parseFloat(product.price).toFixed(5)}
                              </div>
                              <div className="product-description">
                                <strong>Description:</strong> {product.description}
                              </div>
                            </div>
                          
                            <div className="button-container">
                              <button onClick={() => startEdit(product)}>Edit</button>
                              <button onClick={() => deleteProduct(product.id)}>Delete</button>
                            </div>
                          </li>
                          
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
