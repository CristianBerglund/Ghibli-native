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
  const [search, setSearch] = useState("");

  const fetchMovies = async () => {
    try {
      const response = await fetch(
        "https://ghibliapi.herokuapp.com/films"
      );
      const res = await response.json();

      setGhibli(res);

    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchMovies();
  });

  return (
    <View>
      <View style={style.topColumn}>
        <Text style={style.header}>Studio Ghibli Movies!</Text>
        <TextInput
          style={style.inputstyle}
          value={search}
          placeholder={"Search for a Studio Ghibli movie "}
          underlineColorAndroid="transparent"
          onChangeText={(input) => {
            setSearch(input);
          }}
        />
      </View>

      <View style={style.container}>
        <View style={style.column}>
          <Text style={style.header}>Movies</Text>
          <View style={style.flatlistView}>
            <FlatList
              data={ghibli.filter((item) => {
                return item.title.toUpperCase().includes(search.toUpperCase())
              })}
              renderItem={({ item }) => (
                <View style={style.column}>
                  <TouchableOpacity
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
                    <Text style={style.button}>Seen already</Text>
                  </TouchableOpacity>
                  <Text
                    style={style.listTextStyle}>
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
                  style={style.listTextStyle}>
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
              data={wantSee}
              renderItem={({ item }) => (
                <Text
                  style={style.listTextStyle}
                >
                  {item.title}
                </Text>
              )}
              keyExtractor={(item) => item.id}
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
    color: "black",
  },
  border: {
    borderWidth: 1,
  },
  topColumn: {
    alignItems: "center",
  },
  listTextStyle: {
    paddingVertical: 4,
    fontSize: 16,
    fontWeight: "bold",
  },
  inputstyle: {
    height: 40,
    borderWidth: 1,
    backgroundColor: "white"
  }
});


export default Ghibli;
