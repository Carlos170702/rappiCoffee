const baseURL = 'https://pokeapi.co/api/v2/'
const App = document.querySelector('.App')
const Tittle = document.createElement('h2')
const divContent = document.createElement('div')

Tittle.classList.add('Tittle')

divContent.classList.add('divContent')

Tittle.innerHTML = 'Pokemons'
App.appendChild(Tittle)


//data de array de pokemons
const pokemons = async () => {
    const pokemon = await fetch(baseURL + 'pokemon?limit=20 &offset=0');
    const { results } = await pokemon.json()
    return results;
}

// data de un solo pokemon
const pokemon = async (name) => {
    const baseURL = 'https://pokeapi.co/api/v2/pokemon/' + name + '/'
    const pokemon = await fetch(baseURL);
    const results = await pokemon.json()
    return results;
}

const dataPoke = async (e, data) => {
    const name = e.target.parentNode.textContent;

    const results = await pokemon(name);

    const messagecontent = document.createElement('div')
    const loading = document.createElement('span')

    messagecontent.classList.add("messagecontent");
    loading.classList.add('loading')

    loading.innerHTML = 'loading...'

    messagecontent.appendChild(loading)
    App.appendChild(messagecontent)

    setTimeout(() => {
        App.removeChild(messagecontent)
        App.removeChild(divContent)
        App.removeChild(Tittle)
    }, 2000);

    return results
}

const AllPokemons = async () => {
    const results = await pokemons();

    for (let i = 0; i < results.length; i++) {
        const { sprites } = await pokemon(results[i].name)
        //crear elementos
        const divContentPoke = document.createElement('div')
        const enlacePoke = document.createElement('h2')
        const divImage = document.createElement('div')
        const imgPoke = document.createElement('img')

        //añadir clases
        divImage.classList.add('divImagePoke')
        divContentPoke.classList.add('divContentPoke')
        enlacePoke.classList.add('enlacePoke')
        divContentPoke.classList.add('divContentPoke')
        imgPoke.classList.add('imgPoke')

        //dar valores necesarios
        enlacePoke.innerHTML = results[i].name
        imgPoke.src = sprites.back_default

        //agregar los elementos al div App
        divImage.appendChild(imgPoke)
        divContentPoke.appendChild(enlacePoke)
        divContentPoke.append(divImage)
        divContent.appendChild(divContentPoke)
        App.appendChild(divContent)

        enlacePoke.addEventListener('click', async (e) => {
            dataPoke(e, {divContent})
        })
    }
}




AllPokemons()
