import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function UpdateProduct() {
    const navigate = useNavigate();
    const { id } = useParams(); // Get the product ID from the route params
    const [product, setProduct] = useState({});
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');

    useEffect(() => {
        // Fetch the existing product details by ID
        axios.get(`http://localhost:9999/api/product/${id}`)
            .then((response) => {
                const existingProduct = response.data.data;
                setProduct(existingProduct);
                setName(existingProduct.name);
                setPrice(existingProduct.price);
            })
            .catch((error) => {
                console.error('Error fetching product:', error);
            });
    }, [id]);

    const handleUpdate = () => {
        // Prepare the updated product data
        const updatedProduct = {
            name,
            price: +price,
            // Add other fields as needed
        };

        // Send a PUT request to update the product
        axios.patch(`http://localhost:9999/api/product/update/${id}`, updatedProduct)
            .then((response) => {
                console.log('Product updated successfully');
                // Redirect to the product detail page or any other appropriate page
                navigate(`/update/${id}`);
            })
            .catch((error) => {
                console.error('Error updating product:', error);
            });
    };

    return (
        <div>
            <h1>Update Product</h1>
            <div>
                <label>Name:</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div>
                <label>Price:</label>
                <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
            </div>
            {/* Add input fields for other product details as needed */}
            <button onClick={handleUpdate}>Update</button>
            <button onClick={() => navigate('/')} style={{width: 100}}>Home</button>
        </div>
        
    );
}

export default UpdateProduct;
