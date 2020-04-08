import "./styles.css"
import "./animation_mixer"

import store from "./store"

const character_glb = require('./assets/character.glb')


window.onload = () => {
    // Initialize character
    const characterEl = document.createElement('a-gltf-model');

    characterEl.setAttribute('src', character_glb);
    characterEl.setAttribute('position', "0 0 0");
    characterEl.setAttribute('id', "character");
    characterEl.setAttribute("character", true)
    characterEl.setAttribute("animation-mixer", true)

    document.getElementById("a-scene").appendChild(characterEl)

    document.getElementsByTagName('a-sky')[0].setAttribute("color", "" + '#' + Math.random().toString(16).substr(2, 6))

    // Setup the UI buttons
    document.querySelector("#next-hair").addEventListener("click", (e) => {
        store.dispatch({
            type: 'NEXT_HAIR'
        })
    })

    document.querySelector("#prev-hair").addEventListener("click", (e) => {
        store.dispatch({
            type: 'PREVIOUS_HAIR'
        })
    })

    document.querySelector("#next-skin").addEventListener("click", (e) => {
        store.dispatch({
            type: 'NEXT_SKIN'
        })
    })

    document.querySelector("#prev-skin").addEventListener("click", (e) => {
        store.dispatch({
            type: 'PREVIOUS_SKIN'
        })
    })

    document.querySelector("#next-horn").addEventListener("click", (e) => {
        store.dispatch({
            type: 'NEXT_HORN'
        })
    })

    document.querySelector("#prev-horn").addEventListener("click", (e) => {
        store.dispatch({
            type: 'PREVIOUS_HORN'
        })
    })

    document.querySelector("#toggle-armor").addEventListener("click", (e) => {
        const character = getCharacter();

        const wood_armor = character.object3D.children[0].children[0].children.find(x => x.name == 'wood_armor')
        wood_armor.visible = !wood_armor.visible
    })

}

AFRAME.registerComponent('character', {
    schema: {
        type: 'string'
    },
    init: function () {
        this.el.addEventListener('model-loaded', (event) => {
            this.el.object3D.children[0].children[0].children.find(x => x.name == 'hair_1').visible = false
            this.el.object3D.children[0].children[0].children.find(x => x.name == 'hair_2').visible = false
            this.el.object3D.children[0].children[0].children.find(x => x.name == 'hair_3').visible = false
            this.el.object3D.children[0].children[0].children.find(x => x.name == 'hair_4').visible = false
            this.el.object3D.children[0].children[0].children.find(x => x.name == 'hair_5').visible = false

            this.el.object3D.children[0].children[0].children.find(x => x.name == 'horn_1').visible = false
            this.el.object3D.children[0].children[0].children.find(x => x.name == 'horn_2').visible = false
            this.el.object3D.children[0].children[0].children.find(x => x.name == 'horn_3').visible = false

            this.el.object3D.children[0].children[0].children.find(x => x.name == 'skin_2').visible = false
            this.el.object3D.children[0].children[0].children.find(x => x.name == 'skin_1').visible = false
        });
    }

})

const toggle_hair = () => {
    const {
        hair_id
    } = store.getState()

    const character = getCharacter();

    character.object3D.children[0].children[0].children.find(x => x.name == 'hair_1').visible = false
    character.object3D.children[0].children[0].children.find(x => x.name == 'hair_2').visible = false
    character.object3D.children[0].children[0].children.find(x => x.name == 'hair_3').visible = false
    character.object3D.children[0].children[0].children.find(x => x.name == 'hair_4').visible = false
    character.object3D.children[0].children[0].children.find(x => x.name == 'hair_5').visible = false
    hair_id != 0 && (character.object3D.children[0].children[0].children.find(x => x.name == `hair_${hair_id}`).visible = true)
}

store.subscribe(toggle_hair)

const toggle_skin = () => {
    const {
        skin_id
    } = store.getState()

    const character = getCharacter();

    character.object3D.children[0].children[0].children.find(x => x.name == 'skin_1').visible = false
    character.object3D.children[0].children[0].children.find(x => x.name == 'skin_2').visible = false
    character.object3D.children[0].children[0].children.find(x => x.name == 'skin_0').visible = false
    character.object3D.children[0].children[0].children.find(x => x.name == `skin_${skin_id}`).visible = true
}

store.subscribe(toggle_skin)

const toggle_horn = () => {
    const {
        horn_id
    } = store.getState()

    const character = getCharacter();

    character.object3D.children[0].children[0].children.find(x => x.name == 'horn_1').visible = false
    character.object3D.children[0].children[0].children.find(x => x.name == 'horn_2').visible = false
    character.object3D.children[0].children[0].children.find(x => x.name == 'horn_3').visible = false
    horn_id != 0 && (character.object3D.children[0].children[0].children.find(x => x.name == `horn_${horn_id}`).visible = true)
}

store.subscribe(toggle_horn)

const getCharacter = () => {
    const sceneEl = document.querySelector('a-scene')
    return sceneEl.querySelector('#character');
}