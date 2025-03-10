import "reflect-metadata";

import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { buildSchema } from "type-graphql";
import { RecipeResolver } from "./domain/recipe/resolver/recipe.resolver";
import { MyContext } from "./context/context";

const { recipes, authors } = require("./data/array.datas");

async function main() {
  const schema = await buildSchema({
    resolvers: [RecipeResolver],
    validate: true,
  });

  const server = new ApolloServer({ schema });

  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
    context: async (): Promise<MyContext> => ({
      recipesDatas: recipes,
      authorDatas: authors,
    }),
  });

  console.log(`Server rodando na porta ${url}`);
}

main();
