import React, { useState, useEffect } from 'react';
import './style.css'
import { Jumbotron, Input, Button, PopoverHeader, PopoverBody, UncontrolledPopover, Row, Col, Modal, ModalBody, ModalHeader } from 'reactstrap';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';

// nodejs library that concatenates classes
import classNames from "classnames";
import Autocomplete from '@material-ui/lab/Autocomplete';
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons


import { IoIosRemoveCircleOutline } from 'react-icons/io'
import GridContainer from "components/Grid/GridContainer.js";
import Parallax from "components/Parallax/Parallax.js";

import './style.css'
import { TiArrowBack } from 'react-icons/ti'

import styles from "assets/jss/material-kit-react/views/profilePage.js";

import { MdPlayArrow } from 'react-icons/md';
import { FaCheckCircle } from 'react-icons/fa'

const useStyles = makeStyles(styles);
export default function NFE(props) {
    useEffect(() => {
        coletarDados();
        coletarDados2();
    }, [])

    async function coletarDados() { //coletando os dados da API

        let dados = await axios(`http://localhost:5000/v1/Customer`, {
            method: 'GET'
        })
        debugger
        setDadoId(dados.data)

        let obterdados = []
        obterdados = [
            ...obterdados,
            dados.data.map(x => (x.name))
        ]



        setDados1(obterdados[0]);
    }

    async function coletarDados2() { //coletando os dados da API


        let dados = await axios(`http://localhost:5000/v1/product`, {
            method: 'GET'
        })

        debugger
        let obterdados = []
        obterdados = [
            ...obterdados,
            dados.data.map(x => (x.description))
        ]



        setDadosProdutos(obterdados[0]);
    }

    async function bucarDados(event) {

        try {
            let response = await axios(`http://18.189.30.2:3001/v1/ListarProdutoDescricao/${event.toUpperCase()}`);
            let dados = []
            let idUsuario = []
            idUsuario = [
                ...idUsuario,
                response.data.map(x => (x.id))
            ];
            dados = [
                ...dados,
                response.data.map(x => (x.descricao))
            ];
            setDados1(dados[0]);

        } catch {

        }


    }

    //#region constantes e funções 
    const [dadosTableProducts, setDadosTableProducts] = useState([])
    const [descricaoProduto, setDescricaoProduto] = useState('')
    const [dadosProdutos, setDadosProdutos] = useState([])
    const [optionsProduto, setOptionsProduto] = useState([])
    const [creditCliente, setCreditCliente] = useState('');
    const [cpfCliente, setCpfCliente] = useState('')
    const [numeroEndereco, setNumeroEndereco] = useState('')
    const [complementoEndereco, setComplementoEndereco] = useState('')
    const [foneCliente, setFoneCliente] = useState('');
    const [idProduto, setIdProduto] = useState('');
    const [dados, setDados] = useState([]);
    const [dados1, setDados1] = useState([]);
    const [dados2, setDados2] = useState([]);
    const [descricao, setDescricao] = useState('');
    const [options, setOptions] = useState(dados1[0])
    const [numberVenda, setNumberVenda] = useState('');
    const [ncm, setNcm] = useState('')
    const [unidade, setUnidade] = useState('')
    const [nomeProduto, setNomeProduto] = useState('');
    const [codigoInterno, setCodigoInterno] = useState('')
    const [valorVenda, setValorVenda] = useState('');
    const [ativo, setAtivo] = useState(true);
    const [dadoId, setDadoId] = useState([]);
    const [origemSalvar, setOrigemSalvar] = useState('');
    const [status, setStatus] = useState('A');
    const [cepEndereco, setCepEndereco] = useState('');
    const [logrEndereco, setLogrEndereco] = useState('');
    const [cidadeEndereco, setCidadeEndereco] = useState('');
    const [bairroEndereco, setBairroEndereco] = useState('');
    const [ufEndereco, setUfEndereco] = useState('');
    const history = useHistory();
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    const origemProduto = [
        { name: '' },
        { id: "0001", name: 'Nome Livre' },
        { id: "0007", name: 'Não deseja ser contatado' },
        { id: "0009", name: 'Cliente Aceitou Oferta' },
        { id: "0015", name: 'Caiu a ligação' },
        { id: "0019", name: 'Viajou' },
        { id: "0021", name: 'Falecido' }
    ]


    async function buscaCep(e) {

        setCepEndereco(e);
        let cepGet = e;
        if (cepEndereco.length >= 8) {
            setCepEndereco(cepEndereco.substring(0, cepEndereco.length - 1));
        };
        if (cepGet.length < 8) {
            setLogrEndereco("");
            setCidadeEndereco("");
            setBairroEndereco("");
            setUfEndereco("");
            return
        }
        if (cepGet.length === 8) {

            let dados = await axios(`https://viacep.com.br/ws/${cepGet}/json/`, {
                method: "GET"
            });
            debugger
            if (dados.data.erro === true) {
                return
            }

            setLogrEndereco(dados.data.logradouro);
            setCidadeEndereco(dados.data.localidade);
            setBairroEndereco(dados.data.bairro);
            setUfEndereco(dados.data.uf);
        }

    }

    async function handlerIsChecked2(x) {

        setIdProduto(x.id);
        toggle(true);
        let dados = await axios(`http://18.189.30.2:3001/v1/Produto/${x.id}`, {
            method: 'GET'
        });
        setNcm(dados.data.ncm);
        setUnidade(dados.data.unidade);
        setNomeProduto(dados.data.descricao);
        setCodigoInterno(dados.data.codigoInterno);
        setValorVenda(dados.data.valorVenda);
        setOrigemSalvar(dados.data.origem);
        setAtivo(dados.data.status);
        return
    }

    function onlynumber(evt) { // FUNÇÃO PARA DIGITAR APENAS NUMEROS PELO USUARIO
        debugger
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

    function converter() { // CONVERTER PARA MOEDA 

        let numberVenda1;
        let teste = ""

        teste = valorVenda.replace(',', '.');
        numberVenda1 = new Intl.NumberFormat('pt-br', { currency: 'BRL', style: 'currency' }).format(Number(teste));
        if (numberVenda1 === "R$ NaN") {
            alert("Sounan")
        }
        setValorVenda(numberVenda1);
        setNumberVenda(teste);

    }

    function handlerSubmt(e) {
        e.preventDefault();
    };

    async function SalvarDados() {  //MANDAR OS DADOS SALVOS PARA A 'api'
        debugger
        let dados = '';
        let req = '';
        dados = {
            "Descricao": nomeProduto.toUpperCase(),
            "CodigoInterno": codigoInterno,
            "status": status,
            "ValorVenda": Number(numberVenda),
            "Origem": Number(origemSalvar.substring(0, 1)),
            "Unidade": unidade,
            "Ncm": ncm,
            "UsuarioId": Number(localStorage.getItem('UsuarioId')),
        }
        try {
            req = await axios(`http://18.189.30.2:3001/v1/Produto`, {
                method: 'POST',
                data: dados
            });

            if (req.data.mensagem !== "Produto cadastrado com sucesso!") {
                dados = {
                    "Descricao": nomeProduto.toUpperCase(),
                    "CodigoInterno": codigoInterno,
                    "status": status,
                    "ValorVenda": Number(numberVenda),
                    "Origem": Number(origemSalvar.substring(0, 1)),
                    "Unidade": unidade,
                    "Ncm": ncm,
                    "UsuarioId": Number(localStorage.getItem('UsuarioId')),
                }
                req = await axios(`http://18.189.30.2:3001/v1/Produto`, {
                    method: 'POST',
                    data: dados
                });
            }
            return history.push('/produto');
        } catch {

        }

    }

    //#endregion


    const classes = useStyles();

    async function pesquisar(event) {
        if (event.keyCode === 13) {
            if (descricao === '') {
                return
            }

            let salvaId = '';
            dadoId.map(x => {
                if (descricao === x.name.toUpperCase()) {

                    salvaId = x.id

                }
            })

            let dados2 = await axios(`http://localhost:5000/v1/address/${salvaId}`, {
                method: 'GET'
            })

            setComplementoEndereco(dados2.data.complement);
            setBairroEndereco(dados2.data.county)
            setCidadeEndereco(dados2.data.city)
            setUfEndereco(dados2.data.states)
            setLogrEndereco(dados2.data.street)
            setCepEndereco(dados2.data.zip)
            setNumeroEndereco(dados2.data.number)

            let dadosJsonCliente = await axios(`http://localhost:5000/v1/Customer`, {
                method: 'GET'
            })

            dadosJsonCliente.data.map(x => {
                if (x.id === salvaId) {
                    setFoneCliente(x.telephone)
                    setCpfCliente(x.cpf)
                    setCreditCliente(x.credit)
                }
            })
            let dadosJsonClienteStatus = await axios(`http://localhost:5000/v1/Status`, {
                method: 'GET'
            })
            dadosJsonClienteStatus.data.map(x => {
                if (x.custumerId === salvaId) {
                    debugger
                    setOrigemSalvar(x.description)
                }
            })
        }
    }


    async function pesquisar2(event) {
        if (event.keyCode === 13) {
            if (descricaoProduto === '') { return }

            let dadosTable = []
            let dadosJsonProduto = await axios(`http://localhost:5000/v1/Product`, {
                method: 'GET'
            })
            debugger
            dadosJsonProduto.data.map(x => {
                if (x.description.toUpperCase() === descricaoProduto.toUpperCase()) {
                    dadosTable = [
                        ...dadosTable, {
                            description: x.description,
                            price: x.price,
                            type: x.type,
                            productCode: x.productCode,
                            id: x.id
                        }
                    ]
                }
            })
            setDadosTableProducts(dadosTable)
        }

    }

    async function limparDado(e) {
        debugger
        if (window.confirm("Cancelar item?")) {
            let index = dados.findIndex(x => x.id === e.id);
            setDados([...dados.slice(0, index), ...dados.slice(index + 1)]);
            setOptions('');
            return
        }
    }

    return (
        <>

            <div>




                <Parallax style={{ maxHeight: 140 }} small filter image={require("assets/img/profile-bg.jpg")} />
                <div className={classNames(classes.main, classes.mainRaised)}>
                    <div>
                        <div className={classes.container}>
                            <Link to="/profile-page" > <TiArrowBack size={45} /></Link>
                            <GridContainer>
                                <Jumbotron className="w-100" >
                                    <div className="content">
                                        <h2 className="text-center">Cliente</h2>
                                        <h6 className="ml-4">Dados do Cliente</h6>
                                        <hr className="ml-4"></hr>

                                        <form className="formulario-show ml-4" role="form" onSubmit={handlerSubmt}>




                                            <div className="row mt-2">
                                                {/* <div className="form-group col-lg-4">
                                                    <label className="input-valor-venda">Nome</label>
                                                    <input className="form-control"
                                                        value={valorVenda}
                                                        onKeyPress={onlynumber}
                                                        onChange={e => setValorVenda(e.target.value)}
                                                       
                                                    ></input>

                                                </div> */}
                                                <div className="form-group col-lg-2">
                                                    <label className="input-valor-venda">Nome</label>
                                                    <Autocomplete
                                                        aria-hidden="true"
                                                        disableClearable

                                                        options={dados1}
                                                        value={options}
                                                        onChange={(event, newValue) => {
                                                            setOptions(newValue);
                                                        }}
                                                        inputValue={descricao}
                                                        onInputChange={(event, newInputValue) => {
                                                            setDescricao(newInputValue.toUpperCase());
                                                            bucarDados(newInputValue.toUpperCase());
                                                        }}
                                                        onKeyUp={pesquisar}
                                                        renderInput={(params) => (
                                                            <div ref={params.InputProps.ref}
                                                                className="input-item-pesquisar">
                                                                <input
                                                                    spellCheck="true"
                                                                    style={{ width: 150, height: 35 }}
                                                                    type="text"
                                                                    {...params.inputProps} />

                                                            </div>
                                                        )}
                                                    />
                                                </div>


                                                <div className="form-group col-lg-3">
                                                    <label className="input-valor-venda">CPF</label>
                                                    <input className="form-control"
                                                        id="PopoverFocus"
                                                        value={cpfCliente}
                                                        onKeyPress={onlynumber}
                                                        onChange={e => setCpfCliente(e.target.value)}

                                                    ></input>

                                                </div>

                                                <div className="form-group col-lg-3">
                                                    <label className="input-valor-venda">Status Atual</label>
                                                    <Input className="form-control"
                                                        id="PopoverFocus"
                                                        value={origemSalvar}
                                                        onChange={e => setOrigemSalvar(e.target.value)}

                                                        type="select"
                                                    >
                                                        {origemProduto.map((item) => (


                                                            <option key={item.id}>{item.name}</option>
                                                        ))}
                                                    </Input>

                                                </div>
                                                <div className="form-group col-lg-3">
                                                    <label className="input-valor-venda">Crédito</label>
                                                    <Input className="form-control"
                                                        id="PopoverFocus"
                                                        value={creditCliente}
                                                        onChange={e => setCreditCliente(e.target.value)}
                                                        type="text"
                                                    >
                                                    </Input>

                                                </div>
                                            </div>

                                            <div className="row ">
                                                <div className="form-group col-lg-3">
                                                    <label className="input-valor-venda">CEP</label>
                                                    <input className="form-control"
                                                        value={cepEndereco}
                                                        onChange={e => buscaCep(e.target.value)}
                                                    ></input>

                                                </div>

                                                <div className="form-group col-lg-2">
                                                    <label className="input-grupo-produto">Numero</label>
                                                    <input className="form-control"
                                                        value={numeroEndereco}
                                                        onChange={e => setNumeroEndereco(e.target.value)}
                                                    ></input>

                                                </div>
                                                <div className="form-group col-lg-3">
                                                    <label className="input-valor-venda">Cidade</label>
                                                    <input className="form-control"
                                                        value={cidadeEndereco}
                                                        onChange={e => setCidadeEndereco(e.target.value)}
                                                    ></input>

                                                </div>
                                                <div className="form-group col-lg-3">
                                                    <label className="input-valor-venda">Bairro</label>
                                                    <input className="form-control"
                                                        value={bairroEndereco}
                                                        onChange={e => bairroEndereco(e.target.value)}
                                                    ></input>

                                                </div>
                                                <div className="form-group col-lg-1">
                                                    <label className="input-valor-venda">UF</label>
                                                    <input className="form-control"
                                                        value={ufEndereco}
                                                        onChange={e => setUfEndereco(e.target.value)}
                                                    ></input>

                                                </div>
                                            </div>
                                            <div className="row ">
                                                <div className="form-group col-lg-4">
                                                    <label className="input-valor-venda">Logradouro</label>
                                                    <input className="form-control"
                                                        value={logrEndereco}
                                                        onChange={e => setLogrEndereco(e.target.value)}
                                                    ></input>

                                                </div>
                                                <div className="form-group col-lg-4">
                                                    <label className="input-valor-venda">Complemento</label>
                                                    <input className="form-control"

                                                        value={complementoEndereco}
                                                        onChange={e => setComplementoEndereco(e.target.value)}

                                                    ></input>

                                                </div>

                                                <div className="form-group col-lg-4">
                                                    <label className="input-grupo-produto">Fone</label>
                                                    <input className="form-control"
                                                        value={foneCliente}
                                                        onChange={e => setFoneCliente(e.target.value)}

                                                    ></input>

                                                </div>



                                            </div>


                                            <div>
                                                <Link

                                                    color="primary"
                                                    className="border-none ">Adicionar Produtos </Link>
                                                <Row>
                                                    <Col sm={4}>
                                                        <Autocomplete
                                                            style={{ width: 200 }}
                                                            aria-hidden="true"
                                                            disableClearable

                                                            options={dadosProdutos}
                                                            value={optionsProduto}
                                                            onChange={(event, newValue) => {
                                                                setOptions(newValue);
                                                            }}
                                                            inputValue={descricaoProduto}
                                                            onInputChange={(event, newInputValue) => {
                                                                setDescricaoProduto(newInputValue.toUpperCase());
                                                                bucarDados(newInputValue.toUpperCase());
                                                            }}
                                                            onKeyUp={pesquisar2}
                                                            renderInput={(params) => (
                                                                <div ref={params.InputProps.ref}
                                                                    className="input-item-pesquisar">

                                                                    <input
                                                                        spellCheck="true"
                                                                        style={{ width: 330, height: 35 }}
                                                                        type="text"
                                                                        {...params.inputProps} />

                                                                </div>
                                                            )}
                                                        />
                                                    </Col>
                                                    <Col sm={1}>
                                                        <FaCheckCircle onClick={pesquisar2} className="check-item float-left mt-1" size={25} />
                                                    </Col>
                                                </Row>

                                                <hr></hr>
                                                <div className="row">
                                                    <table className="tabela mb-3 ">
                                                        <thead >
                                                            <tr >
                                                                <th>#</th>
                                                                <th>ID</th>
                                                                <th>description</th>
                                                                <th>price</th>
                                                                <th>type</th>
                                                                <th>productCode</th>


                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {
                                                                dadosTableProducts.map(x => (
                                                                    <>

                                                                        <tr className="mt-2" key={x.id}>
                                                                            <MdPlayArrow onClick={handlerIsChecked2.bind(this, x)} className="principal-especifica mt-2" size={15} />
                                                                            <td>{x.id}</td>
                                                                            <td>{x.description}</td>
                                                                            <td   >{Intl.NumberFormat('pt-br', { currency: 'BRL', style: 'currency' }).format(x.price)}</td>
                                                                            <td>{x.type}</td>
                                                                            <td>{x.productCode}</td>

                                                                        </tr>

                                                                    </>
                                                                ))
                                                            }
                                                        </tbody>
                                                    </table>
                                                </div>
                                                <hr></hr>

                                            </div>
                                        </form>

                                    </div>

                                    <div className="box-actions">
                                        <div className="row">

                                            <div className="ml-auto">
                                                <Button className="btn-enviar" onClick={SalvarDados}>Enviar </Button>

                                            </div>
                                        </div>
                                    </div>
                                    <UncontrolledPopover trigger="focus" placement="bottom" target="PopoverFocus">
                                        <PopoverHeader>Atenção</PopoverHeader>
                                        <PopoverBody>Para valores com casas decimais utilize o "Ponto ."</PopoverBody>
                                    </UncontrolledPopover>

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