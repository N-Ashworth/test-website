const creature_button = document.getElementById("add-creature");

let animals = [];

function refreshCreatureList() {
    const an_list = document.getElementById("creature-list");
    an_list.replaceChildren()

    for(const animal of animals) {
        const an_card = document.createElement("div");
        an_card.className = "card";

        const name = document.createElement("h2");
        name.textContent = animal.name;

        const habitat = document.createElement("h4");
        habitat.textContent = "Habitat: " + animal.habitat;

        const danger = document.createElement("h4");
        danger.textContent = "Danger: " + animal.danger;

        const del_button = document.createElement("button");
        del_button.textContent = "Delete";

        del_button.addEventListener("click", (a) => deleteCreature(animal))
        an_card.appendChild(name);
        an_card.appendChild(habitat);
        an_card.appendChild(danger);
        an_card.appendChild(del_button);

        // color code
        if(+animal.danger <= 3) {
            an_card.style.backgroundColor = "rgb(83, 235, 83)";
        }else if(+animal.danger <= 7) {
            an_card.style.backgroundColor = "rgb(250, 250, 86)";
            an_card.style.color = "#000000"
        }else {
            an_card.style.backgroundColor = "rgb(238, 62, 62)";
        }

        an_list.appendChild(an_card);
    }
}

function deleteCreature(animal) {
    console.log(`Deleting animal (${animal})...`)
    animals = animals.filter(a => a !== animal)
    refreshCreatureList()
}

function creatureButtonClicked() {
    const name_field = document.getElementById("cr_name");
    const hab_field = document.getElementById("cr_habitat");
    const danger_field = document.getElementById("cr_danger");

    const animal = {
        "name": name_field.value,
        "habitat": hab_field.value,
        "danger": danger_field.value
    };

    animals.push(animal);

    refreshCreatureList();
}

creature_button.addEventListener("click", creatureButtonClicked);