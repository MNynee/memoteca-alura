import ui from './ui.js';
import api from './api.js';

document.addEventListener('DOMContentLoaded', () => {
    ui.renderThoughts();

    const thoughtForm = document.getElementById('pensamento-form')
    const cancelBtn = document.getElementById('botao-cancelar')
    thoughtForm.addEventListener('submit', submitThought)
    cancelBtn.addEventListener('click', ui.clearForm)
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
