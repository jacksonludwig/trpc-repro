import { useEffect } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { trpc } from "./App"

const Example = () => {
  const q1 = trpc.testRoute.useQuery();
  const q2 = trpc.testRoute2.useQuery();

  useEffect(() => {
    (async () => {
      while (true) {
        q1.refetch();
        q2.refetch();
        await new Promise((res) => setTimeout(res, 5000));
        console.log('fetching again');
      }
    })();
  }, []);

  if (q1.isLoading || q2.isLoading)
    return (
      <View>
        <ActivityIndicator size='large' />
      </View>
    )

  return (
    <View>
      <Text>test</Text>
    </View>
  )
}

export default Example;
