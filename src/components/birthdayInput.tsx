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

function BirthdayInput({changeValue, value, err, setErr} : props) {

  //valida data
  const handleBirthday = (birthday : string) => {
    if(birthday.length < 8 && birthday.length > 0){
      setErr({...err, birthday: "Data invalida."})
    }else{
      setErr({...err, birthday: ""})
    }
    //possibilita o número zero no dia ex(01)
    let dZero: string = "";
    if(birthday[0] === "0"){
      dZero = "0";
    }
    //possibilita o número zero no mês ex(01)
    let mZero: string = "";
    if(birthday[2] === "0"){
      mZero = "0";
    }

    //transforma strings em int para validar os dias, meses e anos
    let day: number = parseInt(birthday.slice(0, 2));
    let month: number = parseInt(birthday.slice(2, 4));
    let year: number = parseInt(birthday.slice(4));

    //valida dias para no máximo 31
    if(day > 31){
      day = 31;
    }

    //valida meses para no máximo 12
    if(month > 12){
      month = 12;
    }

    //apenas o primeiro digito de day e month podem ser zero.
    changeValue(`${dZero}${day || ""}${mZero}${month || ""}${year || ""}`);
  }
  return(
    <>
      <label>Nascimento:</label>
      <Input err={err.birthday} placeholder={""} changeValue={handleBirthday} value={value} required={true} mask={/(\w{2})(\w{2})(\w{4})/} validation={/[0-9]/g} max={8} format={"$1/$2/$3"} pad="_"/>
    </>
  );
}

export default BirthdayInput;