import React, {useState, useEffect} from "react";

import Styled from "styled-components";

const SInput = Styled.input`
	width: 100%;
	border: none;
	border-bottom: 1px solid gray;
	outline: none;
`;

const SError = Styled.p`
	color: red;
	font-size: 9pt;
	margin: 0;
`;

interface props {
	changeValue: Function,
	required: boolean,
	mask: RegExp,
	validation: RegExp,
	value: string,
	placeholder: string,
	max: number,
	format: string,
	pad: string,
	err: string
}

function Input({changeValue, required, mask, validation, value, placeholder, max, format, pad , err}: props) {
	//Adiciona o padding ao input
	const padInput = (value: string):string => {
		if(pad){
			return value.padEnd(max, pad).replace(mask, format);
		}
		return value;
	}

	const [input, setInput] = useState<string>(padInput(value));

	//Valida inputs pelo padrão(validation) e aplica mascara
	const handleInput = (e: string) => {
		const cpfRegx = new RegExp(validation);
		if(value.length < max){
				let val: string = e.match(cpfRegx)?.join("") + "";
				let inp: string = value + val[val.length - 1];
				if(!e){
					changeValue("");
					setInput("");
				}
				if(e.length < input.length){
					val = "";
					if(value.length > 0){
							val = value.slice(0, value.length - 1);
					}
					let valPad: string = padInput(val);
					changeValue(val);
					setInput(valPad);
				}
				else if(e[e.length - 1].match(cpfRegx)){
					const fval: string = padInput(inp);
					setInput(fval);
					changeValue(inp);
				}

		}else if(e.length < input.length){
			let val: string = value.slice(0, value.length - 1);
			let valPad: string = padInput(val);
			changeValue(val);
			setInput(valPad);
		}
	}

	return(
		<>
			<SInput placeholder={placeholder} value={input} onChange={e => handleInput(e.target.value)} required={required}/>
			{err ? <SError>{err}</SError> : null}
		</>
	);
}

export default Input;