import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import {
  Container,
  Form,
  ContainerInputs,
  InputLabel,
  Title,
  Input
} from "./styles";

import Button from "../../components/Button";
import TopBackground from "../../components/TopBackground";

function Home() {
  const inputName = useRef();
  const inputAge = useRef();
  const inputEmail = useRef();

  const navigate = useNavigate();

  async function registerNewUser() {
    try {
      const name = inputName.current.value.trim();
      const age = inputAge.current.value.trim();
      const email = inputEmail.current.value.trim();

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const ageNumber = Number(age);

      if (!name || !age || !email) {
        alert("Todos os campos são obrigatórios");
        return;
      }

      if (isNaN(ageNumber) || ageNumber <= 0) {
        alert("Idade inválida");
        return;
      }

      if (!emailRegex.test(email)) {
        alert("E-mail inválido");
        return;
      }

      const response = await api.post("/usuarios", {
        name,
        age: ageNumber,
        email
      });

      alert(`Usuário ${response.data.user.name} cadastrado com sucesso!`);

      inputName.current.value = "";
      inputAge.current.value = "";
      inputEmail.current.value = "";
    } catch (error) {
      console.error(error.response?.data || error.message);
      alert("Erro ao cadastrar usuário. Veja o console para mais detalhes.");
    }
    navigate("/lista-de-usuarios")
  }


  return (
    <Container>
      <TopBackground />

      <Form>
        <Title>Cadastrar Usuários</Title>

        <ContainerInputs>
          <div>
            <InputLabel htmlFor="name">
              Nome <span>*</span>
            </InputLabel>
            <Input id="name" type="text" placeholder="Nome do usuário" ref={inputName} />
          </div>

          <div>
            <InputLabel htmlFor="age">
              Idade <span>*</span>
            </InputLabel>
            <Input id="age" type="number" placeholder="Idade do usuário" ref={inputAge} />
          </div>
        </ContainerInputs>

        <div style={{ width: "100%" }}>
          <InputLabel htmlFor="email">
            E-mail <span>*</span>
          </InputLabel>
          <Input id="email" type="email" placeholder="E-mail do Usuário" ref={inputEmail} />
        </div>

        <Button type="button" onClick={registerNewUser} variant="primary">
          Cadastrar Usuário
        </Button>

        <Button type="button" onClick={() => navigate("/lista-de-usuarios")} variant="secondary">
          Ver Lista de Usuários
        </Button>
      </Form>
    </Container>
  );
}

export default Home;