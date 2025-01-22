# Exercices sur les bases de JavaScript

- Tu peux mettre toutes tes réponses dans le fichier `exercices.js`.
- A chaque exercice _(chaque sous-titre après le titre Exercices dans cet énoncé)_, tu dois faire un commit avec le titre de l'exercice.
- Tu n'es pas obligé de garder le code fait précédemment, mais ⚠️ **attention** certaines choses sont utiles pour plus tard.

## Thème 🔮🧙‍♂️🧪🪙🍄

- Tu es le sorcier Archibald 🧙‍♂️ et tu gères une petite boutique dans laquelle tu créé et vend des potions 🧪.
- Tu as des outils magiques 🪄 nommés la `console` et le `prompt` te permettant d'intérargir avec les aventuriers qui viennent à ta boutique.
- La monnaie est le `🪙`. Tu peux stocker ça dans une constante si tu veux :)

Dès que tu verras `<ce_genre_de_chose>` c'est qu'il faudra remplacer `<ce_genre_de_chose>` par la bonne variable approprié au contexte.\
Tu comprendras en lisant la suite :)

Commencez avec ces constantes

```js
const nom_sorcier = "Archibald 🧙‍♂️";
const inventaire = [];
```

La structure d'une potion sera la suivante:

```js
{
    nom: "Potion de soin",
    prix: 10,
    stock: 100,
}
```

## Exercices

### Salutation Aventurier

- Créé une fonction `salutations` qui prend en paramètre ton nom de sorcier
- Cette fonction affiche dans la console `Salutations Aventurier ! Je me nomme <nom_sorcier> pour vous servir.`
- ⚠️ Passez bien votre nom de sorcier en paramètre, n'utilisez pas la constante de manière globale

### Quel est le tarif d'une potion ?

- Créé une fonction prenant en paramètre la quantité d'une potion, et son prix
- La fonction doit retourner le prix total
- Affiche dans la `console` un exemple de prix pour 3 potions coutant 10 🪙 en executant cette fonction

### Fabrication de potion

- Créé une fonction avec en paramètres
  - nom de la potion
  - prix (pas obligatoire, par défaut à 10)
  - stock (pas obligatoire, par défaut à 10)
- La fonction doit te retourner un nouvel objet de la même structure que la potion existante dans l'inventaire
- Affiche dans la console la création de nouvelles potions, parfois change les paramètres de prix et de stock pour avoir des valeurs différentes

### Ajout de nouvelles potions dans l'inventaire

- Créé une autre fonction pour ajouter une potion à l'inventaire
  - premier paramètre est l'inventaire des potions
  - deuxième paramètre peut être SOIT un tableau de potions, soit directement une potion
- Ajoute de nouvelles potions dans l'inventaire
