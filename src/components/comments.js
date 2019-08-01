import React, {useState} from 'react';
import {navigate} from 'gatsby'
// import PropTypes from 'prop-types';


const Comments = () => {
   
   const [comment, setComment] = useState('')
   const [comments, setComments] = useState([])

   const onChange = (e) => {
       setComment(e.target.value)
   }

   const onSubmit = (e) => {
       e.preventDefault()
       setComments([...comments, comment])
       setComment('')    
   }
   const toPage = (pageno) => {
       const page = pageno === 2 ? "/page-2/" : "/"
       navigate(page)
   }

   return (
    <div>
        <form onSubmit={onSubmit}>
            <label>Comment
                <textarea onChange={onChange} name="comment" 
                value={comment} style={{display:'block'}} />
            </label>
            <button type="submit">Add Comment </button>
        </form>
        <ul>
            {comments.map( (cmnt,i) => (
                <li key={i}> 
                   <p> {cmnt} </p>
                </li>
            ))}
        </ul>
        <button onClick={() => toPage(2)}>Next Page</button>
    </div>            
)};
// Comments.propTypes = {
//     id : PropTypes.string
// }
export default Comments