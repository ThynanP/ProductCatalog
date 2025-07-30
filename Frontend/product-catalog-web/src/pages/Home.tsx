import React, { useEffect, useState, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import styles from './Home.module.css';

interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    category: string;
}

const Home: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [filters, setFilters] = useState({
        name: '',
        category: ''
    });
    const token = localStorage.getItem('authToken');

    const fetchProducts = (currentFilters = filters) => {
        api.get('/products', { params: currentFilters })
            .then(response => {
                setProducts(response.data);
            })
            .catch(error => console.error("Erro ao buscar produtos:", error));
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    const handleFilterSubmit = (e: FormEvent) => {
        e.preventDefault();
        fetchProducts();
    };

    const clearFilters = () => {
        const clearedFilters = { name: '', category: '' };
        setFilters(clearedFilters);
        fetchProducts(clearedFilters);
    };

    const handleDelete = async (id: number) => {
        if (window.confirm('Tem certeza que deseja excluir este produto?')) {
            try {
                await api.delete(`/products/${id}`);
                setProducts(products.filter(p => p.id !== id));
            } catch (error) {
                console.error("Erro ao excluir o produto:", error);
                alert("Você precisa estar logado para excluir um produto.");
            }
        }
    };

    return (
        <div className={styles.homeContainer}>
            <div className={styles.header}>
                <h1 className={styles.title}>Catálogo de Produtos</h1>
                {token && (
                    <Link to="/add" className={styles.addButton}>
                        Adicionar Novo Produto
                    </Link>
                )}
            </div>

            <form onSubmit={handleFilterSubmit} className={styles.filterForm}>
                <input type="text" name="name" placeholder="Filtrar por nome..." value={filters.name} onChange={handleFilterChange} className={styles.filterInput} />
                <input type="text" name="category" placeholder="Filtrar por categoria..." value={filters.category} onChange={handleFilterChange} className={styles.filterInput} />
                <button type="submit" className={styles.filterButton}>Filtrar</button>
                <button type="button" onClick={clearFilters} className={styles.clearButton}>Limpar</button>
            </form>

            <ul className={styles.productList}>
                {products.length > 0 ? (
                    products.map(product => (
                        <li key={product.id} className={styles.productItem}>
                            <div className={styles.productInfo}>
                                <h2>{product.name}</h2>
                                <p>{product.description}</p>
                                <p className={styles.price}>R$ {product.price}</p>
                                <small className={styles.category}>Categoria: {product.category}</small>
                            </div>
                            {token && (
                                <div className={styles.actions}>
                                    <Link to={`/edit/${product.id}`}>
                                        <button>Editar</button>
                                    </Link>
                                    <button onClick={() => handleDelete(product.id)} className={styles.deleteButton}>Excluir</button>
                                </div>
                            )}
                        </li>
                    ))
                ) : (
                    <p className={styles.noProductsMessage}>Nenhum produto encontrado com os filtros aplicados.</p>
                )}
            </ul>
        </div>
    );
};

export default Home;