import React, { Component } from 'react'
import NewsItem from './NewsItem'

export class News extends Component {

    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            loading: false,
            page: 1
        };
    }

    async componentDidMount() {
        let url = 'https://newsapi.org/v2/top-headlines?country=in&apiKey=1244f596e7e941db8750db29782da6b5&page=1&pageSize=9';
        this.props.setProgress(10);
        let data = await fetch(url);
        this.props.setProgress(30);
        let parsedData = await data.json();
        this.props.setProgress(60);
        console.log(parsedData);
        this.setState({ articles: parsedData.articles, totalResults: parsedData.totalResults});
        this.props.setProgress(100);
        
    }

    handlePreviousClick = async () => {
        console.log("Prev");
        // let page=1;
        let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=1244f596e7e941db8750db29782da6b5&page=${this.state.page - 1}&pageSize=9`;
        this.props.setProgress(10);
        let data = await fetch(url);
        this.props.setProgress(30);
        let parsedData = await data.json();
        this.props.setProgress(60);
        console.log(parsedData);

        this.setState({
            page: this.state.page - 1,
            articles: parsedData.articles,
           
        })
        this.props.setProgress(100);
    }

    handleNextClick = async () => {

        if (this.state.page + 1 > Math.ceil(this.state.totalResults / 9)) {

        }
        else {
            console.log("Next");
            this.props.setProgress(10);
            // let page=1;
            let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=1244f596e7e941db8750db29782da6b5&page=${this.state.page + 1}&pageSize=9`;
            let data = await fetch(url);
            this.props.setProgress(30);
            let parsedData = await data.json();
            this.props.setProgress(60);
            console.log(parsedData);

            this.setState({
                page: this.state.page + 1,
                articles: parsedData.articles,
            })
            this.props.setProgress(100);
        }
    }

    render() {

        return (
            <div className="container my-3">
                <h1 className="text-center">NewsMonkey - Top Headlines</h1>


                <div className='row'>

                    {this.state.articles.map((e) => {
                        return <div className='col-md-4' key={e.url} >
                            <NewsItem title={e.title ? e.title : ""}
                                description={e.description ? e.description.substring(0, 90) : ""}
                                imgUrl={e.urlToImage ? e.urlToImage : "https://www.middleweb.com/wp-content/uploads/2017/08/breaking-news-blue-600.jpg"}
                                newsUrl={e.url} />
                        </div>
                    })}

                </div>
                <div className="d-flex justify-content-around my-5">
                    <button disabled={this.state.page <=1} type="button" className="btn btn-primary" onClick={this.handlePreviousClick}>&larr; Previous</button>
                    <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / 9)} type="button" className="btn btn-primary" onClick={this.handleNextClick}>Next &rarr;</button>
                </div>


            </div>
        )
    }
}

export default News
