const creature_button = document.getElementById("add-creature");
const search_bar = document.getElementById("search")
const sort_dropdown = document.getElementById("sort-by")

let animals = JSON.parse(localStorage.getItem("creatures"))

let edited = null;

if(!animals) {
    animals = [
        {
            "name": "Sprite",
            "habitat": "Forest",
            "danger": 1
        },
        {
            "name": "Sand Worm",
            "habitat": "Desert",
            "danger": 8
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
        danger.textContent = "Danger: " + String(animal.danger);

        const UD_box = document.createElement("div");

        const del_button = document.createElement("button");
        del_button.textContent = "Delete";
        const edit_button = document.createElement("button");
        edit_button.textContent = "Edit";

        UD_box.appendChild(del_button);
        UD_box.appendChild(edit_button);
        del_button.addEventListener("click", (a) => deleteCreature(animal));
        edit_button.addEventListener("click", (e) => editCreature(animal));
        an_card.appendChild(name);
        an_card.appendChild(habitat);
        an_card.appendChild(danger);
        an_card.appendChild(UD_box);

        // color code
        if(animal.danger <= 3) {
            an_card.style.backgroundColor = "rgb(83, 235, 83)";
        }else if(animal.danger <= 7) {
            an_card.style.backgroundColor = "rgb(250, 250, 86)";
            an_card.style.color = "#000000"
        }else {
            an_card.style.backgroundColor = "rgb(238, 62, 62)";
        }

        an_list.appendChild(an_card);
    }

    const counter = document.getElementById("creature-counter");
    let article = "s";
    if(animals.length == 1) {
        article = ""
    }
    counter.textContent = `${String(animals.length)} creature${article} added`;
}

function deleteCreature(animal) {
    console.log(`Deleting animal (${animal})...`);
    animals = animals.filter(a => a !== animal);
    refreshCreatureList();
}

function editCreature(animal) {
    const name_field = document.getElementById("cr_name");
    const hab_field = document.getElementById("cr_habitat");
    const danger_field = document.getElementById("cr_danger");

    name_field.value = animal.name;
    hab_field.value = animal.habitat;
    danger_field.value = animal.danger;

    edited = animal;

    creature_button.textContent = "Save Changes"

    refreshCreatureList()
}

function alphabeticalCompare(a, b) {
    // Ensure values are strings and handle null/undefined
    const strA = (a ?? "").toString();
    const strB = (b ?? "").toString();

    // localeCompare handles case and special characters properly
    return strA.localeCompare(strB, undefined, { sensitivity: 'base' });
}

function sortCreatures() {
    const sort = sort_dropdown.value;

    switch (sort) {
        case "danger":
            animals.sort((a, b) => a.danger -b.danger);
            break;
        case "name":
            animals.sort((a, b) => alphabeticalCompare(a.name, b.name));
            break;
        case "habitat":
            animals.sort((a, b) => alphabeticalCompare(a.habitat, b.habitat));
            break;
    };
    refreshCreatureList();
}

function creatureButtonClicked() {
    const name_field = document.getElementById("cr_name");
    const hab_field = document.getElementById("cr_habitat");
    const danger_field = document.getElementById("cr_danger");

    if (edited) {
        edited.name = name_field.value;
        edited.habitat = hab_field.value;
        edited.danger = Number(danger_field.value);

        refreshCreatureList();

        name_field.value = "";
        hab_field.value = "";
        danger_field.value = 0;
        
        edited = null;

        creature_button.textContent = "Add Creature";
        return;
    }
    const animal = {
        "name": name_field.value,
        "habitat": hab_field.value,
        "danger": Number(danger_field.value)
    };

    animals.push(animal);

    refreshCreatureList();

    name_field.value = "";
    hab_field.value = "";
    danger_field.value = 0;
}

creature_button.addEventListener("click", creatureButtonClicked);

refreshCreatureList();

search_bar.addEventListener("input", refreshCreatureList);
sort_dropdown.addEventListener("input", sortCreatures);