import "reflect-metadata";

import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { buildSchema, ResolverData } from "type-graphql";
import { RecipeResolver } from "./domain/recipe/schema/resolver/recipe.resolver";
import { MyContext } from "./context/context";
import { RecipeService } from "./domain/recipe/service/recipe.service";
import {Container} from "typedi";
import { AuthorResolver } from "./domain/author/schema/resolver/author.resolver";
const { recipes, authors } = require("./data/array.datas");

async function main() {
  const schema = await buildSchema({
    resolvers: [RecipeResolver, AuthorResolver],
    container: ({context}: ResolverData<MyContext>) => context.container,
    validate: true,
});

  const server = new ApolloServer({ schema });

  const {url} = await startStandaloneServer(server, {
    listen: {port: 4000},
    context: async (): Promise<MyContext> => {
      const requestId: string = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER).toString();
      const container = Container.of(requestId);

      const context: MyContext = {
        recipesDatas: recipes,
        authorDatas: authors,
        requestId,
        container
      };
      container.set("context", context);
      return context
    },
  });

  console.log(`Server rodando na porta ${url}`);
}

main();
