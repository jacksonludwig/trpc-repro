import { View, Text, ActivityIndicator } from "react-native";
import { trpc } from "./App"

const Example = () => {
  const q1 = trpc.testRoute.useQuery();
  const q2 = trpc.testRoute.useQuery();

  if (q1.isLoading)
    return (
      <View>
        <ActivityIndicator size='large' />
      </View>
    )

  return (
    <View>
      <Text>{q1.data.stringValue}</Text>
      <Text>{q2.data.value}</Text>
    </View>
  )
}

export default Example;
