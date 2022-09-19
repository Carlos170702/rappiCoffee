const baseURL = 'https://pokeapi.co/api/v2/'
const App = document.querySelector('.App')
const Tittle = document.createElement('h2')
const divContent = document.createElement('div')

Tittle.innerHTML = 'Pokemons'
App.appendChild(Tittle)

const pokemons = async () => {
    const pokemon = await fetch(baseURL + 'pokemon/');
    const { results } = await pokemon.json()

    for (let i = 0; i < results.length; i++) {
        const divContentPoke = document.createElement('div')
        const enlacePoke = document.createElement('h2')

        enlacePoke.innerHTML = results[i].name
        divContentPoke.appendChild(enlacePoke)
        divContent.appendChild(divContentPoke)
        App.appendChild(divContent)

        //eventos
        enlacePoke.addEventListener('mouseenter', () => {
            enlacePoke.style.animation = 'scale .8s alternate infinite'
        })

        enlacePoke.addEventListener('mouseleave', () => {
            enlacePoke.style.animation = ''
        })

        enlacePoke.addEventListener('click', async (e) => {
            const name = e.target.parentNode.textContent;
            const baseURL = 'https://pokeapi.co/api/v2/pokemon/'
            const pokemon = await fetch(baseURL + name)
            const results = await pokemon.json()

            const message = document.createElement('div')
            const messagecontent = document.createElement('div')
            const loading = document.createElement('span')

            loading.innerHTML = 'loading...'
            messagecontent.classList.add("messagecontent");
            

        
            messagecontent.appendChild(loading)
            App.appendChild(messagecontent)

            setTimeout(() => {
                App.removeChild(messagecontent )
            }, 2000);

            console.log(results);

        })
    }
}

pokemons()


