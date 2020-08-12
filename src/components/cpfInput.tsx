import React from "react";
import { isCPF } from 'brazilian-values';

import Input from "./input";

interface props {
	changeValue: Function,
	value: string,
	err: {
    birthday: string,
    cpf: string,
    cell: string,
    email: string
  },
	setErr: Function
}

function CpfInput({changeValue, value, err, setErr} : props) {
	//valida cpf
	const handleCpf = (value: string) => {
		//verifica se o número de digitos está correto e se o valor é valido
		if(!isCPF(value) && value.length > 0){
      setErr({...err, cpf: "CPF invalido."})
    }else{
      setErr({...err, cpf: ""})
    }
		changeValue(value);
	}
	return(
		<>
			<label>CPF:</label>
			<Input err={err.cpf} placeholder={""} changeValue={handleCpf} value={value} required={true} mask={/(\w{3})(\w{3})(\w{3})(\w{2})/} validation={/[0-9]/g} max={11} format={"$1.$2.$3-$4"} pad="_"/>
		</>
	);
}

export default CpfInput;