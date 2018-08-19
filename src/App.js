import React, { Component } from "react";
import "./App.css";
import MovieRow from './MovieRow.js'
import $ from 'jquery';

class App extends Component {
  constructor(props) {
    super(props);
    this.state= {}

    // const movies = [
    //   { id: 0, poster_src:"https://image.tmdb.org/t/p/w600_and_h900_bestv2/AkJQpZp9WoNdj7pLYSj1L0RcMMN.jpg", title: "Doraemon", overview: "Film dari barat" },
    //   { id: 1, poster_src:"https://image.tmdb.org/t/p/w600_and_h900_bestv2/AkJQpZp9WoNdj7pLYSj1L0RcMMN.jpg", title: "Power Ranger", overview: "Film dari Jepang" }
    // ];
    //
    //
    // this.state = { rows: [
    //     <p key="1">This is row</p>,
    //     <p key="2">This is row</p>,
    //     <p key="3">This is row</p>
    //   ]
    // };
    //
    // const movieRows= []
    // movies.forEach((movie)=>{
    //   console.log(movie.id)
    //   const movieRow = <MovieRow  movie={movie} />
    //   movieRows.push(movieRow)
    // })
    //
    // this.state= {rows:movieRows}

    this.preformSearch('MARVEL')
  }
  preformSearch(searchTerm){
    console.log("Mencari Filem menggunakan Api Db")
    const urlString = "https://api.themoviedb.org/3/search/movie?api_key=2a9651f79952a2ea11215db9e038f4d2&language=en-US&query=" + searchTerm
    $.ajax({
      url: urlString,
      success: (searchResult)=>{
        console.log("Berhasil Mengambil Data")
        // console.log(searchResult);
        const results =searchResult.results
        // console.log(results[0]);

        const movieRows= []
        results.forEach((movie)=>{
          movie.poster_src = 'https://image.tmdb.org/t/p/w185/' + movie.poster_path
          // console.log(movie.title);
          const movieRow = <MovieRow key={movie.id} movie={movie} />
            movieRows.push(movieRow)
        })

        this.setState({rows: movieRows})
      },
      error: (xhr, status, err)=>{
        console.error("Gagal Mengambil Data")
      }
    })
  }

  searchChangeHandler(event){
      console.log(event.target.value);
      const boundObject= this
      const searchTerm = event.target.value
      boundObject.preformSearch(searchTerm)

  }
  render() {
    return (
      <div className="App">
        <table className="titleBar">
          <tbody>
            <tr>
              <td>
                <img
                  alt="Genflix Movie"
                  width="100"
                  src="http://genflix.co.id/assets/images/genflix-logo.png"
                />
              </td>
              <td>
                <h3>Movie Db Seacrh</h3>
              </td>
            </tr>
          </tbody>
        </table>
        <input
          onChange={this.searchChangeHandler.bind(this)}
          className="inpufmovie"
          placeholder="Masukan Judul Filem yang ada mau"
        />

        {this.state.rows}
      </div>
    );
  }
}

export default App;
