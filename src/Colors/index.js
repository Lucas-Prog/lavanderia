import React, {Component} from 'react';
import Axios from 'axios';
import { SliderPicker } from 'react-color';

import Header from '../public/header';
import img_placeholder from '../public/placeholder-img.jpg';

import './colors.css';
import { when } from 'q';

class index extends Component{
    state ={
        createState: false,
        editState: false,
        Cor: "",
        Cores: []
    }
    componentDidMount(){
        Axios.get('http://localhost:3000/color').then(res => {
            var Cores = res.data.result[0];
            this.setState({Cores});
        });
        this.verificaNivel();

        sessionStorage.removeItem("Selecionado");
    }

    componentDidUpdate(){
        Axios.get('http://localhost:3000/color').then(res => {
            var Cores = res.data.result[0];
            this.setState({Cores});
        });
    }

    verificaNivel(){
        if(sessionStorage.getItem('nivel') == 'Atendente')
        {   console.log("BTN DESABILITADO");
            document.querySelector('#btn-create').disabled = true;
            document.querySelector('#btn-edit').disabled = true;
            document.querySelector("#btn-delete").disabled = true;
        }else{
            console.log("BTN HABILITADO");
            document.querySelector("#btn-create").disabled = false;
            document.querySelector("#btn-edit").disabled = false;
            document.querySelector("#btn-delete").disabled = false;
        }
    }
    limpaLista = () =>{
        var tabela = document.getElementById("corpo_tabela");
        var linhas = tabela.getElementsByTagName("tr");

        for(var i = 0; i < linhas.length; i++){
            var a = linhas[i];
            a.classList.remove("selecionado");
        }
    }
    verificaLista = (linha) =>{
        this.limpaLista();
        // linha.classList.toggle("selecionado");
        Axios.get("http://localhost:3000/color/"+sessionStorage.getItem("Selecionado")).then(res => {
            console.log(res.data.result[0].hexadecimal); 
            // ARRUMAR ESSA PARTE DE UNDEFINED NO HEXADECIMAL.
        });
        try{
            document.getElementById(sessionStorage.getItem("Selecionado")).classList.toggle("selecionado");
        }catch(e){
        }
    }
    handleChangeComplete = (color) =>{
        this.setState({Cor: color.hex});
    }
    render(){
        return(
            <>
                <Header name="cores"/>
                <div id="volta">
                        <p>↪ Voltar</p>
                    </div>

                    <div id="icon-page">
                        {/* CARROUSEL */}
                        <img src={img_placeholder} alt=" "></img>
                    </div>

                    <div id="content-users" on >
                        <div id="navigation-users">
                            <p>Lista de Cores</p>
                            <div id="search">
                                <img src={img_placeholder} alt=" "></img>
                                <input type="text" placeholder="Procurar" name="search" id="search-piece" onChange={()=>{sessionStorage.setItem("pesquisa", document.getElementById('search-user').value)}}/>
                            </div>
                            
                            <button id="btn-find">Localizar</button>

                            <button 
                                id="btn-create" 
                                onClick={() =>{
                                    this.setState({createState: !this.state.createState});
                                    this.state.createState == true ? document.querySelector("#color-name").disabled = true : document.querySelector("#color-name").disabled = false;
                                    if(this.state.editState)
                                        this.setState({editState: false});
                                }}
                            >Criar</button>
                            <button 
                                id="btn-edit"
                                onClick={() =>{
                                    this.setState({editState: !this.state.editState});
                                    this.state.editState == true ? document.querySelector("#color-name").disabled = true : document.querySelector("#color-name").disabled = false;
                                    if(this.state.createState)
                                        this.setState({createState: false}) ;
                                }}
                            >Editar</button>

                            <button 
                                id="btn-delete" 
                                onClick={() =>{
                                    Axios.delete('http://localhost:3000/color/' + sessionStorage.getItem('Selecionado'));
                                }}
                            >Excluir</button>
                        </div>
                    </div>

                    <div id='colors-content'>
                        <div id='colors-table'>
                            <table>
                                <tbody id="corpo_tabela">{
                                    this.state.Cores.map(Cores => 
                                        <tr id={Cores.id_cor}
                                            onClick={() =>{
                                                sessionStorage.setItem("Selecionado", localStorage.getItem("Selecionado") == Cores.id_cor ? " " : Cores.id_cor);
                                                this.verificaLista(document.getElementById(Cores.id_cor));
                                                this.state.createState || this.state.editState ? document.querySelector("#color-name").value = Cores.cor : document.querySelector("#color-name").value = null;
                                            }}    
                                        >
                                            <td>{Cores.cor_nome}</td>
                                        </tr>
                                    )}</tbody>
                            </table>
                        </div>

                        <div id='colors-action'>
                            <p>Nome da Cor</p>
                            <input 
                                type='text'
                                id='color-name'
                                disabled

                            />

                            <input 
                                type='button'
                                id='color-salvar'
                                value='Salvar'
                                onClick={() =>{
                                    var data = {
                                        "color": document.getElementById('color-name').value,
                                        "hexadecimal": this.state.Cor
                                    };
                                    if(this.state.createState && !document.querySelector("#color-name").disabled)
                                        {Axios.post('http://localhost:3000/color/register', data);
                                        console.log(document.querySelector("#color-name").disabled);}
                                    else if(this.state.editState && !document.querySelector("#color-name").disabled)
                                        {Axios.put('http://localhost:3000/color/' + sessionStorage.getItem('Selecionado'), data)}
                                }}
                            />
                            <div id='color-picker'>
                                <SliderPicker 
                                    color={this.state.Cor}
                                    onChange={this.handleChangeComplete}/>
                            </div>
                        </div>
                    </div>
                </>
        )
    }
}

export default index;