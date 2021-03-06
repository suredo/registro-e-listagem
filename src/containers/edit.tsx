import React, {useState, useEffect} from 'react';
import Styled from "styled-components";

import Input from "../components/input";
import Cpf from "../components/cpfInput";
import Cell from "../components/cellInput"
import Birthday from "../components/birthdayInput";
import Email from "../components/emailInput";

const SInput = Styled.input`
	width: 100%;
	border: none;
	border-bottom: 1px solid gray;
	outline: none;
`;

const STextarea = Styled.textarea`
  width: 100%;
`;

interface props {
	list: {
        id: number;
        name: string;
        birthday: string;
        cpf: string;
        cell: string;
        email: string;
        adress: string;
        city: string;
        state: string;
        obs: string;
		}[],
    setList: Function,
    data: {
        id: number;
        name: string;
        birthday: string;
        cpf: string;
        cell: string;
        email: string;
        adress: string;
        city: string;
        state: string;
        obs: string;
		},
		setEdit: Function
}

interface errors {
  birthday: string,
  cpf: string,
  cell: string,
  email: string
}

function Edit({list, setList, data, setEdit} : props) {
  const [err, setErr] = useState<errors>({
    birthday: "",
    cpf: "",
    cell: "",
    email: ""
  });
  const [name, setName] = useState<string>(data.name);
  const [birthday, setBirthday] = useState<string>(data.birthday);
  const [cpf, setCpf] = useState<string>(data.cpf);
  const [cell, setCell] = useState<string>(data.cell);
  const [email, setEmail] = useState<string>(data.email);
  const [adress, setAdress] = useState<string>(data.adress);
  const [city, setCity] = useState<string>(data.city);
  const [state, setState] = useState<string>(data.state);
  const [obs, setObs] = useState<string>(data.obs);

  const [sending, setSending] = useState<boolean>(false);

  //Faz requesição para editar dados do formulário
  const handleSubmit = async () => {
    //verifica se existe algum erro nos inputs
    if(!Object.values(err).reduce((p, c) => p+c)){
			//subistitui dados
      const reg = list.map( d => {
				if(d.id === data.id){
					return {id: data.id, name, birthday, cpf, cell, email, adress, city, state, obs}
				}
				return d;
			});
      setSending(true);
      await setTimeout(() => {
        setList(reg);
				setSending(false);
				setEdit({edit: false, id: 0});
      }, 1000);
    }
  }

  if(sending){
    return(
      <div>
        <h1>Sending</h1>
      </div>
    );
  }

  return (
    <div>
      <h1>Editar dados</h1>
      <form onSubmit={e => {e.preventDefault(); handleSubmit()}}>
        <div>
          <label>Nome</label>
          <Input err="" placeholder="Seu nome completo" changeValue={setName} value={name} required={true} mask={/ /}  validation={/[A-Z a-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ]/g} max={50} format="" pad={""}/>
        </div>
        <div>
          <Birthday setErr={setErr} err={err} value={birthday} changeValue={setBirthday}/>
        </div>
        <div>
          <Cpf setErr={setErr} err={err} value={cpf} changeValue={setCpf}/>
        </div>
        <div>
          <Cell setErr={setErr} err={err} changeValue={setCell} value={cell}/>
        </div>
        <div>
          <Email setErr={setErr} err={err} changeValue={setEmail} value={email}/>
        </div>
        <div>
          <label>Endereço:</label>
          <SInput type="text" placeholder="" required value={adress} onChange={e => setAdress(e.target.value)}/>
        </div>
        <div>
          <label>Municipio:</label>
          <SInput type="text" required value={city} onChange={e => setCity(e.target.value)}/>
        </div>
        <div>
          <label>Estado:</label>
          <SInput type="text" required value={state} onChange={e => setState(e.target.value)}/>
        </div>
        <div>
          <label>Obervações:</label>
          <STextarea value={obs} onChange={e => setObs(e.target.value)} />
        </div>
        <button>Enviar</button>
      </form>
    </div>
  );
}

export default Edit;
