import { useState } from "react";
import { Button, Dropdown, DropdownButton, Modal } from "react-bootstrap";
import { createProduct } from "../CRUD/productCRUD";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage"; // Added imports

const uploadImage = async (file) => {
    const storage = getStorage();
    const storageRef = ref(storage, `images/${file.name}`);

    try {
        const uploadTask = await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(uploadTask.ref);
        console.log('Image uploaded at:', downloadURL);
        return downloadURL;
    } catch (error) {
        console.error('Error uploading image:', error);
        return null;
    }
};

const Product = () => {
    const [title, setTitle] = useState("");
    const [file, setFile] = useState(null);
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [price, setPrice] = useState(0);
    const [color, setColor] = useState([]);
    const [condition, setCondition] = useState("");
    const [dimension, setDimension] = useState("");
    const [isWishlist, setIsWishlist] = useState(false);
    const [material, setMaterial] = useState("");
    const [notes, setNotes] = useState("");
    const [rating, setRating] = useState(0);
    const [size, setSize] = useState([]);
    const [sizeChart, setSizeChart] = useState("");
    const [stock, setStock] = useState(0);
    const [variant, setVariant] = useState([]);
    const [isOpen, setIsOpen] = useState(false);

    const categories = ["Costume Set", "Accessories", "Bags", "Shoes", "Properties", "Other"];

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSaveChanges = async () => {
        const product = {
            name: title,
            description,
            category,
            price: parseFloat(price),
            color,
            condition,
            dimension,
            isWishlist,
            material,
            notes,
            rating: parseFloat(rating),
            size,
            sizeChart,
            stock: parseInt(stock),
            variant,
        };

        let imageURL = null;
        if (file) {
            imageURL = await uploadImage(file);
        }

        if (imageURL) {
            await createProduct(product, imageURL);
            closeModal();
        } else {
            console.error("Image upload failed.");
        }
    };
    
    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    const addColor = (newColor) => {
        setColor([...color, newColor]);
    };

    const addSize = (newSize) => {
        setSize([...size, newSize]);
    };

    const addVariant = (newVariant) => {
        setVariant([...variant, newVariant]);
    };

    return (
        <div style={{ paddingLeft: 400 }}>
            <button className="btn btn-primary" onClick={openModal}>Add Product</button>
            <Modal show={isOpen} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Product</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Product Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="category" className="form-label">Category</label>
                        <DropdownButton id="dropdown-basic-button" title={category ? category : "Select Category"}>
                            {categories.map((cat) => (
                                <Dropdown.Item key={cat} onClick={() => setCategory(cat)}>
                                    {cat}
                                </Dropdown.Item>
                            ))}
                        </DropdownButton>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <input
                            type="text"
                            className="form-control"
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="price" className="form-label">Price</label>
                        <input
                            inputMode="numeric"
                            type="number"
                            className="form-control"
                            id="price"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="file" className="form-label">Upload Image</label>
                        <input
                            type="file"
                            className="form-control"
                            id="file"
                            onChange={handleFileChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="color" className="form-label">Color</label>
                        <input
                            type="text"
                            className="form-control"
                            id="color"
                            placeholder="Enter color"
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    addColor(e.target.value);
                                    e.target.value = '';
                                }
                            }}
                        />
                        <small>Press Enter to add color</small>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="condition" className="form-label">Condition</label>
                        <input
                            type="text"
                            className="form-control"
                            id="condition"
                            value={condition}
                            onChange={(e) => setCondition(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="dimension" className="form-label">Dimension</label>
                        <input
                            type="text"
                            className="form-control"
                            id="dimension"
                            value={dimension}
                            onChange={(e) => setDimension(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="isWishlist" className="form-label">Is Wishlist</label>
                        <input
                            type="checkbox"
                            id="isWishlist"
                            checked={isWishlist}
                            onChange={(e) => setIsWishlist(e.target.checked)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="material" className="form-label">Material</label>
                        <input
                            type="text"
                            className="form-control"
                            id="material"
                            value={material}
                            onChange={(e) => setMaterial(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="notes" className="form-label">Notes</label>
                        <textarea
                            className="form-control"
                            id="notes"
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="rating" className="form-label">Rating</label>
                        <input
                            type="number"
                            className="form-control"
                            id="rating"
                            value={rating}
                            onChange={(e) => setRating(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="size" className="form-label">Size</label>
                        <input
                            type="text"
                            className="form-control"
                            id="size"
                            placeholder="Enter size"
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    addSize(e.target.value);
                                    e.target.value = '';
                                }
                            }}
                        />
                        <small>Press Enter to add size</small>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="sizeChart" className="form-label">Size Chart</label>
                        <input
                            type="text"
                            className="form-control"
                            id="sizeChart"
                            value={sizeChart}
                            onChange={(e) => setSizeChart(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="stock" className="form-label">Stock</label>
                        <input
                            type="number"
                            className="form-control"
                            id="stock"
                            value={stock}
                            onChange={(e) => setStock(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="variant" className="form-label">Variant</label>
                        <input
                            type="text"
                            className="form-control"
                            id="variant"
                            placeholder="Enter variant"
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    addVariant(e.target.value);
                                    e.target.value = '';
                                }
                            }}
                        />
                        <small>Press Enter to add variant</small>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeModal}>Close</Button>
                    <Button variant="primary" onClick={handleSaveChanges}>Save Changes</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default Product;
