class Transacoes {
    constructor(enviou, recebeu, valor, taxa = 0) {
        this.enviou = enviou;
        this.recebeu = recebeu;
        this.valor = valor;
        this.taxa = taxa;
        this.timestamp = new Date();
    }

    isValid() {
        if (!this.enviou || !this.recebeu || typeof this.valor !== 'number' || typeof this.taxa !== 'number') {
            console.log('Transação inválida: Campos obrigatórios ausentes ou incorretos.');
            return false;
        }

        if (this.valor <= 0 || this.taxa < 0) {
            console.log('Transação inválida: Valor ou taxa inválidos.');
            return false;
        }

        return true;
    }
}

module.exports = Transacoes;
