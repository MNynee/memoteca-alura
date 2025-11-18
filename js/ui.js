import api from './api.js'

const ui = {
    async renderThoughts() {
        const emptyListMessage = document.getElementById('lista-vazia')
        const thoughtsList = document.getElementById('lista-pensamentos')
        thoughtsList.innerHTML = ''

        try {
            const thoughts = await api.getThoughts()
            thoughts.forEach(ui.listNewThought);
            if (thoughts.length === 0) {
                emptyListMessage.style.display = 'block'
            } else {
                emptyListMessage.style.display = 'none'
            }

        } catch {
            alert('Erro ao renderizar pensamentos!')
        }
    },

    listNewThought(thought) {
        const thoughtsList = document.getElementById('lista-pensamentos')

        const li = document.createElement('li')
        li.classList.add('li-pensamento')
        li.setAttribute('data-id', thought.id)

        const imgQuote = document.createElement('img')
        imgQuote.classList.add('icone-aspas')
        imgQuote.src = 'assets/imagens/aspas-azuis.png'
        imgQuote.alt = 'Aspas azuis'

        const thoughtContent = document.createElement('div')
        thoughtContent.classList.add('pensamento-conteudo')
        thoughtContent.textContent = thought.conteudo

        const thoughtAuthor = document.createElement('div')
        thoughtAuthor.classList.add('pensamento-autoria')
        thoughtAuthor.textContent = thought.autoria

        const buttons = document.createElement('div')
        buttons.classList.add('icones')

        const editButton = document.createElement('button')
        editButton.classList.add('botao-editar')
        editButton.onclick = () => {
            ui.fillForm(thought.id)
            document.getElementById('pensamento-conteudo').focus()
        }

        const editIcon = document.createElement('img')
        editIcon.src = 'assets/imagens/icone-editar.png'
        editIcon.alt = 'Editar'

        const deleteButton = document.createElement('button')
        deleteButton.classList.add('botao-excluir')
        deleteButton.onclick = async () => {
            try {
                await api.deleteThought(thought.id)
                ui.renderThoughts()
            } catch (error) {
                alert('Erro ao excluir pensamento!')
                throw error
            }
        }

        const deleteIcon = document.createElement('img')
        deleteIcon.src = 'assets/imagens/icone-excluir.png'
        deleteIcon.alt = 'Excluir'

        editButton.appendChild(editIcon)
        deleteButton.appendChild(deleteIcon)
        buttons.append(editButton, deleteButton)

        li.append(imgQuote, thoughtContent, thoughtAuthor, buttons)
        thoughtsList.appendChild(li)
    },

    clearForm() {
        document.getElementById("pensamento-form").reset();
    },

    async fillForm(thoughtId) {
        const thought = await api.getThoughtById(thoughtId)
        document.getElementById('pensamento-id').value = thought.id
        document.getElementById('pensamento-conteudo').value = thought.conteudo
        document.getElementById('pensamento-autoria').value = thought.autoria
    }

}

export default ui;