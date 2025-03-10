import { Author } from "../domain/author/type/author.type";
import { Recipe } from "../domain/recipe/type/recipe.type";

const authors: Author[] = [
  {
    id: 1,
    name: "João Silva",
    email: "joao@example.com",
  },
  {
    id: 2,
    name: "Maria Oliveira",
    email: "maria@example.com",
  },
];

const recipes: Recipe[] = [
    {
      id: 1,
      title: "Bolo de Chocolate",
      description: "Receita de um bolo de chocolate delicioso.",
      creationDate: new Date(),
      ingredients: ["Farinha", "Ovos", "Chocolate", "Açúcar"],
      author: authors[0],
    },
    {
      id: 2,
      title: "Sopa de Legumes",
      description: "Sopa nutritiva com legumes frescos.",
      creationDate: new Date(),
      ingredients: ["Cenoura", "Batata", "Abóbora", "Cebola"],
      author: authors[1], 
    },
  ];

module.exports = {recipes, authors};