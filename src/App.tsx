import React, {useState} from 'react';
import Styled from "styled-components";

import Register from "./containers/register";
import Edit from "./containers/edit";
import List from "./containers/list";

import Store from "./store";

const SApp = Styled.div`
  padding: 10px;
  display: grid;
  grid-template-columns: 20% 75%;
  justify-content: space-around;
`;

interface Iedit{
  edit: boolean,
  id: number
}

function App() {
  const [list, setList] = useState([...Store]);
  const [edit, setEdit] = useState<Iedit>({edit: false, id: 0});
  return (
    <SApp>
      {edit.edit ? <Edit setEdit={setEdit} list={list} data={list.filter(data => data.id === edit.id)[0]} setList={setList}/> : <Register list={list} setList={setList}/>}
      
      <List setEdit={setEdit} list={list} setList={setList}/>
    </SApp>
  );
}

export default App;
