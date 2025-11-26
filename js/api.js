const URL_BASE = 'http://localhost:3000';

const convertStringtoDate = (dateString) => {
    const [year, month, day] = dateString.split('-')
    return new Date(Date.UTC(year, month - 1, day))
}

const api = {
    async getThoughts() {
        try {
            const response = await axios.get(`${URL_BASE}/pensamentos`)
            const thoughts = await response.data

            return thoughts.map(thought => {
                return {
                    ...thought,
                    data: new Date(thought.data)
                }
            })

        } catch {
            alert('Erro ao buscar pensamentos!')

        }
    },

    async addNewThought(thought) {
        try {
            const data = convertStringtoDate(thought.data)
            const response = await axios.post(`${URL_BASE}/pensamentos`, {
                ...thought,
                data: data.toISOString()
            })
            return await response.data

        } catch {
            alert('Erro ao adicionar pensamento!')

        }
    },

    async getThoughtById(id) {
        try {
            const response = await axios.get(`${URL_BASE}/pensamentos/${id}`)
            const thought = await response.data

            return {
                ...thought,
                data: new Date(thought.data)
            }

        } catch {
            alert('Erro ao buscar pensamento!')

        }
    },

    async editThought(thought) {
        try {
            const response = await axios.put(`${URL_BASE}/pensamentos/${thought.id}`, thought)
            return await response.data

        } catch {
            alert('Erro ao editar pensamento!')

        }
    },

    async deleteThought(id) {
        try {
            await axios.delete(`${URL_BASE}/pensamentos/${id}`)
    
        } catch {
            alert('Erro ao excluir pensamento!')
            
        }
    },

    async getThoughtsByTerm(term) {
        const thoughts = await this.getThoughts()
        const termLowerCase = term.toLowerCase()

        try {
            const filteredThoughts = thoughts.filter(thought => {
                return (thought.conteudo.toLowerCase().includes(termLowerCase) || thought.autoria.toLowerCase().includes(termLowerCase))
            })
            return filteredThoughts
            
        } catch (error) {
            alert('Erro ao filtrar pensamentos!')
            throw error
        }
    },

    async updateFavorite(id, favorite) {
        try {
            const response = await axios.patch(`${URL_BASE}/pensamentos/${id}`, { favorito: favorite })
            return await response.data
        } catch (error) {
            alert('Erro ao atualizar favorito!')
            throw error
        }
    }
}

export default api;