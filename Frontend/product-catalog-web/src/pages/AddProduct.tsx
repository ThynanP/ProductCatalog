import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import styles from '../components/Form.module.css';

interface ProductFormData {
    name: string;
    description: string;
    price: string;
    category: string;
}

const AddProduct: React.FC = () => {
    const navigate = useNavigate();
    const [product, setProduct] = useState<ProductFormData>({
        name: '',
        description: '',
        price: '',
        category: ''
    });
    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setProduct(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (!product.name || !product.price || !product.category) {
            setError("Nome, Preço e Categoria são obrigatórios.");
            return;
        }

        const dataToSubmit = {
            ...product,
            price: parseFloat(product.price)
        };

        try {
            await api.post('/products', dataToSubmit);
            navigate('/');
        } catch (err) {
            setError("Falha ao criar o produto. Verifique os dados e tente novamente.");
            console.error(err);
        }
    };

    return (
         <div className={styles.formContainer}>
            <h1 className={styles.formTitle}>Adicionar Novo Produto</h1>
            {error && <p className={styles.errorMessage}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                    <label htmlFor="name" className={styles.label}>Nome:</label>
                    <input type="text" id="name" name="name" value={product.name} onChange={handleChange} className={styles.input} />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="description" className={styles.label}>Descrição:</label>
                    <textarea id="description" name="description" value={product.description} onChange={handleChange} className={styles.textarea} />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="price" className={styles.label}>Preço:</label>
                    <input type="number" id="price" name="price" value={product.price} onChange={handleChange} step="0.01" className={styles.input} />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="category" className={styles.label}>Categoria:</label>
                    <input type="text" id="category" name="category" value={product.category} onChange={handleChange} className={styles.input} />
                </div>
                <div className={styles.buttonContainer}>
                    <button type="submit" className={styles.submitButton}>Salvar Produto</button>
                    <button type="button" onClick={() => navigate('/')} className={styles.cancelButton}>Cancelar</button>
                </div>
            </form>
        </div>
    );
};

export default AddProduct;
