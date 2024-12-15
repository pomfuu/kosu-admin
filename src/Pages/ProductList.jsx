import { useEffect, useState } from "react";
import { getProducts } from "../CRUD/productCRUD";
import { storage } from "../config";
import { ref, getDownloadURL } from "firebase/storage";

const ProductList = () => {
    const [products, setProducts] = useState([]);

    const fetchImageURLs = async (products) => {
        return await Promise.all(
            products.map(async (product) => {
                if (product.imageURL) {
                    const imageRef = ref(storage, product.imageURL);
                    const url = await getDownloadURL(imageRef);
                    return { ...product, imageURL: url };
                }
                return product;
            })
        );
    };

    useEffect(() => {
        const fetchProducts = async () => {
            const productList = await getProducts();
            const productListWithImages = await fetchImageURLs(productList); 
            setProducts(productListWithImages);
        };

        fetchProducts();
    }, []);

    return (
        <div style={{ marginTop: "20px" }}>
            <h3>Product List</h3>
            {products.length === 0 ? (
                <p>No products available.</p>
            ) : (
                <ul style={{ listStyleType: "none", padding: 0 }}>
                    {products.map((product) => (
                        <li
                            key={product.id}
                            style={{
                                border: "1px solid #ccc",
                                padding: "10px",
                                marginBottom: "10px",
                                borderRadius: "5px",
                            }}
                        >
                            <h4>{product.name}</h4>
                            <p><strong>Category:</strong> {product.category}</p>
                            <p><strong>Price:</strong> ${product.price}</p>
                            <p><strong>Description:</strong> {product.description}</p>
                            <img
                                src={product.imageURL}
                                alt={product.name}
                                style={{ maxWidth: "200px", height: "auto" }}
                            />
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ProductList;
