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

function EmailInput({changeValue, value, err, setErr} : props) {
	//valida email seguindo padrão de uma expressão regular
	const handleEmail = (value: string) => {
		const emailRegex = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,10})+$/);
		if(!value.match(emailRegex) && value.length > 0){
      setErr({...err, email: "Email invalido."})
    }else{
      setErr({...err, email: ""})
    }
		changeValue(value);
	}
	return(
		<>
			<label>Email:</label>
			<Input err={err.email} placeholder={"email@email.com"} changeValue={handleEmail} value={value} required={true} mask={/ /}  validation={/[A-Za-z0-9._%+-@]/g} max={300} format="" pad={""}/>
		</>
	);
}

export default EmailInput;