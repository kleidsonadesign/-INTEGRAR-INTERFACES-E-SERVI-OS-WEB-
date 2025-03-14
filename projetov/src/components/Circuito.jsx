import { useEffect, useState } from 'react';
import './Circuito.css';

const Circuito = () => {
    const [lista, setLista] = useState([]);
    const [novoItem, setNovoItem] = useState("");
    const [editando, setEditando] = useState(null);
    const [novoNome, setNovoNome] = useState("");
    const [precos, setPrecos] = useState({});
    const [promocoes, setPromocoes] = useState({});

    const apiUrl = 'http://localhost:3000/produtos';

    useEffect(() => {
        listarProdutos();
    }, []);

    const listarProdutos = async () => {
        const response = await fetch(apiUrl);
        const data = await response.json();
        setLista(data);
    };

    const adicionaProduto = async (form) => {
        form.preventDefault();
        if (!novoItem) {
            return;
        }
        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nome: novoItem }),
            });
            if (response.ok) {
                setNovoItem("");
                listarProdutos();
            } else {
                const errorData = await response.json();
                alert(errorData.message);
                console.error('Erro ao adicionar produto:', errorData);
            }
        } catch (error) {
            console.error('Erro de rede:', error);
        }
    };

    const inserirPreco = async (index) => {
        const produto = lista[index];
        const precoValor = precos[produto._id];
        if (precoValor === undefined || precoValor === '') {
            alert("Por favor, insira um preço válido.");
            return;
        }
        try {
            const response = await fetch(`${apiUrl}/preco/${produto._id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ preco: parseFloat(precoValor) }),
            });
            if (response.ok) {
                setPrecos({ ...precos, [produto._id]: '' });
                listarProdutos();
            } else {
                const errorData = await response.json();
                alert(errorData.message);
            }
        } catch (error) {
            console.error('Erro de rede ao inserir preço:', error);
        }
    };
    
    const inserirPromocao = async (index) => {
        const produto = lista[index];
        const promocaoValor = promocoes[produto._id];
        if (promocaoValor === undefined || promocaoValor === '') {
            alert("Por favor, insira uma promoção válida.");
            return;
        }
        try {
            const response = await fetch(`${apiUrl}/promocao/${produto._id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ promocao: parseFloat(promocaoValor) }),
            });
            if (response.ok) {
                setPromocoes({ ...promocoes, [produto._id]: '' });
                listarProdutos();
            } else {
                const errorData = await response.json();
                alert(errorData.message);
            }
        } catch (error) {
            console.error('Erro de rede ao aplicar promoção:', error);
        }
    };

    const editarProduto = async (index) => {
        const produto = lista[index];
        try {
            const response = await fetch(`${apiUrl}/${produto._id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nome: novoNome }),
            });
            if (response.ok) {
                setEditando(null);
                setNovoNome(""); 
                listarProdutos(); 
            } else {
                const errorData = await response.json();
                alert(errorData.message);
            }
        } catch (error) {
            console.error('Erro de rede ao editar produto:', error);
        }
    };

    const iniciaEdicao = (index) => {
        setEditando(index);
        setNovoNome(lista[index].nome); 
    };

    const cancelaEdicao = () => {
        setEditando(null);
        setNovoNome("");
    };

    const clicou = async (index) => {
        const produto = lista[index];
        const response = await fetch(`${apiUrl}/${produto._id}`, {
            method: 'PATCH',
        });
        if (response.ok) {
            listarProdutos(); 
        }
    };

    const deleta = async (index) => {
        const produto = lista[index];
        await fetch(`${apiUrl}/${produto._id}`, {
            method: 'DELETE',
        });
        listarProdutos();
    };

    const deletaTudo = async () => {
        await fetch(apiUrl, {
            method: 'DELETE',
        });
        listarProdutos(); 
    };

    const alteraStatusPagamento = async (index) => {
        const produto = lista[index];
        try {
            const response = await fetch(`${apiUrl}/pagamento/${produto._id}`, {
                method: 'PATCH',
            });
            if (response.ok) {
                listarProdutos(); 
            } else {
                const errorData = await response.json();
                console.error('Erro ao alterar status de pagamento:', errorData);
            }
        } catch (error) {
            console.error('Erro de rede ao alterar status de pagamento:', error);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('token');
        window.location.href = '/login';
    };

    return (
        <div>
            <button className='sair' onClick={handleLogout}>Sair</button>
            <h1 className="hCircuito">Gerenciamento de Estoque</h1>
            <form className="fCircuito" onSubmit={adicionaProduto}>
                <input 
                    id='input-entrada'
                    type="text"
                    value={novoItem}
                    onChange={(e) => setNovoItem(e.target.value)}
                    placeholder="Adicione item ao estoque."
                />
                <button className="add" type="submit">Adicionar</button>
            </form>
            <div className="listaInscritos">
                <div style={{ textAlign: 'center' }}>
                    {
                        lista.length < 1
                        ?
                        <h1 className="hCircuito">Nenhum Produto No Sistema</h1>
                        :
                        lista.map((produto, index) => (
                            <div 
                                key={produto._id}
                                className={produto.riscada ? "produtoCortado" : "confirmada"}
                            >
                                <span>Preço: R${produto.preco.toFixed(2)}</span> 
                                {produto.promocao > 0 && <span>Promoção: {produto.promocao}%</span>}
                                {
                                    editando === index ? (
                                        <>
                                            <input 
                                                type="text" 
                                                value={novoNome} 
                                                onChange={(e) => setNovoNome(e.target.value)} 
                                            />
                                            <button onClick={() => editarProduto(index)} className="status">Salvar</button>
                                            <button onClick={cancelaEdicao} className="del">Cancelar</button>
                                        </>
                                    ) : (
                                        <>
                                            <span onClick={() => clicou(index)}>{produto.nome}</span>
                                            <button 
                                                onClick={() => inserirPreco(index)} 
                                                className="status"
                                            >
                                                Inserir Preço
                                            </button>
                                            <input 
                                                type="number" 
                                                value={precos[produto._id] || ''}
                                                onChange={(e) => setPrecos({ ...precos, [produto._id]: e.target.value })}
                                                placeholder="Preço" 
                                            />
                                            <button 
                                                onClick={() => inserirPromocao(index)} 
                                                className="status"
                                            >
                                                Inserir Promoção (%)
                                            </button>
                                            <input 
                                                type="number" 
                                                value={promocoes[produto._id] || ''} 
                                                onChange={(e) => setPromocoes({ ...promocoes, [produto._id]: e.target.value })}
                                                placeholder="Promoção (%)" 
                                            />
                                            <button onClick={() => iniciaEdicao(index)} className="edit">Editar</button>
                                            <button onClick={() => deleta(index)} className="del">Deletar</button>
                                            <button onClick={() => alteraStatusPagamento(index)} className="status">
                                                {produto.pagamentoEfetuado ? 'Conferido' : 'Não Conferido'}
                                            </button>
                                        </>
                                    )
                                }
                            </div>
                        ))
                    }
                    {
                        lista.length > 0 &&
                        <button onClick={deletaTudo} className="delAll">Deletar Estoque</button>
                    }
                </div>
            </div>
        </div>
    );
};

export default Circuito;
