import React from 'react';
import { useEffect, useState } from 'react';
import GifPlayer from './../components/GifPlayer';
import fetchAPI from './../configuration/fetchAPI';
import DebounceInput from './../components/DebounceInput';

export default function GifyStore() {
    const [imagesList, setImagesList] = useState([]);
    const [currentType, setCurrentType] = useState('trending');
    const [apiStatus, setApiStatus] = useState('Loading...');
    const [offset, setOffset] = useState({ number: 0, max_count: 0 });

    const getApiData = (apiName, queryParam = '') => {
        setApiStatus('Loading...');
        fetchAPI(apiName, 'GET', queryParam)
            .then(res => res.json())
            .then((res) => {
                if (res.data) {
                    if (res.data.length === 0) {
                        setApiStatus('No Matches Found!');
                    } else {
                        if (currentType === 'trending') {
                            setOffset({ number: offset.number + 50, max_count: res.pagination.total_count });
                            const newList = [...imagesList, ...res.data];
                            setImagesList(newList);
                        } else {
                            setImagesList(res.data);
                        }
                        setApiStatus('');
                    }
                } else {
                    setImagesList([])
                    console.log(res);
                }
            }, (e) => setImagesList([]));
    }
    useEffect(() => {
        getApiData('trending');
    }, [])

    const handleChange = (e) => {
        getApiData('search', `q=${e}&lang=en`);
    }

    const changeType = (e) => {
        setCurrentType(e.target.value);
        if (e.target.value === 'trending') {
            getApiData('trending');
        } else {
            setApiStatus('');
        }
    }

    const handleInfiniteScroll = (e) => {
        console.log((e.target.scrollHeight - e.target.scrollTop) - e.target.clientHeight)
        if (currentType === 'trending') {
            const reachedBtm = (e.target.scrollHeight - e.target.scrollTop) - e.target.clientHeight <= 1;
            if (reachedBtm && (offset.max_count > offset.number) && apiStatus !== 'Loading...') {
                getApiData('trending', `offset=${offset.number}`);
            }
        }
    }
    return (
        <div className="container-fluid gifs-container">
            <div className="row">
                <div className='col-md-3'>
                    <select className='form-control' onChange={changeType} value={currentType}>
                        <option value='trending'>Trending</option>
                        <option value='search'>Search</option>
                    </select>
                </div>
                <div className='col-md-6'>
                    {currentType === 'trending' ? '' : <DebounceInput timer="1000" placeHolder='Enter Search Text' onInputChange={handleChange}></DebounceInput>}
                </div>
                <h4 className='status-msg'>{apiStatus}</h4>
                <div className='col-md-12'>
                    <div className='row gifs-layout' id="infinite-scroll" onScroll={handleInfiniteScroll}>
                        {imagesList.map((ele, index) => {
                            return <div className='col-sm-4' key={ele.id + index}>
                                <div className='img-container'>
                                    <GifPlayer name={'trending_' + index} preview={ele.images['480w_still'].url} image={ele.images.downsized.url} pause={false}></GifPlayer>
                                </div>
                            </div>
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}
