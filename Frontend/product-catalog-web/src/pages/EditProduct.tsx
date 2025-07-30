import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';


import styles from '../components/Form.module.css';

interface ProductData {
    id: number;
    name: string;
    description: string;
    price: number | string;
    category: string;
}

const EditProduct: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const [product, setProduct] = useState<ProductData>({
        id: 0,
        name: '',
        description: '',
        price: '',
        category: ''
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (id) {
            api.get(`/products/${id}`)
                .then(response => {
                    setProduct(response.data);
                    setLoading(false);
                })
                .catch(err => {
                    setError('Não foi possível carregar os dados do produto.');
                    setLoading(false);
                    console.error(err);
                });
        }
    }, [id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setProduct(prevProduct => ({
            ...prevProduct,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (!product.name || !product.category) {
            setError("Nome e Categoria são obrigatórios.");
            return;
        }
        const priceNumber = parseFloat(String(product.price));
        if (isNaN(priceNumber) || priceNumber <= 0) {
            setError("O preço deve ser maior que zero.");
            return;
        }

        const dataToSubmit = {
            ...product,
            price: priceNumber
        };

        try {
            await api.put(`/products/${id}`, dataToSubmit);
            navigate('/');
        } catch (err) {
            setError('Falha ao atualizar o produto. Tente novamente.');
            console.error(err);
        }
    };

    if (loading) {
        return <p>Carregando...</p>;
    }

    return (
        <div className={styles.formContainer}>
            <h1 className={styles.formTitle}>Editar Produto</h1>
            {error && <p className={styles.errorMessage}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                    <label htmlFor="name" className={styles.label}>Nome:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={product.name}
                        onChange={handleChange}
                        className={styles.input}
                        required
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="description" className={styles.label}>Descrição:</label>
                    <textarea
                        id="description"
                        name="description"
                        value={product.description}
                        onChange={handleChange}
                        className={styles.textarea}
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="price" className={styles.label}>Preço:</label>
                    <input
                        type="number"
                        id="price"
                        name="price"
                        value={product.price}
                        onChange={handleChange}
                        className={styles.input}
                        required
                        step="0.01"
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="category" className={styles.label}>Categoria:</label>
                    <input
                        type="text"
                        id="category"
                        name="category"
                        value={product.category}
                        onChange={handleChange}
                        className={styles.input}
                        required
                    />
                </div>
                <div className={styles.buttonContainer}>
                    <button type="submit" className={styles.submitButton}>
                        Salvar Alterações
                    </button>
                    <button type="button" onClick={() => navigate('/')} className={styles.cancelButton}>
                        Cancelar
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditProduct;