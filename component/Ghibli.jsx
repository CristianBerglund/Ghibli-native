import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React, { useEffect, useState } from "react";


const Ghibli = () => {
  const [ghibli, setGhibli] = useState([]);
  const [seenMovies, setSeenMovies] = useState([]);
  const [wantSee, setWantSee] = useState([]);
  const [value, setValue] = useState("");

  const fetchMovies = async () => {
    try {
      const response = await fetch(
        "https://ghibliapi.herokuapp.com/films"
      );
      const res = await response.json();

      setGhibli(res);
      // console.log(res);
      // console.log(ghibli)

    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchMovies();
  });

  return (
    <View>
      <View>
        <Text style={style.header}>Studio Ghibli Movies!</Text>
        <TextInput
          value={value}
          placeholderTextColor={"red"}
          placeholder={"Search for a Studio Ghibli movie "}
          onChangeText={(inputText) => {
            setValue(inputText);
          }}
        />
      </View>

      <View style={style.container}>
        <View style={style.column}>
            <Text style={style.header}>Movies</Text>
            <View style={style.flatlistView}>
              <FlatList
                data={ghibli.filter((item) => {
                  if (!value) {
                    return true;
                  }

                  if (
                    item.title.toUpperCase().includes(value.toUpperCase())
                  ) {
                    return true;
                  }
                })}
                renderItem={({ item }) => (
                  <View>
                    <TouchableOpacity
                    style={style.button}
                      onPress={() => {
                        if (
                          seenMovies.filter(
                            (ghibli) => ghibli.title === item.title
                          ).length === 0
                        ) {
                          setSeenMovies([...seenMovies, item]);
                        }
                      }}
                    >
                      <Text>Seen already</Text>
                    </TouchableOpacity>
                    <Text
                      style={{
                        paddingVertical: 4,
                        fontSize: 16,
                        fontWeight: "bold",
                      }}
                    >
                      {item.title}
                    </Text>
                    <TouchableOpacity
                      style={style.button}
                      onPress={() => {
                        if (
                          wantSee.filter(
                            (ghibli) => ghibli.title === item.title
                          ).length === 0
                        ) {
                          setWantSee([...wantSee, item]);
                        }
                      }}
                    >
                      <Text>Want to see</Text>
                    </TouchableOpacity>
                  </View>
                )}
                keyExtractor={(item) => item.id}
              />
            </View>
          
        </View>
        <View style={style.column}>
          <Text style={style.header}>Seen movies</Text>
          <View style={style.flatlistView}>
            <FlatList
              data={seenMovies}
              renderItem={({ item }) => (
                <Text
                  style={{
                    paddingVertical: 4,
                    fontSize: 16,
                    fontWeight: "bold",
                  }}
                >
                  {item.title}
                </Text>
              )}
              keyExtractor={(item) => item.id}
            />
          </View>
        </View>
        <View style={style.column}>
          <Text style={style.header}>Movies i want to see</Text>
          <View style={style.flatlistView}>
            <FlatList
            scrollEnabled={true}
              data={wantSee}
              renderItem={({ item }) => (
                <Text
                  style={{
                    paddingVertical: 4,
                    fontSize: 16,
                    fontWeight: "bold",
                  }}
                >
                  {item.title}
                </Text>
              )}
            />
          </View>
        </View>
      </View>
    </View>
  )
};

const style = StyleSheet.create({
  header: {
    fontWeight: "bold",
    fontSize: 25,
    paddingBottom: 10,
  },
  container: {
    flexDirection: "column",
    height: "100%",
  },
  column: {
    flex: 0.25,
    alignItems: "center",
  },
  flatlistView: {
    paddingVertical: 5,
    flex: 1,
  },
  button: {
    color: "black"
  },
  border: {
    borderWidth: 1,
  }
});


export default Ghibli;
