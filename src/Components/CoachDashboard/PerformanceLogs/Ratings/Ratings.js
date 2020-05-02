import React, {useState} from 'react'
import {FaStar} from 'react-icons/fa'

export default function Ratings(props) {
    const [rating, setRating] = useState(null);
    const [hover, setHover] = useState(null)

    const starRating = (
                [...Array(5)].map((star, i) => {
                    let ratingValue = i + 1

                    return (
                            <label key={i}>
                                <input 
                                    type='radio' 
                                    value={ratingValue} 
                                    onClick={() => {
                                        setRating(ratingValue)
                                        props.rating(ratingValue, props.type)
                                    }}
                                    className='star-radio' 
                                />
                                <FaStar 
                                    className='rating-star' 
                                    color={ratingValue <= (hover || rating ) ? '#C13540' : "black" }
                                    size={50} 
                                    onMouseEnter={() => setHover(ratingValue)}
                                    onMouseLeave={() => setHover(null)}
                                    id='star-rating'

                                />
                            </label> 
                    )
                })
            )


    return (
        <div>
            {starRating}
        </div>
    )
}
