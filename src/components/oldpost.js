import React, { Component } from 'react';
import axios from 'axios';


class PostVideo extends Component {
    
    constructor(props) {
        super(props)
      
        this.state = {
           videoUpload: ''
        };

      };
  
      changeHandler = e => {
          this.setState({[e.target.name]: e.target.value})
      }
  
      submitHandler = e => {
          e.preventDefault()
          console.log(this.state)
          axios.post("https://api.vimeo.com/me/videos", 
            {headers: 
                {"Authorization": "bearer f45d721eef18fb0613438b1344592716",
                 "Content-Type": "application/json",
                 "Accept": "application/vnd.vimeo.*+json;version=3.4"
                }
            },
            {
                "upload": {
                  "approach": "post",
                  "size": "10mb",
                }
            }
           )
            .then(response => {
                console.log(response);
                console.log(response.upload.form);
            })
            .catch(error => {
                console.log(error)
            })
      }
  
      // a method!!
      render() {
          const {videoUpload} = this.state
          return (
              <div>
                  <form onSubmit={this.submitHandler}>
                      <div>
                          <input 
                              type="text" 
                              name="videoUpload" 
                              value={videoUpload}
                              onChange={this.changeHandler} />
                      </div>
                      <button type="submit">submit</button>
                  </form>
              </div>
          )
      }
}

export default PostVideo;
