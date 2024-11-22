import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Header";
import Swal from "sweetalert2";

const RegisterTask = () => {


    const [formData, setFormData] = useState({
        task_description: '',
        sector: '',
        priority: '',
        user: '',

    });

    const [taskPriority, setTaskPriority] = useState([]);
    const [users, setUsers] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchTaskPriority = async () => {
            try {
                const response = await axios.get('http://localhost:9000/api/tasks/priority');
                setTaskPriority(response.data.body);
                console.log(response.data.body);

            } catch (error) {
                console.error("Erro ao buscar os dados:", error);
            }
        };

        fetchTaskPriority();
    }, []);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:9000/api/users');
                setUsers(response.data);
                console.log(response.data);

            } catch (error) {
                console.error("Erro ao buscar os dados:", error);
            }
        };

        fetchUsers();
    }, []);


    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };



    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            const response = await axios.post('http://localhost:9000/api/tasks', formData, {
                headers: {
                    'Content-Type': 'application/json',

                }
            });

            if (response.status === 201) {
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Tarefa Cadastrada realizado com sucesso!',
                    showConfirmButton: false,
                    timer: 1500
                });


                setFormData({
                    task_description: '',
                    sector: '',
                    priority: '',
                    user: '',

                });

                setUsers([]);
                setTaskPriority([]);
                navigate('/tasks');


            } else {
                throw new Error(response.data.message || 'Falha ao salvar os dados.');
            }

        } catch (error) {
            let errorMessage = 'Ocorreu um erro ao cadastrar atividade. Tente novamente.';
            if (error.response) {
                switch (error.response.status) {
                    case 409:
                        errorMessage = 'Atividade já cadastrado no sistema.';
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
            <div>
                <form onSubmit={handleSubmit}>
                    <h2>Cadastro de Tarefas</h2>

                    <div>
                        <label>Descrição</label>
                        <input
                            type="text"
                            id="nome"
                            name="task_description"
                            value={formData.task_description}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div>
                        <label>Setor</label>
                        <input
                            type="text"
                            id="setor"
                            name="sector"
                            value={formData.sector}
                            onChange={handleChange}
                            required
                        />
                    </div>




                    <div>
                        <label>Usuário</label>
                        <select
                            id="users"
                            value={formData.user}
                            onChange={(e) => setFormData({ ...formData, user: e.target.value })}
                            required
                        >
                            <option value="">Selecione um usuário</option>
                            {users.map((usuario) => (
                                <option key={usuario.id} value={usuario.id}>
                                    {usuario.name}
                                </option>
                            ))}
                        </select>
                    </div>


                    <div>
                        <label>Prioridade</label>
                        <select

                            id="prioridade"
                            value={formData.priority}
                            onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                            required
                        >
                            <option>Selecione a prioridade</option>
                            {taskPriority.map((prioridade) => (
                                <option key={prioridade} value={prioridade}>
                                    {prioridade}
                                </option>
                            ))}
                        </select>
                    </div>



                    <button type="submit">Cadastrar</button>
                </form>
            </div>


        </>
    )
}

export default RegisterTask;