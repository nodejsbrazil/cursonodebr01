class HeroiCRUD {
    constructor() {
        this.herois = []
    }

    cadastrar(heroi) {
        this.herois.push(heroi)
    }

    listar() {
        return this.herois;
    }

    obterHeroiPorId(id) {
        for (let posicao = 0; posicao < this.herois.length; ++posicao) {
            const heroi = this.herois[posicao];
            if (heroi.id !== id) continue;

            return {
                heroi,
                posicao
            };
            break;
        }

        throw new Error('Heroi não encontrado!')
    }

    atualizar(id, novoHeroi) {
        const {
            heroi,
            posicao
        } = this.obterHeroiPorId(id);

        this.herois[posicao] = Object.assign({}, heroi, novoHeroi)

    }

    remover(id) {
        const {
            posicao
        } = this.obterHeroiPorId(id)

        this.herois.pop(posicao)
    }
}

(function main() {
    try {
        const heroiCrud = new HeroiCRUD()

        // cadastrar
        heroiCrud.cadastrar({
            id: 1,
            name: 'Erick'
        })
        heroiCrud.cadastrar({
            id: 2,
            name: 'Wendel'
        })
        heroiCrud.cadastrar({
            id: 3,
            name: 'Silva'
        })
        console.log('listar', heroiCrud.listar())

        //atualizar
        heroiCrud.atualizar(1, {
            name: 'Flash'
        })
        const {
            heroi
        } = heroiCrud.obterHeroiPorId(1)
        console.log('heroi atualizado', heroi)

        // remover
        heroiCrud.remover(2)
        console.log('removido', heroiCrud.listar())
    } catch (error) {
        console.error('Erro!', error.message)
    }
})()