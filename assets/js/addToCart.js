const addToCart = document.getElementsByClassName('add-to-cart');
const thongBao = document.getElementsByClassName('thong-bao')

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


addToCart[0].addEventListener('click', async() => {
    thongBao[0].style.display = 'block';
    await sleep(2000)
    thongBao[0].style.display = 'none';
})

