import React from "react";

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

function CellInput({changeValue, value, err, setErr} : props) {
  //valida se usuário inseriu número completo e se o número nove está presente na posição correta
  const handleCell = (value : string) => {
		if(value.length < 11 && value.length > 0){
			setErr({...err, cell: "Número de celular invalido."});
		}else if(value[2] !== "9" && value.length > 0 ){
			setErr({...err, cell: "Ponha o número nove antes do seu número."})
		}else{
			setErr({...err, cell: ""})
		}
		changeValue(value);
	}
  return(
    <>
      <label>Número de celular:</label>
      <Input err={err.cell} placeholder="" changeValue={handleCell} value={value} required={true} mask={/(\w{2})(\w{5})(\w{4})/} validation={/[0-9]/g} max={11} format={"($1) $2-$3"} pad="_"/>
    </>
  );
}

export default CellInput;