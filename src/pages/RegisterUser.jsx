import axios from "axios";
import Navbar from "../components/Header";
import { useState } from "react";
import Swal from 'sweetalert2';
import styles from "../css/Forms.module.css"
const RegisterUser = () => {

    const [formData, setFormData] = useState({

        email: '',
        password: '',
        name: '',

    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };



    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password.length < 4 || formData.password.length > 8) {
            Swal.fire({
                icon: 'error',
                title: 'Erro',
                text: 'A senha deve ter entre 4 e 8 caracteres.',
            });
            return;
        }


        try {


            const response = await axios.post('http://localhost:9000/api/users', formData, {
                headers: {
                    'Content-Type': 'application/json',

                }
            });

            if (response.status === 201) {
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Cadastro realizado com sucesso!',
                    showConfirmButton: false,
                    timer: 1500
                });


                setFormData({
                    email: '',
                    password: '',
                    name: '',

                });

            } else {
                throw new Error(response.data.message || 'Falha ao salvar os dados.');
            }

        } catch (error) {
            let errorMessage = 'Ocorreu um erro ao cadastrar. Tente novamente.';
            if (error.response) {
                switch (error.response.status) {
                    case 409:
                        errorMessage = 'Usuário já cadastrado no sistema.';
                        break;
                    case 400:
                        errorMessage = 'Dados inválidos. Verifique as informações e tente novamente.';
                        break;
                    case 500:
                        errorMessage = 'Erro no servidor. Tente novamente mais tarde.';
                        break;
                    default:
                        errorMessage = error.response.data.message || errorMessage;
                        break;
                }
            }
            Swal.fire({
                icon: 'error',
                title: 'Erro',
                text: errorMessage,
            });
        }
    };


    return (
        <>

            <Navbar />
            <div className={styles.formContainer}>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <h2>Cadastro de Usuário</h2>

                    <div className={styles.formGroup}>
                        <label className={styles.label}>Nome</label>
                        <input
                            type="text"
                            id="nome"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className={styles.input}
                            required
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label}>Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className={styles.input}
                            required
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label}>Senha</label>
                        <input
                            type="password"
                            id="senha"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className={styles.input}
                            required
                        />
                    </div>

                    <button className={styles.submitButton} type="submit">Cadastrar</button>
                </form>
            </div>

        </>
    )
}

export default RegisterUser;