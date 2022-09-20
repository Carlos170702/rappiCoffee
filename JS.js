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
    const name = e.target.name;
    const results = await pokemon(name);

    //crear elementos de loading
    const messagecontent = document.createElement('div')
    const loading = document.createElement('span')

    //darle clases a los elementos
    messagecontent.classList.add("messagecontent");
    loading.classList.add('loading')

    //valores a los elementos
    loading.innerHTML = 'loading...'

    //agregar los elementos
    messagecontent.appendChild(loading)
    App.appendChild(messagecontent)

    setTimeout(() => {
        App.removeChild(messagecontent)
        App.removeChild(divContent)
        App.removeChild(Tittle)
        aboutPoke(results)
    }, 2000);

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
        const buttonPoke = document.createElement('button')

        //añadir clases
        divImage.classList.add('divImagePoke')
        divContentPoke.classList.add('divContentPoke')
        enlacePoke.classList.add('enlacePoke')
        divContentPoke.classList.add('divContentPoke')
        imgPoke.classList.add('imgPoke')
        buttonPoke.classList.add('buttonPoke')

        //dar valores necesarios
        enlacePoke.innerHTML = results[i].name
        imgPoke.src = sprites.back_default
        buttonPoke.innerHTML = 'About Pokemon'
        buttonPoke.name = results[i].name

        //agregar los elementos al div App
        divImage.appendChild(imgPoke)
        divContentPoke.appendChild(enlacePoke)
        divContentPoke.append(divImage)
        divContentPoke.append(buttonPoke)
        divContent.appendChild(divContentPoke)
        App.appendChild(divContent)

        buttonPoke.addEventListener('click', async (e) => {
            dataPoke(e, { divContent })
        })
    }
}

const aboutPoke = (results) => {
    console.log(results);
    const { name, sprites, abilities } = results;

    //creacion de los elementos 
    const about = document.createElement('div')
    const aboutName = document.createElement('h1')
    const aboutcontent = document.createElement('div')
    const aboutImgContent = document.createElement('div')
    const aboutImg = document.createElement('img')
    const aboutAbilities = document.createElement('ul')

    for (let i = 0; i < abilities.length; i++) {
        const {ability} = abilities[i]

        const aboutAbilitie = document.createElement('li')
        aboutAbilitie.classList.add('aboutAbilitie')

        aboutAbilitie.innerHTML = ability.name

        aboutAbilities.appendChild(aboutAbilitie)
    }


    //clases alos elementos 
    about.classList.add('about')
    aboutName.classList.add('aboutName')
    aboutcontent.classList.add('aboutcontent')
    aboutImgContent.classList.add('aboutImgContent')
    aboutImg.classList.add('aboutImg')

    //valores alos elementos
    aboutName.innerHTML = name
    aboutImg.src = sprites.back_default

    //agregar elementos a App
    aboutImgContent.appendChild(aboutImg)
    aboutcontent.appendChild(aboutImgContent)
    aboutcontent.appendChild(aboutAbilities)
    about.appendChild(aboutName)
    about.appendChild(aboutcontent)
    App.appendChild(about)
}


AllPokemons()
