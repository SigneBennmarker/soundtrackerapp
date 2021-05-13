const apiKey = "9d1d6a6efdcd6adbf672133bfea8f1f1";

export const getMovieById = async (id) => {
  console.log("id", id);

  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=9d1d6a6efdcd6adbf672133bfea8f1f1&language=en-US`
    );
    console.log("response", response);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("fångade ett error när ngt skulle hämtas i getMovieByID");
    console.log(error);
  }
};

export const getMovieBySearch = async (value) => {
  console.log("Search term", value);

  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=9d1d6a6efdcd6adbf672133bfea8f1f1&language=en-US&page=1&include_adult=false&query=${value}`
    );

    console.log("response", response);
    //
    //     console.log("filmnamn!!!!!", movieName);
    const data = await response.json();
    console.log(" data ????? ______ : ", data);

    const movieName = data.results[0].title;
    console.log(" movieName????? ______ : ", movieName);
    return data;
  } catch (error) {
    console.log("fångade ett error när ngt skulle hämtas i getMovieBySearch");
    console.log(error);
  }
};
