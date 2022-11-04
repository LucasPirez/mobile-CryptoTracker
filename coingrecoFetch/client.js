import { BASE_URL } from "../src/constans/constans";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const lista = () => {
  return fetch(`${BASE_URL}coins/list`)
    .then((data) => data.json())
    .catch((error) => {
      console.log(error);
    });
};

export const pagination = (id, usd) => {
  console.log("pagination");
  return fetch(
    `${BASE_URL}coins/markets?vs_currency=${usd}&order=market_cap_desc&per_page=100&page=${id}&sparkline=true`
  ).then((data) => data.json());
};

export const oneCoin = (id) => {
  console.log("peticion oneCoin");
  const response = fetch(`${BASE_URL}coins/${id}`).then((data) => data.json());

  return response;
};

export const grafic = (id, days = 7) => {
  console.log("grafic");
  return fetch(
    `${BASE_URL}coins/${id}/market_chart?vs_currency=usd&days=${days}`
  );
};

export async function getFavorite() {
  try {
    const history = await AsyncStorage.getItem("favorites");

    if (!history) {
      return [];
    } else {
      return JSON.parse(history);
    }
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function addFavorite(name) {
  // AsyncStorage.removeItem("favorites");

  const history = await getFavorite();

  if (history.length === 0) {
    AsyncStorage.setItem("favorites", JSON.stringify([name]));
  } else {
    if (history.includes(name) === false) {
      history.unshift(name);
      await AsyncStorage.setItem("favorites", JSON.stringify(history));
    }
  }
}

export async function deletefavorite(id) {
  const favorite = await getFavorite();

  const filterFavorite = favorite.filter((u) => u !== id);

  AsyncStorage.setItem("favorites", JSON.stringify(filterFavorite));
}

export async function isFavorite(name) {
  const history = await getFavorite();

  if (history.includes(name) === false) {
    return null;
  } else {
    return true;
  }
}
