import { Heading, VStack } from "@chakra-ui/react";
import { useQuery, gql } from "@apollo/client";

const British = gql`
  query {
    britishes {
      data {
        attributes {
          Role_Name
          British_Roles {
            role_name
            Primary
            Primary_Sights
            Primary_Firing_Modes
            Primary_Magazine_Amount
            Primary_Magazine_Round_Amount
            Secondary
            Secondary_Firing_Modes
            Secondary_Sights
            Secondary_Magazine_Amount
            Secondary_Magazine_Round_Amount
            Secondary_Knife
          }
          British_Role_Extras {
            __typename
            ... on ComponentLoadoutsThirdSlot {
              Third_Slot_Item
              Item_Amount
            }
            __typename
            ... on ComponentLoadoutsForthSlot {
              Forth_Slot_Item
              Item_Amount
            }
            __typename
            ... on ComponentLoadoutsFifthSlot {
              Fith_Slot_Item
              Item_Amount
            }
            __typename
            ... on ComponentLoadoutsSixthSlot {
              Sixth_Slot_Item
              Item_Amount
            }
          }
        }
      }
    }
  }
`;

export default function Testing() {
  const { loading, error, data } = useQuery(British);

  if (loading) return <p>Loading...</p>;
  if (error) return console.log("Api request error", error), (<p>Error :(</p>);

  return (
    <VStack>
      <Heading>Testing with axios & GraphQL</Heading>
      {data.britishes.data.map((british) => (
        <>
          <p>{british.attributes.Role_Name}</p>
          <p>{british.attributes.British_Roles_Extras.Third_Slot_Item}</p>
        </>
      ))}
    </VStack>
  );
}
