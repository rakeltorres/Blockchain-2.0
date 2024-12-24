const { createHash } = require('crypto');

class Block {
    constructor(index = 0, previousHash = null, transacoes = [], minerador = "Miner", recompensaBase = 10, difficulty = 3) {
        this.index = index;
        this.previousHash = previousHash;
        this.transacoes = transacoes;
        this.minerador = minerador;
        this.recompensaBase = recompensaBase;
        this.timestamp = new Date();
        this.difficulty = difficulty;
        this.nonce = 0;
        this.hash = this.calculoHash();

        this.recompensaTotal = this.calcularRecompensa();
        this.mine();
    }

    calculoHash() {
        const data = this.nonce + this.index + this.timestamp + JSON.stringify(this.transacoes) + this.previousHash + this.recompensaTotal + this.minerador;
        return createHash('sha256').update(data).digest('hex');
    }

    mine() {
        while (this.hash.substring(0, this.difficulty) !== Array(this.difficulty + 1).join("0")) {
            this.nonce++;
            this.hash = this.calculoHash();
        }
        console.log(`Bloco ${this.index} minerado com hash: ${this.hash}`);
    }

    calcularRecompensa() {
        const totalTaxas = this.transacoes.reduce((total, transacao) => total + transacao.taxa, 0);
        return this.recompensaBase + totalTaxas;
    }
}

module.exports = Block;
