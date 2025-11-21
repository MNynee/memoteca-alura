import ui from './ui.js';
import api from './api.js';

document.addEventListener('DOMContentLoaded', () => {
    ui.renderThoughts();

    const thoughtForm = document.getElementById('pensamento-form')
    const cancelBtn = document.getElementById('botao-cancelar')
    const searchInput = document.getElementById('campo-busca')
    thoughtForm.addEventListener('submit', submitThought)
    cancelBtn.addEventListener('click', ui.clearForm)
    searchInput.addEventListener('input', handleSearch)
});

async function submitThought(event) {
    event.preventDefault()

    const id = document.getElementById('pensamento-id').value
    const conteudo = document.getElementById('pensamento-conteudo').value
    const autoria = document.getElementById('pensamento-autoria').value

    try {
        if (id) {
            await api.editThought({ id, conteudo, autoria })
        } else {
            await api.addNewThought({ conteudo, autoria })
        }
        ui.renderThoughts()
        ui.clearForm()

    } catch {
        alert('Erro ao enviar pensamento!')
    }
}

async function handleSearch() {
    const searchTerm = document.getElementById('campo-busca').value
    
    try {
        const filteredThoughts = await api.getThoughtsByTerm(searchTerm)
        ui.renderThoughts(filteredThoughts)
    } catch (error) {
        alert('Erro ao buscar pensamentos!')
        throw error
    }
}