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
        // const url = 'https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/search/NewsSearchAPI?q=live&pageNumber=1&pageSize=9&autoCorrect=true&fromPublishedDate=null&toPublishedDate=null';
        // const options = {
        //     method: 'GET',
        //     headers: {
        //         'X-RapidAPI-Key': '4fa50a5a79msh30dcb9d053fca88p1ef4a4jsn497c21843099',
        //         'X-RapidAPI-Host': 'contextualwebsearch-websearch-v1.p.rapidapi.com'
        //     }
        // };
        let url = 'https://test-news.onrender.com/news';
        this.props.setProgress(10);
        let data = await fetch(url);
        this.props.setProgress(30);
        let parsedData = await data.json();
        this.props.setProgress(60);
        console.log(parsedData);
        this.setState({ articles: parsedData.value, totalResults: parsedData.totalCount });
        this.props.setProgress(100);

    }

    handlePreviousClick = async () => {
        console.log("Prev");
        // let page=1;
        const url = `https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/search/NewsSearchAPI?q=live&pageNumber=${this.state.page - 1}&pageSize=9&autoCorrect=true&fromPublishedDate=null&toPublishedDate=null`;
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '4fa50a5a79msh30dcb9d053fca88p1ef4a4jsn497c21843099',
                'X-RapidAPI-Host': 'contextualwebsearch-websearch-v1.p.rapidapi.com'
            }
        };
        // let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=1244f596e7e941db8750db29782da6b5&page=${this.state.page - 1}&pageSize=9`;
        this.props.setProgress(10);
        let data = await fetch(url, options);
        this.props.setProgress(30);
        let parsedData = await data.json();
        this.props.setProgress(60);
        console.log(parsedData);

        this.setState({
            page: this.state.page - 1,
            articles: parsedData.value,

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
            console.log("Prev");
            // let page=1;
            const url = `https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/search/NewsSearchAPI?q=live&pageNumber=${this.state.page + 1}&pageSize=9&autoCorrect=true&fromPublishedDate=null&toPublishedDate=null`;
            const options = {
                method: 'GET',
                headers: {
                    'X-RapidAPI-Key': '4fa50a5a79msh30dcb9d053fca88p1ef4a4jsn497c21843099',
                    'X-RapidAPI-Host': 'contextualwebsearch-websearch-v1.p.rapidapi.com'
                }
            };
            // let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=1244f596e7e941db8750db29782da6b5&page=${this.state.page + 1}&pageSize=9`;
            let data = await fetch(url, options);
            this.props.setProgress(30);
            let parsedData = await data.json();
            this.props.setProgress(60);
            console.log(parsedData);

            this.setState({
                page: this.state.page + 1,
                articles: parsedData.value,
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
                                imgUrl={e.image.url ? e.image.url : "https://www.middleweb.com/wp-content/uploads/2017/08/breaking-news-blue-600.jpg"}
                                newsUrl={e.url} />
                        </div>
                    })}

                </div>
                <div className="d-flex justify-content-around my-5">
                    <button disabled={this.state.page <= 1} type="button" className="btn btn-primary" onClick={this.handlePreviousClick}>&larr; Previous</button>
                    <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / 9)} type="button" className="btn btn-primary" onClick={this.handleNextClick}>Next &rarr;</button>
                </div>


            </div>
        )
    }
}

export default News
