import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  Image,
} from "react-native";
import { Icon } from "react-native-elements";
import tw from "tailwind-react-native-classnames";
import { useNavigation } from "@react-navigation/native";
import { selectTravelTimeInformation } from "./../slices/navSlice";
import { useSelector } from "react-redux";

const data = [
  {
    id: "1",
    title: "UberX",
    multiplier: 1,
    image: "https://links.papareact.com/3pn",
  },
  {
    id: "2",
    title: "Uber XL",
    multiplier: 1.2,
    image: "https://links.papareact.com/5w8",
  },
  {
    id: "3",
    title: "Uber LUX",
    multiplier: 1.75,
    image: "https://links.papareact.com/7pf",
  },
];

const SURGE_CHARGE_RATE = 1.5;

const RideOptionsCard = () => {
  const navigation = useNavigation();
  const [selected, setSelected] = useState();
  const travelTimeInformation = useSelector(selectTravelTimeInformation);

  return (
    <SafeAreaView style={tw`flex flex-grow`}>
      <View style={tw``}>
        <TouchableOpacity
          onPress={() => navigation.navigate("NavigateCard")}
          style={[tw`rounded-full bg-black p-1`]}
        >
          <Icon name="arrow-back-outline" type="ionicon" color="white" />
        </TouchableOpacity>
        <Text style={tw`text-center text-xl pt-2`}>
          Select a Ride - {travelTimeInformation?.distance.text}
        </Text>
        <View style={tw`flex-row items-center justify-center`}>
          <Text style={tw`text-center text-lg font-semibold`}>Duration: </Text>
          <Text style={tw`text-center `}>
            {travelTimeInformation?.duration.text}
          </Text>
        </View>
      </View>
      <View style={tw`items-center`}>
        <FlatList
          data={data}
          horizontal
          keyExtractor={(item) => item.id}
          renderItem={({ item: { id, title, multiplier, image }, item }) => (
            <TouchableOpacity
              onPress={() => setSelected(item)}
              style={tw`mx-2 p-1 ${id === selected?.id && "bg-gray-200"}`}
            >
              <Image
                style={{
                  width: 100,
                  height: 100,
                  resizeMode: "contain",
                }}
                source={{ uri: image }}
              />
              <View>
                <Text style={tw`text-lg`}>{title}</Text>
              </View>
              <Text style={tw`font-semibold text-lg`}>
                {new Intl.NumberFormat("en-gb", {
                  style: "currency",
                  currency: "USA",
                }).format(
                  (travelTimeInformation?.duration.value *
                    SURGE_CHARGE_RATE *
                    multiplier) /
                    100
                )}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>
      <TouchableOpacity
        disabled={!selected}
        style={tw`bg-black my-auto mx-3 rounded-full ${
          !selected && "bg-gray-300"
        }`}
      >
        <Text style={tw`text-center p-2 m-2 text-white font-semibold `}>
          Choose {selected?.title}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default RideOptionsCard;
