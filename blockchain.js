const Block = require('./block.js');

class Blockchain {
    constructor() {
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 3;
        this.balances = {};
        this.recompensaBase = 10;
    }

    createGenesisBlock() {
        return new Block(0, '0', [], 'GenesisMiner', this.recompensaBase, this.difficulty);
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock) {
        if (!this.validarTransacoes(newBlock.transacoes)) {
            console.log('Transações inválidas. Bloco rejeitado.');
            return false;
        }

        this.atualizarSaldos(newBlock);
        newBlock.previousHash = this.getLatestBlock().hash;
        this.chain.push(newBlock);
        console.log(`Bloco ${newBlock.index} adicionado à blockchain.`);
        return true;
    }

    validarTransacoes(transacoes) {
        for (const transacao of transacoes) {
            if (!transacao.isValid()) {
                return false;
            }
        }
        return true;
    }

    atualizarSaldos(bloco) {
        for (const transacao of bloco.transacoes) {
            this.balances[transacao.enviou] = (this.balances[transacao.enviou] || 0) - (transacao.valor + transacao.taxa);
            this.balances[transacao.recebeu] = (this.balances[transacao.recebeu] || 0) + transacao.valor;
        }

        const totalTaxas = bloco.transacoes.reduce((total, transacao) => total + transacao.taxa, 0);
        this.balances[bloco.minerador] = (this.balances[bloco.minerador] || 0) + this.recompensaBase + totalTaxas;
    }

    isChainValid() {
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if (currentBlock.hash !== currentBlock.calculoHash()) {
                return false;
            }

            if (currentBlock.previousHash !== previousBlock.hash) {
                return false;
            }
        }
        return true;
    }
}

module.exports = Blockchain;
