import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "../firebaseConfig";

export const createProduct = async (product, imageURL) => {
    try {
        const formData = new FormData();
        formData.append('name', product.name);
        formData.append('description', product.description);
        formData.append('category', product.category);
        formData.append('price', product.price);
        formData.append('color', JSON.stringify(product.color));
        formData.append('condition', product.condition);
        formData.append('dimension', product.dimension);
        formData.append('isWishlist', product.isWishlist);
        formData.append('material', product.material);
        formData.append('notes', product.notes);
        formData.append('rating', product.rating);
        formData.append('size', JSON.stringify(product.size));
        formData.append('sizeChart', product.sizeChart);
        formData.append('stock', product.stock);
        formData.append('variant', JSON.stringify(product.variant));
        
        if (imageURL) {
            formData.append('imageURL', imageURL);
        }

        const response = await fetch('/api/products', {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            throw new Error('Failed to create product');
        }

        const data = await response.json();
        console.log('Product created:', data);
        return data;
    } catch (error) {
        console.error('Error creating product:', error);
    }
};


export const getProducts = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, "products"));
        return querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
    } catch (error) {
        console.error("Error fetching products:", error);
    }
};

export const updateProduct = async (id, updatedFields) => {
    try {
        const productRef = doc(db, "products", id);
        await updateDoc(productRef, updatedFields);
        console.log("Product updated successfully!");
    } catch (error) {
        console.error("Error updating product:", error);
    }
};

export const deleteProduct = async (id) => {
    try {
        const productRef = doc(db, "products", id);
        await deleteDoc(productRef);
        console.log("Product deleted successfully!");
    } catch (error) {
        console.error("Error deleting product:", error);
    }
};
