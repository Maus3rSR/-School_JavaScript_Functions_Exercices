const nom_sorcier = "Archibald 🧙‍♂️";
const manuel_de_fabrication = {
  potion_soin: {
    ingredients: ["eau_de_source", "ecaille_de_dragon", "poudre_de_diamant"],
    temps_de_fabrication: 3, // exprimé en secondes
  },
  potion_endurance: {
    ingredients: ["pierre", "serpent"],
    temps_de_fabrication: 10, // exprimé en secondes
  },
  potion_mana: {
    ingredients: ["eau_de_source", "pierre", "serpent"],
    temps_de_fabrication: 5, // exprimé en secondes
  },
};
const inventaire = [
  {
    id: "potion_soin", // identifiant unique de la potion
    prix: 10,
    stock: 0,
  },
];

/**
 * Salutation Aventurier
 */

function salutationsDe(nom_de_celui_qui_salut) {
  console.log(
    `Salutations Aventurier ! Je me nomme ${nom_de_celui_qui_salut} pour vous servir.`
  );
}

salutationsDe(nom_sorcier);

/**
 * Quel est le tarif d'une potion
 */

function tarifDe(id_potion, inventaire, quantite = 1) {
  const potion = inventaire.find((p) => p.id === id_potion);

  // Si une seule instruction dans une condition, on peut écrire `if (condition) instruction;` sans {}
  if (!potion)
    throw new Error(`La potion ${id_potion} n'est pas dans l'inventaire`);

  return potion.prix * quantite;
}

console.log(
  "Tarif de 2 potions de soin : ",
  tarifDe("potion_soin", inventaire, 3)
);

/**
 * Fabrication de potion
 */
function fabricationPotion(id_potion, prix = 10, stock = 1) {
  return {
    id: id_potion,
    prix,
    stock,
  };
}

console.log(
  "Fabrication de potions :",
  fabricationPotion("potion_mana", 25, 3),
  fabricationPotion("potion_sommeil", 10, 3)
);

/**
 * Ajout de nouvelles potions dans l'inventaire
 */
function mettrePotionDansInventaire(inventaire, potion_a_ajouter) {
  const potionExistante = inventaire.find((p) => p.id === potion_a_ajouter.id);

  if (!potionExistante) inventaire.push(potion_a_ajouter);
  else {
    potionExistante.prix = potion_a_ajouter.prix;
    potionExistante.stock += potion_a_ajouter.stock;
  }

  inventaire.sort((a, b) => b.prix - a.prix);
}

// Ajout nouvelle potion
mettrePotionDansInventaire(inventaire, fabricationPotion("potion_mana", 25, 3));

// Ajout nouvelle potion
mettrePotionDansInventaire(
  inventaire,
  fabricationPotion("potion_endurance", 10, 3)
);

// Mise à jour
mettrePotionDansInventaire(
  inventaire,
  fabricationPotion("potion_endurance", 50, 50)
);

console.log("Inventaire apres fabrication de potions", inventaire);

/**
 * Cherche moi les potions qui...
 */
function lesPotionsEnStock(inventaire) {
  return inventaire.filter((p) => p.stock > 0);
}

function lesPotionsEnRupture(inventaire) {
  return inventaire.filter((p) => p.stock <= 0);
}

// Avec l'utilisation de filter, pas de mutation indésirable du tableau original, je garde mon inventaire complet
// Essayez de faire ça en utilisant des méthodes qui mutent le tableau original dans la fonction, vous auriez perdu des données.
console.log("Inventaire complet", inventaire);
console.log("Potions en stock", lesPotionsEnStock(inventaire));
console.log("Potions en rupture", lesPotionsEnRupture(inventaire));

/**
 * Allons faire de la cueillette, nous avons besoin de plus de potions !
 */
// J'ai créé une autre fonction pour que vous puissiez voir l'ancienne et la nouvelle fonction
function fabricationPotion2(id_potion, ingredients, prix = 10, stock = 1) {
  // ? permet un accès optionnel à la clé, si manuel_de_fabrication[potion_a_ajouter.id] est undefined,
  // Cela retournera undefined et n'essayera pas d'accéder à la clé ingrédients sur le type undefined,
  // Ce qui aurait lancé une erreur à l'exécution.
  // Cela m'évite de créer une variable et d'avoir un if pour tester l'existance de la potion dans le manuel de fabrication
  const ingredients_a_avoir = manuel_de_fabrication[id_potion]?.ingredients;

  if (!ingredients_a_avoir)
    return new Error(
      `La potion ${id_potion} n'existe pas dans le manuel de fabrication`
    );

  const a_t_on_tous_les_ingredients = ingredients_a_avoir.every(
    (ingredient_a_verifier) => ingredients.includes(ingredient_a_verifier)
  );

  if (!a_t_on_tous_les_ingredients)
    return new Error(
      `Les ingredients ${ingredients_a_avoir} ne sont pas tous presents dans les ingredients ${ingredients} reçus pour fabriquer la potion ${id_potion}`
    );

  // flemme de refaire la même :)
  return fabricationPotion(id_potion, prix, stock);
}

