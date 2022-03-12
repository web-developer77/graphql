import { ApolloServer, gql } from "apollo-server";

const typeDefs = gql`
  type Person {
    id: ID!
    name: String!
  }

  type Book {
    title: String
    author: Person
  }

  type Query {
    books: [Book]
  }
`;

const resolvers = {
  Query: {
    books: () => [
      {
        title: "Made of Wolves",
        authorId: "1",
      },
      {
        title: "The Visitor in the City",
        authorId: "2",
      },
    ],
  },
  Book: {
    author: (parent: any) => {
      return {
        id: parent.authorId,
        name: parent.authorId == "1" ? "James Carter" : "Arthur Novotic",
      };
    },
  },
};

async function main() {
  const server = new ApolloServer({ typeDefs, resolvers });
  await server.listen(4000);
  console.log("Server started on http://localhost:4000");
}

main();