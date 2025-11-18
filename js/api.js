const URL_BASE = 'http://localhost:3000';

const api = {
    async getThoughts() {
        try {
            const response = await fetch(`${URL_BASE}/pensamentos`)
            return await response.json()

        } catch {
            alert('Erro ao buscar pensamentos!')

        }
    },

    async addNewThought(thought) {
        try {
            const response = await fetch(`${URL_BASE}/pensamentos`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(thought)
            })
            return await response.json()

        } catch {
            alert('Erro ao adicionar pensamento!')

        }
    },

    async getThoughtById(id) {
        try {
            const response = await fetch(`${URL_BASE}/pensamentos/${id}`)
            return await response.json()

        } catch {
            alert('Erro ao buscar pensamento!')

        }
    },

    async editThought(thought) {
        try {
            const response = await fetch(`${URL_BASE}/pensamentos/${thought.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(thought)
            })
            return await response.json()

        } catch {
            alert('Erro ao editar pensamento!')

        }
    },

    async deleteThought(id) {
        try {
            await fetch(`${URL_BASE}/pensamentos/${id}`, {
                method: "DELETE",
            })
    
        } catch {
            alert('Erro ao excluir pensamento!')
            
        }
    }
}

export default api;