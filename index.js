const Blockchain = require('./blockchain.js');
const Block = require('./block.js');
const Transacoes = require('./transacoes.js');
const Node = require('./node.js');

// Criar uma rede de nós
const node1 = new Node(1);
const node2 = new Node(2);
const node3 = new Node(3);

const network = [node1, node2, node3];

// Criar algumas transações
const transacao1 = new Transacoes("Alice", "Bob", 50, 1);
const transacao2 = new Transacoes("Bob", "Charlie", 30, 0.5);

// Propagar transações na rede
console.log("Propagando transações...");
node1.propagateTransaction(transacao1, network);
node1.propagateTransaction(transacao2, network);

// Criar e minerar um bloco com as transações pendentes do nó 1
console.log("\nMinerando um novo bloco no nó 1...");
const bloco1 = new Block(
    node1.blockchain.chain.length, 
    node1.blockchain.getLatestBlock().hash, 
    [transacao1, transacao2], 
    "Node1", 
    node1.blockchain.recompensaBase, 
    node1.blockchain.difficulty
);

// Adicionar o bloco à blockchain do nó 1
console.log("\nAdicionando bloco minerado à blockchain...");
node1.blockchain.addBlock(bloco1);

// Propagar o bloco para a rede
console.log("\nPropagando bloco para a rede...");
node1.propagateBlock(bloco1, network);

// Validar a blockchain em cada nó
console.log("\nValidando blockchains...");
network.forEach(node => {
    console.log(`Blockchain do Nó ${node.id} é válida? ${node.blockchain.isChainValid()}`);
});

// Exibir saldos atualizados
console.log("\nSaldos após as transações:");
network.forEach(node => {
    console.log(`Nó ${node.id} - Saldos:`, node.blockchain.balances);
});

// Exibir histórico da blockchain do nó 1
console.log("\nBlockchain do Nó 1:");
console.log(JSON.stringify(node1.blockchain, null, 4));
