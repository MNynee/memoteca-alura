import ui from './ui.js';
import api from './api.js';

const thoughtsSet = new Set()

async function addKeytoThought() {
    const thoughts = await api.getThoughts()

    try {
        thoughts.forEach(thought => {
            const thoughtKey = `${thought.conteudo.trim().toLowerCase()}-${thought.autoria.trim().toLowerCase()}`
            thoughtsSet.add(thoughtKey)
        })
    } catch (error) {
        alert('Erro ao adicionar chave ao pensamento!')
        throw error
    }
}

const regexContent = /^[A-Za-z\sçãàáâèéêíìîóôõúùûÂÃÁÀÉÊÍÓÔÕÚÇ\"\'!?%:;.,-]{10,}$/
const regexAuthor = /^[A-Za-z\sçãàáâèéêíìîóôõúùûÂÃÁÀÉÊÍÓÔÕÚÇ-]{3,25}$/

function validateContent(content) {
    return regexContent.test(content)
}

function validateAuthor(author) {
    return regexAuthor.test(author)
}

function removeSpaces(string) {
    return string.replaceAll(/\s+/g, '')
}

document.addEventListener('DOMContentLoaded', () => {
    ui.renderThoughts()
    addKeytoThought()

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
    const data = document.getElementById('pensamento-data').value

    const conteudoNoSpaces = removeSpaces(conteudo)
    const autoriaNoSpaces = removeSpaces(autoria)

    if(!validateContent(conteudoNoSpaces)) {
        alert('Conteúdo inválido! Utilize apenas letras e espaços e, no mínimo, 10 caracteres.')
        return
    }

    if(!validateAuthor(autoriaNoSpaces)) {
        alert('Autoria inválida! Utilize apenas letras e de 3 a 15 caracteres.')
        return
    }

    if(!validateDate(data)) {
        alert('Data inválida! Por favor, selecione uma data igual ou anterior à data atual.')
        ui.clearForm()
        return
    }

    const newThoughtKey = `${conteudo.trim().toLowerCase()}-${autoria.trim().toLowerCase()}`

    if (thoughtsSet.has(newThoughtKey)) {
        alert('Pensamento já cadastrado!')
        return
    }

    try {
        if (id) {
            await api.editThought({ id, conteudo, autoria, data })
        } else {
            await api.addNewThought({ conteudo, autoria, data })
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

function validateDate(date) {
    const currentDate = new Date()
    const selectedDate = new Date(date)
    return selectedDate <= currentDate
}