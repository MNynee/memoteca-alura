import api from './api.js'

const ui = {
    async renderThoughts(filteredThoughts = null) {
        const emptyListMessage = document.getElementById('lista-vazia')
        const thoughtsList = document.getElementById('lista-pensamentos')
        thoughtsList.innerHTML = ''

        try {
            let thoughtsToRender
            if (filteredThoughts) {
                thoughtsToRender = filteredThoughts
            } else {
                thoughtsToRender = await api.getThoughts()
            }
            
            thoughtsToRender.forEach(ui.listNewThought)

            if (thoughtsToRender.length === 0) {
                emptyListMessage.style.display = 'block'
            } else {
                emptyListMessage.style.display = 'none'
            }

        } catch (error) {
            alert('Erro ao renderizar pensamentos!')
            throw error
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
        
        const thoughtDate = document.createElement('div')
        const formattedDate = thought.data.toLocaleDateString('pt-BR', {
            weekday: 'long',
            day: '2-digit',
            month: 'long',
            year: 'numeric',
            timezone: 'UTC'
        })
        const regexDate = formattedDate.replace(/^(\w)/, (match) => match.toUpperCase())
        thoughtDate.classList.add('pensamento-data')
        thoughtDate.textContent = regexDate

        const buttons = document.createElement('div')
        buttons.classList.add('icones')

        const favButton = document.createElement('button')
        favButton.classList.add('botao-favorito')
        favButton.onclick = async () => {
            try {
                await api.updateFavorite(thought.id, !thought.favorito)
                ui.renderThoughts()
            } catch (error) {
                alert('Erro ao favoritar pensamento!')
                throw error
            }
        }

        const favIcon = document.createElement('img')
        favIcon.src = thought.favorito ? 'assets/imagens/icone-favorito.png' : 'assets/imagens/icone-favorito_outline.png'
        favIcon.alt = 'Favoritar'

        const editButton = document.createElement('button')
        editButton.classList.add('botao-editar')
        editButton.onclick = () => {
            ui.fillForm(thought.id)
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

        favButton.appendChild(favIcon)
        editButton.appendChild(editIcon)
        deleteButton.appendChild(deleteIcon)
        buttons.append(favButton, editButton, deleteButton)

        li.append(imgQuote, thoughtContent, thoughtAuthor, thoughtDate, buttons)
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
        document.getElementById('pensamento-data').value = thought.data.toISOString().split('T')[0]
        document.getElementById('form-container').scrollIntoView({ behavior: 'smooth' });
    }

}

export default ui;