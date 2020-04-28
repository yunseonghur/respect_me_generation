import React from 'react'
import PostForm from '../components/PostForm'

function Videos(){
    return (
        <div>
            <h1>Viewing Videos</h1>
            <PostForm />
        </div>
    );
}

export default Videos;

// class PostForm extends Component {

//     // a constructor!!
//     constructor(props) {
//       super(props)
    
//       this.state = {
//          userId: '',
//          title: '',
//          body: ''
//       };
//     };

//     changeHandler = e => {
//         this.setState({[e.target.name]: e.target.value})
//     }

//     submitHandler = e => {
//         e.preventDefault()
//         console.log(this.state)
//         axios.post('https://jsonplaceholder.typicode.com/posts', this.state)
//             .then(response => {
//                 console.log(response)
//             })
//             .catch(error => {
//                 console.log(error)
//             })
//     }

//     // a method!!
//     render() {
//         const {userId, title, body } = this.state
//         return (
//             <div>
//                 <form onSubmit={this.submitHandler}>
//                     <div>
//                         <input 
//                             type="text" 
//                             name="userId" 
//                             value={userId}
//                             onChange={this.changeHandler} />
//                     </div>
//                     <div>
//                         <input 
//                             type="text" 
//                             name="title" 
//                             value={title}
//                             onChange={this.changeHandler} />
//                     </div>
//                     <div>
//                         <input 
//                             type="text" 
//                             name="body" 
//                             value={body}
//                             onChange={this.changeHandler} />
//                     </div>
//                     <button type="submit">submit</button>
//                 </form>
//             </div>
//         )
//     }
// }

// class Videos extends React.Component{}
// vimeo access token: f45d721eef18fb0613438b1344592716