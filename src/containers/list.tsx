import React, {useState, useEffect} from "react";
import Styled from "styled-components";

import ItemList from "../components/itemList";

const SUlp = Styled.ul`
	list-style: none;
	padding: 0;
	margin: 0;
`;

const SUl = Styled.ul`
	width: 100%;
	background-color: blue;
	list-style: none;
	padding: 0;
	margin: 0;
	display: grid;
	grid-template-columns: 120px 100px 100px 100px 120px 100px 50px 50px 150px 30px;
	font-size: 10pt;
	color: white;
	border: 1px solid gray;
	align-content: center;
	justify-content: center;
`;

const SLi = Styled.li`
	text-align: center;
	border-right
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
	setEdit: Function
}

function List({list, setList, setEdit} : props){
	const [data, setData] = useState(list);
	const [actualPage, setActualPage] = useState<number>(1);
	const [type, setType] = useState<string>("name");
	const [search, setSearch] = useState<string>("");

	useEffect(() => {
		setData(list);
	}, [list]);

	useEffect(() => {
		const data = list.filter(item => {
			const i = Object.getOwnPropertyDescriptor(item, type);
			if(i?.value.toLowerCase().includes(search.toLowerCase())){
				return item;
			}
		});
		setData(data);
	}, [type, search]);

	//Ativa component de edição dos dados
	const toggleEdit = (id: string) => {
		setEdit({edit: true, id: id});
	}

	//Recebe id e deleta item dos dados
	const handleDelete = async (value: number) : Promise<void> => {
		const data = list.filter(item => item.id !== value);
		await setTimeout(() => {
			setList(data);
		}, 1000);
	}

	const itemsPerPage: number = 10;
	const startFrom : number = actualPage * itemsPerPage - itemsPerPage;
	const pages: number = list.length / itemsPerPage;

	//seta valor da página atual + 1
	const next = () => {
		if(actualPage < pages){
			setActualPage(actualPage + 1);
		}
	}

	//seta valor da página atual - 1
	const previous = () => {
		if(actualPage > 1){
			setActualPage(actualPage - 1);
		}
	}

	return(
		<div>
			<h1>Listagem</h1>
			<input type="text" value={search} onChange={e => setSearch(e.target.value)}/>
			<select onChange={e => setType(e.target.value)} defaultValue={type}>
				<option value="name">Nome</option>
				<option value="birthday">Aniversário</option>
				<option value="cpf">CPF</option>
				<option value="cell">Celular</option>
				<option value="email">Email</option>
				<option value="adress">Endereço</option>
				<option value="city">Cidade</option>
				<option value="state">Estado</option>
			</select>
			<SUl>
				<SLi>Nome</SLi>
				<SLi>Aniversário</SLi>
				<SLi>CPF</SLi>
				<SLi>Celular</SLi>
				<SLi>Email</SLi>
				<SLi>Endereço</SLi>
				<SLi>Cidade</SLi>
				<SLi>Estado</SLi>
				<SLi>Observação</SLi>
				<SLi></SLi>
			</SUl>
			<SUlp>
				{data.slice(startFrom, startFrom + itemsPerPage).map((item) => <ItemList key={item.id} toggleEdit={toggleEdit} item={item} remove={handleDelete}/>)}
			</SUlp>
			<div>
				<button onClick={() => previous()}>Anterior</button>
				<button onClick={() => next()}>Proximo</button>
			</div>
		</div>
	);
}

export default List;