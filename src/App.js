import React, { Component } from 'react';
import './bootstrap.min.css';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      news: [],
    }
    this.getNews = this.getNews.bind(this);
    this.getNews();
  }
  getNews = async (e) =>{
    let jsonD = [];
    await fetch('https://newsapi.org/v2/top-headlines?country=in&apiKey={api key}')
    .then(function(response){
      return response.json();
     })
    .then(function(json){
      jsonD = json.articles
      if (typeof(Storage) !== "undefined") {
        localStorage.setItem("news",JSON.stringify(jsonD));
      }
    }).catch(err =>{
      if (typeof(Storage) !== "undefined") {
        let x = localStorage.getItem("news");
        jsonD = JSON.parse(x);
        console.log(jsonD);
      }
    });
    this.setState({
      news:jsonD
    })
  }
 creatRows = (e, i) =>{
    return (
      <div key={i}>
          <h4>{e.title}</h4>
          <hr/>
          <img alt={e.urlToImage} className="img-fluid" src={e.urlToImage} />
          <br/>
          <div>{e.description} <a target="_blank" rel="noopener noreferrer" href={e.url}>read more</a></div>
          <p className="text-danger">publishedAt: {this.convertDate(e.publishedAt)}</p>
          <br/><br/>
        </div>
    )
  }
  convertDate = (e) =>{
    let date = new Date(e);
    let d = date.getDate();
    let mon = date.getMonth();
    let y = date.getFullYear();
    let h = date.getHours();
    let m = date.getMinutes();
    m = m+"";
    if(m.length===1){
      m = "0"+m;
    }
    let s = "";
    if (h>12){
      s = "PM";
      h = h-12;
    }else{
      s = "AM";
    }
    return d+"/"+mon+"/"+y+" "+h+":"+m+" "+s
  }
  render() {
    return (
      <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="navbar-brand">Indian News</div>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor02" aria-controls="navbarColor02" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
      </nav>
      <div className="container" style={{"marginTop":"20px"}}>
        {this.state.news.map((e, i) => {
          return (
            this.creatRows(e, i)
          )
        })}
      </div>
      </div>
    );
  }
}

export default App;
