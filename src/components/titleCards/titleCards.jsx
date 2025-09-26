import React, { useEffect, useRef ,useState} from 'react'
import './titleCards.css'
import cards_data  from '../../assets/cards/Cards_data'
import {Link} from 'react-router-dom'






const titleCards = ({title,category}) => {
  const [apiData, setApiData] = useState([]);
const cardsRef = useRef()

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1YzI4M2VlNTE3OWFlNTg1Y2VmMGMyYzAzMTJhZjE0ZiIsIm5iZiI6MTc1NDcxNTcxMS40NTYsInN1YiI6IjY4OTZkNjNmMmJjNzlkOWMxMjhkYTA3MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.MnFuKQsYaY4Yfg9T1yB8326h4Drtg7bqFMAsQxlFmec'
  }
}






const handleWheel = (event) =>{
  event.preventDefault()
  cardsRef.current.scrollLeft +=event.deltaY
}

useEffect(() => {
  fetch(`https://api.themoviedb.org/3/movie/${category?category:"now_playing"}?language=en-US&page=1`, options)
  .then(res => res.json())
  .then(res =>{ setApiData(res.results)
    console.log(res)
  })
  .catch(err => console.error(err));
  cardsRef.current.addEventListener('wheel',handleWheel)
}, []);




  return (
    <div  className='title-cards'   >
      
    <h2>{title?title:"Popular On Netflix" }</h2>
    <div className="card-list"  ref={cardsRef}    >

    {apiData.map((card,index)=>{
      return < Link  to={`/player/${card.id}`}  className='card' key= {index}>
          <img src={`https://image.tmdb.org/t/p/w500`+ card.backdrop_path} alt={card.original_title} />
          <p>{card.original_title}</p>

      </Link>
    })}

    </div>

    </div>
  )
}

export default titleCards
