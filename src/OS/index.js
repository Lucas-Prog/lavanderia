import React, { Component } from 'react';

import Header from '../public/header';

import icon_lista from '../public/icons/icon_lista.png';
import OsResumeTable from './OsResumeTable';

import './OS.css';
import { Link,Redirect } from 'react-router-dom';
import Receber from './Receber';
import Pagamento from './Pagamento';

class index extends Component{
    
   
    render(){
        return(
            <div id="containerVendas">
                
                <Header name="Resumo de Vendas" />

                <Link id="btnVoltar" to="/Menu"> 
                    <button type="button" >Voltar</button>
                </Link> 

                <div id="icon-page">
                    {/* CARROUSEL */}
                    <img src={icon_lista} alt=" "></img>
                </div>

                <div id="content-OSresume">
                    <div id="primeira-parte">
                        <select>
                            <option>Cliente</option>
                            <option>Aberto</option>
                            <option>Pago</option>
                            <option>Retirado</option>
                            <option>Não Retirado</option>
                            <option>Cancelado</option>
                        </select>

                        <input type="date" className="date" /> <p>a</p> <input type="date" className="date"/> 
                            
                        <input type="button" value="Pesquisar 🔍" id="btn-pesquisar"/>
                    </div>

                    <div id="OS_buttons">
                        <input type="button" value="RECEBER" id="btn-osReceber" 
                            onClick={() => {
                                document.getElementById("osReceberContainer").style.display = "flex";
                            }}
                        />
                        <input type="button" value="PAGAMENTO $" id="btn-osPagamento" 
                            onClick={() => {
                                document.getElementById("osPagamentoContainer").style.display = "flex";
                            }}/>
                    </div>
                </div>

                <OsResumeTable />
                
              
                <Link id="btnRealizarVenda" to="/Venda"> 
                    <button  type="button" >REALIZAR VENDA</button>
                </Link> 

               

                <Receber />

                <Pagamento />
                
            </div>
        )
    }
}

export default index;