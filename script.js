const creature_button = document.getElementById("add-creature");
const search_bar = document.getElementById("search")

let animals = JSON.parse(localStorage.getItem("creatures"))

if(!animals) {
    animals = [
        {
            "name": "Sprite",
            "habitat": "Forest",
            "danger": "1"
        },
        {
            "name": "Sand Worm",
            "habitat": "Desert",
            "danger": "8"
        }
    ];
}

function refreshCreatureList() {
    const search = search_bar.value;

    const an_list = document.getElementById("creature-list");
    an_list.replaceChildren()
    localStorage.setItem("creatures", JSON.stringify(animals))
    for(const animal of animals) {
        //only show ones that follow the search
        if(search !== "" && !animal.name.toLowerCase().includes(search.toLowerCase())) {
            continue;
        }

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

    counter = document.getElementById("creature-counter")
    article = "s"
    if(animals.length == 1) {
        article = ""
    }
    counter.textContent = `${String(animals.length)} creature${article} added`
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

refreshCreatureList()

search_bar.addEventListener("input", refreshCreatureList)