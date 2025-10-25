import { useEffect, useState } from "react";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";
import Trash from '../../assets/trash.svg';

import {
  Container,
  ContainerUsers,
  CardUsers,
  TrashIcon,
  Title,
  AvatarUser,
  BackButton
} from './styles';

function ListUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true); // para mostrar carregamento
  const navigate = useNavigate();

  useEffect(() => {
    async function getUsers() {
      try {
        const { data } = await api.get("/usuarios");
        setUsers(data);
      } catch (error) {
        console.error("Erro ao buscar usuários:", error);
        alert(`Erro ao carregar usuários: ${error.response?.data?.error || error.message}`);
      } finally {
        setLoading(false);
      }
    }
    getUsers();
  }, []);

  async function deleteUser(id) {
    const confirmar = window.confirm("Tem certeza que deseja excluir este usuário?");
    if (!confirmar) return;

    try {
      await api.delete(`/usuarios/${id}`);
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
      alert("Usuário excluído com sucesso!");
    } catch (error) {
      console.error("Erro ao deletar usuário:", error);
      alert(`Erro ao deletar usuário: ${error.response?.data?.error || error.message}`);
    }
  }

  if (loading) {
    return <p style={{ textAlign: 'center', marginTop: '2rem' }}>Carregando usuários...</p>;
  }

  return (
    <Container>
      <Title>Lista de Usuários</Title>

      <ContainerUsers>
        {users.length === 0 ? (
          <p style={{ textAlign: 'center', marginTop: '2rem' }}>Nenhum usuário cadastrado.</p>
        ) : (
          users.map((user) => (
            <CardUsers key={user.id}>
              <AvatarUser src={`https://avatar.iran.liara.run/public?username=${user.id}`} />
              <div>
                <h3>Nome: {user.name}</h3>
                <p>Idade: {user.age}</p>
                <p>Email: {user.email}</p>
              </div>
              <TrashIcon
                src={Trash}
                alt="Ícone de lixeira"
                role="button"
                tabIndex={0}
                onClick={() => deleteUser(user.id)}
              />
            </CardUsers>
          ))
        )}
      </ContainerUsers>

      <BackButton onClick={() => navigate('/')}>← Voltar</BackButton>
    </Container>
  );
}

export default ListUsers;
