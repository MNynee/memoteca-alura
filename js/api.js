const URL_BASE = 'http://localhost:3000';

const api = {
    async getThoughts() {
        try {
            const response = await axios.get(`${URL_BASE}/pensamentos`)
            return await response.data

        } catch {
            alert('Erro ao buscar pensamentos!')

        }
    },

    async addNewThought(thought) {
        try {
            const response = await axios.post(`${URL_BASE}/pensamentos`, thought)
            return await response.data

        } catch {
            alert('Erro ao adicionar pensamento!')

        }
    },

    async getThoughtById(id) {
        try {
            const response = await axios.get(`${URL_BASE}/pensamentos/${id}`)
            return await response.data

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
    }
}

export default api;