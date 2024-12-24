const Blockchain = require('./blockchain.js');
const Transacoes = require('./transacoes.js');
const Block = require('./block.js');

class Node {
    constructor(id) {
        this.id = id;
        this.blockchain = new Blockchain(); // Cada nó tem sua própria blockchain
        this.pendingTransactions = []; // Lista de transações pendentes
    }

    /**
     * Propaga um bloco para outros nós na rede.
     * @param {Block} block - Bloco a ser propagado.
     * @param {Node[]} network - Lista de nós na rede.
     */
    propagateBlock(block, network) {
        network.forEach(node => {
            if (node.id !== this.id) {
                node.receiveBlock(block);
            }
        });
    }

    /**
     * Recebe um bloco propagado por outro nó.
     * @param {Block} block - Bloco recebido.
     */
    receiveBlock(block) {
        if (this.blockchain.addBlock(block)) {
            console.log(`Node ${this.id}: Bloco adicionado!`);
        } else {
            console.log(`Node ${this.id}: Bloco rejeitado.`);
        }
    }

    /**
     * Propaga uma transação para outros nós na rede.
     * @param {Transacoes} transaction - Transação a ser propagada.
     * @param {Node[]} network - Lista de nós na rede.
     */
    propagateTransaction(transaction, network) {
        network.forEach(node => {
            if (node.id !== this.id) {
                node.receiveTransaction(transaction);
            }
        });
    }

    /**
     * Recebe uma transação propagada por outro nó.
     * @param {Transacoes} transaction - Transação recebida.
     */
    receiveTransaction(transaction) {
        if (transaction.isValid()) {
            this.pendingTransactions.push(transaction);
            console.log(`Node ${this.id}: Transação recebida!`);
        } else {
            console.log(`Node ${this.id}: Transação inválida rejeitada.`);
        }
    }
}

module.exports = Node;
