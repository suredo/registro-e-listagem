import React from "react";

import Styled from "styled-components";

const SUl = Styled.ul`
	width: 100%;
	list-style: none;
	padding: 0;
	margin: 0;
	display: grid;
	grid-template-columns: 120px 100px 100px 100px 120px 100px 50px 50px 150px 30px;
	font-size: 10pt;
	border: 1px solid gray;
	align-content: center;
	justify-content: space-around;
`;

const SLi = Styled.li`
	text-align: center;
	border-right
`;

const SBremove = Styled.button`
	color: white;
	background-color: red;
	border: none;
`;

const SBedit = Styled.button`
	color: white;
	background-color: green;
	border: none;
`;

interface props {
	item: {
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
	remove: Function,
	toggleEdit: Function
}

function itemList ({item, remove, toggleEdit} : props){
	return(
		<li>
			<SUl>
				<SLi>{item.name}{item.id}</SLi>
				<SLi>{item.birthday.replace(/(\w{2})(\w{2})(\w{4})/, "$1/$2/$3")}</SLi>
				<SLi>{item.cpf.replace(/(\w{3})(\w{3})(\w{3})(\w{2})/, "$1.$2.$3-$4")}</SLi>
				<SLi>{item.cell.replace(/(\w{2})(\w{5})(\w{4})/, "($1) $2-$3")}</SLi>
				<SLi>{item.email}</SLi>
				<SLi>{item.adress}</SLi>
				<SLi>{item.city}</SLi>
				<SLi>{item.state}</SLi>
				<SLi>{item.obs}</SLi>
				<SLi>
					<SBedit onClick={() => toggleEdit(item.id)}>Edit</SBedit>
					<SBremove onClick={() => remove(item.id)}>X</SBremove>
				</SLi>
			</SUl>
		</li>
	)
}

export default itemList;