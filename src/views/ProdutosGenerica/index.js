import React, { useState, useEffect } from 'react';
import './style.css'

import { Input, Jumbotron, Modal, ModalBody, ModalHeader, Pagination, PaginationItem, PaginationLink, PopoverBody, PopoverHeader, Row, UncontrolledPopover } from 'reactstrap';
import { Link, useHistory } from 'react-router-dom';
import { FiPlus } from 'react-icons/fi'
import axios from 'axios';
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
// core components

import { TiArrowBack } from 'react-icons/ti'

import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Parallax from "components/Parallax/Parallax.js";
// import { TabContent, TabPane, Nav, NavItem, NavLink, Jumbotron } from 'reactstrap';

import styles from "assets/jss/material-kit-react/views/profilePage.js";
import { Button } from "reactstrap";
import { MdPlayArrow } from 'react-icons/md';
const useStyles = makeStyles(styles);

export default function ProdutoGenerica() {
    useEffect(() => {
        buscaClientes()

    }, []);

    //#region constantes e funções 

   
    const [ncm, setNcm] = useState('')
    const [unidade, setUnidade] = useState('')
    const [nomeProduto, setNomeProduto] = useState('');
    const [codigoInterno, setCodigoInterno] = useState('')
    const [valorVenda, setValorVenda] = useState('');
    const [ativo, setAtivo] = useState(false);
    const [inativo, setInativo] = useState(false);
    const [origemSalvar, setOrigemSalvar] = useState('');
    const [status, setStatus] = useState('A')
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    const [pesquisar, setPesquisar] = useState('');
    const hystory = useHistory();
    const [dados, setDados] = useState([]);
    const [pagination, setPagination] = useState([]);
    const [principal, setPrincipal] = useState([1, 2, 3, 4, 5]); //esse cara aqui
    const convert = Intl.NumberFormat('pt-br', { currency: 'BRL', style: 'currency' });
    const [idProduto, setIdProduto] = useState('');
    const [unMedida,setUnMedida] = useState('');
    const [nomeCliente, setNomeCliente] = useState('')
    const [cpfCliente , setCpfCliente] = useState('')
    const [telefoneCliente, setTelefoneCliente] = useState('')
    const [dadosClienteTable, setDadosClienteTable] = useState([])

    async function buscaClientes(){
        let dados = await axios(`http://localhost:5000/v1/Customer`, {
            method: 'GET',
        })
        setDadosClienteTable(dados.data)
    }

   async function salvarCliente(){

    let dadosJson = {
        
            "name": nomeCliente,
            "cpf": cpfCliente,
            "telephone": telefoneCliente
    }

    let dadosCliente = await axios(`http://localhost:5000/v1/Customer`, {
        method: 'POST',
        data: dadosJson
    })
    if(dadosCliente.status === 200){
        alert('cliente cadastrado')
        setCpfCliente('')
        setNomeCliente('')
        setTelefoneCliente('')
        return
    }

   }
    const origemProduto = [
        { name: '' },
        { id: 0, name: '0 - Nacional, exceto as indicadas nos códigos 3, 4, 5 e 8' },
        { id: 1, name: '1 - Estrangeira - Importação direta, exceto a indicada no código 6' },
        { id: 2, name: '2 - Estrangeira - Adquirida no mercado interno, exceto a indicada no código 7' },
        { id: 3, name: '3 - Nacional, mercadoria ou bem com Conteúdo de Importação superior a 40% e inferior ou igual a 70%' },
        { id: 4, name: '4 - Nacional, cuja produção tenha sido feita em conformidade com os processos produtivos básicos de que tratam as legislações citadas nos Ajustes' },
        { id: 5, name: '5 - Nacional, mercadoria ou bem com Conteúdo de Importação inferior ou igual a 40%' },
        { id: 6, name: '6 - Estrangeira - Importação direta, sem similar nacional, constante em lista da CAMEX e gás natural' },
        { id: 7, name: '7 - Estrangeira - Adquirida no mercado interno, sem similar nacional, constante lista CAMEX e gás natural' },
        { id: 8, name: '8 - Nacional, mercadoria ou bem com Conteúdo de Importação superior a 70%' }
    ]


    function verificaAtivos() { //  PARA SETAR INATIVO OU ATIVO NO CHECKBOX DE CADASTRO
        setAtivo(!ativo);
        setInativo(!inativo);
        if (ativo) {
            return setStatus("I");
        }
        return setStatus("A");
    }



    function onlynumber(evt) { // FUNÇÃO PARA DIGITAR APENAS NUMEROS PELO USUARIO
        var theEvent = evt || window.event;
        var key = theEvent.keyCode || theEvent.which;
        key = String.fromCharCode(key);
        //var regex = /^[0-9.,]+$/;
        var regex = /^[0-9.]+$/;
        if (!regex.test(key)) {
            theEvent.returnValue = false;
            if (theEvent.preventDefault) theEvent.preventDefault();
        }
    }
    async function handlerIsChecked2(x) {
        debugger
        setIdProduto(x.id);
        toggle(true);
        let dados = await axios(`http://18.189.30.2:3001/v1/Produtos/${x.id}`, {
            method: 'GET'
        });
        debugger
        setNcm(dados.data.ncm);
        setUnidade(dados.data.unidade);
        setNomeProduto(dados.data.descricao);
        setCodigoInterno(dados.data.codigoInterno);
        setValorVenda(dados.data.valorVenda);
        setOrigemSalvar(dados.data.origem);
        setAtivo(dados.data.status);
        setUnMedida(dados.data.unidade);
        return
    }

    function errors() { // tratando caso digitado caracter especial
        let uper = pesquisar
        uper = uper.toUpperCase();
        setPesquisar(uper);
    }


    async function coletarDados() { //coletando os dados da API
        
        let comando = {
         "comando": "SELECT * FROM Produtos"
        }
        
        let dados = await axios(`http://18.189.30.2:5001/v1/soft/ExibirProduto`, {
            method: 'POST',
            data: comando
        })
        debugger
        let obterdados = []
        obterdados = [
            ...obterdados,
            dados.data.map(x => ({

                "codigoInterno": x.codigoInterno,
                "valorVenda": x.valorVenda,
                "unidade": x.unidade,
                "id": x.id,
                "ischecked": "false",
                "descricao": x.descricao,
                "UsuarioId": localStorage.getItem('UsuarioId')
            })

            )
        ]

        setDados(obterdados[0]);
    }


    function handlerSubmt(e) {
        e.preventDefault();
        pesquisarDados();
    };
    async function pesquisarDados() {
        // Aki faz a busca do produto digitado pelo usuario
        let obterdados = []
        let response = await axios(`http://18.189.30.2:3001/v1/Parametros/${69}`);

        if (response.data[0].parametro === "Código Interno") {

            try {


                let dados2 = await axios(`http://18.189.30.2:3001/v1/ListarProdutoCodigoInterno/${pesquisar}`, {
                    method: 'GET'
                });

                obterdados = [
                    ...obterdados,
                    dados2.data.map(x => ({

                        "codigoInterno": x.codigoInterno,
                        "valorVenda": x.valorVenda,
                        "unidade": x.unidade,
                        "estoqueDisponivel": x.estoqueDisponivel,
                        "id": x.id,
                        "ischecked": "false",
                        "descricao": x.descricao,

                    })

                    )
                ];

                setDados(obterdados[0]);
            } catch {

                let dados = await fetch('http://18.189.30.2:3001/v1/Produtos?status=A');
                dados = await dados.json();
                return setDados(dados);
            }


            return
        }
        else if (response.data[0].parametro === "Descrição") {

            try {

                let dados2 = await axios(`http://18.189.30.2:3001/v1/ListarProdutoDescricao/${pesquisar}`, {
                    method: 'GET'
                });

                obterdados = [
                    ...obterdados,
                    dados2.data.map(x => ({

                        "codigoInterno": x.codigoInterno,
                        "valorVenda": x.valorVenda,
                        "unidade": x.unidade,
                        "estoqueDisponivel": x.estoqueDisponivel,
                        "id": x.id,
                        "ischecked": "false",
                        "descricao": x.descricao,

                    })

                    )
                ];

                setDados(obterdados[0]);
            } catch {

                let dados = await fetch('http://18.189.30.2:3001/v1/Produtos?status=A');
                dados = await dados.json();
                return setDados(dados);
            }


            return
        }
        else if (response.data[0].parametro === "Código EAN13") {

            try {

                let dados2 = await axios(`http://18.189.30.2:3001/v1/ListarProdutoEan/${pesquisar}`, {
                    method: 'GET'
                });

                obterdados = [
                    ...obterdados,
                    dados2.data.map(x => ({

                        "codigoInterno": x.codigoInterno,
                        "valorVenda": x.valorVenda,
                        "unidade": x.unidade,
                        "estoqueDisponivel": x.estoqueDisponivel,
                        "id": x.id,
                        "ischecked": "false",
                        "descricao": x.descricao,

                    })

                    )
                ];

                setDados(obterdados[0]);
            } catch {

                let dados = await fetch('http://18.189.30.2:3001/v1/Produtos?status=A');
                dados = await dados.json();
                return setDados(dados);
            }


            return
        }
        else {
            alert('o parâmetro de pesquisa esta configurado incorretamente');
            return
        }

    }


    function proximaPagina() {

        if (principal[4] === pagination.length - 1 || principal[4] > pagination.length - 1) {
            return
        }
        let cont;
        let obterdados = []
        for (cont = 0; cont < 5; cont++) {
            obterdados[cont] = principal[cont] + 1;
        }
        setPrincipal(obterdados);

    }

    async function contador() {

        let dados = await axios(`http://18.189.30.2:3001/v1/ContadorProdutos`, {
            method: 'GET'
        });
        let paginas = dados.data;
        paginas = paginas / 30;
        paginas = Math.round(paginas);

        let cont;
        let pagination2 = [];
        for (cont = 0; cont <= paginas; cont++) {
            pagination2[cont] = 1 + cont;
        }
        setPagination(pagination2);

    }


    function paginaAnterior() {

        if (principal[0] === pagination[1]) {
            return
        }
        let cont;
        let obterdados = []
        for (cont = 0; cont < 5; cont++) {
            obterdados[cont] = principal[cont] - 1;
        }
        setPrincipal(obterdados);
    }

    async function abrePagina() {
        
        let element = document.getElementsByClassName("paginas-itens")[0];
        let pagina = element.attributes[0].ownerDocument.activeElement.innerText;
        pagina = Number(pagina);
        let dados = await axios(`http://18.189.30.2:3001/v1/Produtos?pag=${pagina}`, {
            method: 'GET'
        })
        debugger
        let obterdados = []
        obterdados = [
            ...obterdados,
            dados.data.map(x => ({

                "codigoInterno": x.codigoInterno,
                "valorVenda": x.valorVenda,
                "unidade": x.unidade,
                "estoqueDisponivel": x.estoqueDisponivel,
                "id": x.id,
                "ischecked": "false",
                "descricao": x.descricao,
                "UsuarioId": localStorage.getItem('UsuarioId')
            })

            )
        ]

        setDados(obterdados[0]);

        window.top.focus();

    }
    function uniKeyCode(event) { // função gernerica de evntos de teclas

        if (event.keyCode === 107) {
            return hystory.push('/produtos/new')

        }

        if (event.keyCode === 39) { // Se apertar F9
            return hystory.push('/venda')

        }
        if (event.keyCode === 37) {
            return hystory.push('/inicio');
        }
        if (event.keyCode === 13) { // Se apertar enter
            return pesquisarDados();
        }
    }
    async function salvarProduto() {

        toggle(true);

        let obterdados = {};
        let origemSalvando = origemSalvar;
        if (typeof (origemSalvando) === "string") {
            origemSalvando = Number(origemSalvar.substring(0, 1));
        }
        obterdados = {
            "id": idProduto,
            "descricao": nomeProduto.toUpperCase(),
            "codigoInterno": codigoInterno,
            "status": status,
            "valorVenda": Number(valorVenda),
            "origem": origemSalvando,
            "unidade": unidade,
            "ncm": ncm,
            "usuarioId": Number(localStorage.getItem('UsuarioId')),
        }
        let dados = await axios(`http://18.189.30.2:3001/v1/Produtos?status=A`, {
            data: obterdados,
            method: 'PUT'
        });
        if (dados.data.sucesso === true) {
            alert('Produto alterado com sucesso');
            setAtivo('');
            setInativo('');
            coletarDados();
        } else {
            alert("Ops, alguma coisa deu errada...")
        }
    }
    function sairSistema() {

        history.push('/profile-page');

    }


    const history = useHistory('');
     

    const classes = useStyles();
  
    return (
        <>

            <div>

              

                <Parallax style={{ maxHeight: 140 }} small filter image={require("assets/img/profile-bg.jpg")} />
                <div className={classNames(classes.main, classes.mainRaised)}>
                    <div>
                        <div className={classes.container}>
                            <Link onClick={sairSistema}>  <TiArrowBack size={45} /></Link>
                            <GridContainer justify="center">
                                <GridItem xs={12} sm={12} md={6}>
                                    <div className={classes.profile}>
                                       
                                        <div className={classes.name}>



                                        </div>
                                    </div>
                                </GridItem>
                            </GridContainer>

                            <GridContainer style={{ marginTop: 35 }} justify="center">
                                <Jumbotron id="topo" className="jumbo">
                                    <div className="container-fluid mt-0">
                                        <div className="content mt-0">
                                        <div className="row mt-2">
                                                <div className="form-group col-lg-4">
                                                    <label className="input-valor-venda">Nome</label>
                                                    <input className="form-control"                                                     
                                                      value={nomeCliente}
                                                      onChange={e=> setNomeCliente(e.target.value)}
                                                    ></input>

                                                </div>

                                              
                                                <div className="form-group col-lg-3">
                                                    <label className="input-valor-venda">CPF</label>
                                                    <input className="form-control"
                                                       value={cpfCliente}
                                                       onChange={e=> setCpfCliente(e.target.value)}
                                                    ></input>

                                                </div>

                                                <div className="form-group col-lg-3">
                                                    <label className="input-valor-venda">Telefone</label>
                                                    <input className="form-control"
                                                        value={telefoneCliente}
                                                        onChange={e=> setTelefoneCliente(e.target.value)}
                                                    ></input>

                                                </div>
                                                <Button
                                                 className="botao"
                                                 onClick={salvarCliente}>Salvar cliente</Button>
                                            </div>
                                            <hr></hr>
                                            
                                            <div className="d-flex justify-content-center">
                                                <table className="tabela ">
                                                    <thead>
                                                        <tr>
                                                            <th>#</th>
                                                            <th>Id</th>
                                                            <th>Nome</th>
                                                            <th>Cpf</th>
                                                            <th>Telefone</th>
                                                            
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        { //Aki seta os valores na tabela dinamicamente 
                                                            dadosClienteTable.map(x => (

                                                                <tr className="mt-1" key={x.id}>
                                                                    <td>
                                                                    <MdPlayArrow onClick={handlerIsChecked2.bind(this, x)} className="principal-especifica mt-1 float-right" size={15} />
                                                                    </td>
                                                                    <td>
                                                                        {x.id}
                                                                    </td>
                                                                    <td>
                                                                        {x.name}
                                                                    </td>
                                                                    <td className="descricao-clicando" >
                                                                        {x.cpf}
                                                                    </td>
                                                                   
                                                                    <td>
                                                                        {x.telephone}
                                                                       
                                                                    </td>

                                                                </tr>
                                                            ))
                                                        }
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                    <div>

                                    </div>

                                </Jumbotron>

                            </GridContainer>

                        </div>
                    </div>
                </div>
             
            </div>

        </>
    )
}

//developed by Diego && victor