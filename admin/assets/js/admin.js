var editForm = document.getElementById('edit-form')
editForm.style.display='none'
const editBook = document.getElementById('edit-book');
editBook.addEventListener('click', ()=>{
    editForm.style.position="absolute"
    editForm.style.display='block'
})