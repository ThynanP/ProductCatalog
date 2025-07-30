import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import styles from '../components/Form.module.css';

const Register: React.FC = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (!formData.username || !formData.password) {
            setError('Todos os campos são obrigatórios.');
            return;
        }
        if (formData.password !== formData.confirmPassword) {
            setError('As senhas não coincidem.');
            return;
        }

        try {
            await api.post('/users/register', {
                username: formData.username,
                password: formData.password
            });

            alert('Usuário registrado com sucesso!');
            navigate('/');
        } catch (err: any) {
            if (err.response && err.response.data) {
                setError(err.response.data);
            } else {
                setError('Ocorreu um erro durante o registro. Tente novamente.');
            }
            console.error(err);
        }
    };

    return (
        <div className={styles.formContainer}>
            <h2 className={styles.formTitle}>Registro de Novo Usuário</h2>
            {error && <p className={styles.errorMessage}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                    <label htmlFor="username" className={styles.label}>Nome de Usuário:</label>
                    <input type="text" name="username" value={formData.username} onChange={handleChange} className={styles.input} required />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="password" className={styles.label}>Senha:</label>
                    <input type="password" name="password" value={formData.password} onChange={handleChange} className={styles.input} required />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="confirmPassword" className={styles.label}>Confirmar Senha:</label>
                    <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} className={styles.input} required />
                </div>
                <div className={styles.buttonContainer}>
                    <button type="submit" className={styles.submitButton}>Registrar</button>
                </div>
            </form>
        </div>
    );
};

export default Register;