let potion_endurance = fabricationPotion2("potion_endurance", [
  "pierre",
  "serpent",
]);

if (potion_endurance instanceof Error) console.error(potion_endurance);
else mettrePotionDansInventaire(inventaire, potion_endurance);

let potion_mana = fabricationPotion2("potion_mana", ["pierre", "serpent"]);

if (potion_mana instanceof Error) console.error(potion_mana);
else mettrePotionDansInventaire(inventaire, potion_mana);

console.log("Inventaire complet", inventaire);

/**
 * Une potion n'est jamais fabriquée en retard, ni en avance d'ailleurs. Elle est fabriquée précisément à l'heure prévue !
 */
// Encore une fois dans ma proposition de correction je réécri pas la fonction
// dans le but de garder tout pour que vous ayez l'évolution directement dans le même commit
function fabricationPotion3(
  id_potion,
  ingredients,
  callback_quand_potion_prete,
  prix = 10,
  stock = 1
) {
  const temps_de_fabrication =
    manuel_de_fabrication[id_potion]?.temps_de_fabrication;

  if (!temps_de_fabrication)
    return new Error(
      `La potion ${id_potion} n'existe pas dans le manuel de fabrication`
    );

  const potion = fabricationPotion2(id_potion, ingredients, prix, stock);

  if (potion instanceof Error) return potion;

  // Simulation d'un temps de fabrication (on fait ici une tâche asynchrone)
  setTimeout(
    () => callback_quand_potion_prete(potion),
    temps_de_fabrication * 1000
  );
}

fabricationPotion3(
  "potion_soin",
  ["eau_de_source", "ecaille_de_dragon", "poudre_de_diamant"],
  (potion) => {
    console.log(`Fabrication de la Potion finie :`, potion);
    mettrePotionDansInventaire(inventaire, potion);
    console.log("Inventaire complet", inventaire);
  },
  10,
  3
);

/**
 * Epreuve ultime, la fabrication de plusieurs inventaires indépendants
 */
function creationInventaire() {
  const inventaire = [];

  return {
    ajoutPotion(potion) {
      // flemme de reprendre le code :)
      mettrePotionDansInventaire(inventaire, potion);
    },
    lesPotionsEnStock() {
      // flemme de reprendre le code :)
      return lesPotionsEnStock(inventaire);
    },
    lesPotionsEnRuptureDeStock() {
      // flemme de reprendre le code :)
      return lesPotionsEnRupture(inventaire);
    },
  };
}

const inventaireBoutiquePotionsA = creationInventaire();
const inventaireBoutiquePotionsB = creationInventaire();

inventaireBoutiquePotionsA.ajoutPotion({
  id: "potion_soin",
  prix: 10,
  stock: 3,
});

inventaireBoutiquePotionsA.ajoutPotion({
  id: "potion_endurance",
  prix: 10,
  stock: 0,
});

inventaireBoutiquePotionsB.ajoutPotion({
  id: "potion_endurance",
  prix: 10,
  stock: 3,
});

// On remarque dans la console que la data de chaque inventaire est bien distincte les uns des autres
// Grâce aux closures

console.log(
  "Inventaire boutique A",
  inventaireBoutiquePotionsA.lesPotionsEnStock(),
  inventaireBoutiquePotionsA.lesPotionsEnRuptureDeStock()
);

console.log(
  "Inventaire boutique B",
  inventaireBoutiquePotionsB.lesPotionsEnStock(),
  inventaireBoutiquePotionsB.lesPotionsEnRuptureDeStock()
);

/**
 * Bonus, un sorcier a toujours la classe !
 */

// La version avec l'utilisation de la syntaxe des classes
// Ce ne sont pas des classes techniquement parlant comme pour les classes de POO dans Java, PhP etc.
// Mais un sucre syntaxique qui repose sur le système de prototype objet de JS pour faire un semblant d'orienté objet
// Cette syntaxe permet à des développeurs habitués au paradigme de la programmation orienté objet d'être un peu plus à l'aise :)
//
// Ce que nous avons fait avec la fonction plus haut fait exactement la même chose !
class Inventaire {
  inventaire = [];

  ajoutPotion(potion) {
    // flemme de reprendre le code :)
    mettrePotionDansInventaire(this.inventaire, potion);
  }

  lesPotionsEnStock() {
    // flemme de reprendre le code :)
    return lesPotionsEnStock(this.inventaire);
  }

  lesPotionsEnRuptureDeStock() {
    // flemme de reprendre le code :)
    return lesPotionsEnRupture(this.inventaire);
  }
}

const inventaireBoutiqueC = new Inventaire();

inventaireBoutiqueC.ajoutPotion({
  id: "potion_endurance",
  prix: 10,
  stock: 3,
});

console.log(
  "Inventaire boutique C",
  inventaireBoutiqueC.lesPotionsEnStock(),
  inventaireBoutiqueC.lesPotionsEnRuptureDeStock()
);
