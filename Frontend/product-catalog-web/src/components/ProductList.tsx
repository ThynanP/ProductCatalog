import React from 'react';

export interface Product {
    id: number;
    name: string;
    price: number;
    category: string;
}

interface ProductListProps {
    products: Product[];
    onDelete: (id: number) => void;
    onEdit: (id: number) => void;
}
const ProductList: React.FC<ProductListProps> = ({ products, onDelete, onEdit }) => {
    return (
        <ul>
            {products.map(product => (
                <li key={product.id}>
                    {product.name} - R$ {product.price}
                    <button onClick={() => onEdit(product.id)}>Editar</button>
                    <button onClick={() => onDelete(product.id)}>Excluir</button>
                </li>
            ))}
        </ul>
    );
};

export default ProductList;