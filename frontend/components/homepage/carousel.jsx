import React, {useEffect} from 'react';
import {AiFillCaretLeft, AiFillCaretRight} from 'react-icons/ai';


class Carousel extends React.Component {
    constructor(props) {
    super(props);
    this.state = {
        pictureNumber: 0,
        intervalId: 0
    }
}

    componentDidMount(){
        this.intervalId = setInterval(()=>{
            if (this.state.pictureNumber==2){
                this.setState({pictureNumber: 0})
            } else{
                this.setState({pictureNumber: this.state.pictureNumber+1})
            }
        }, 4000)

        
    
  }

  componentWillUnmount(){
      clearInterval(this.intervalId);
  }
    render(){

    var carouselImages = ['/coffee-banner.jpg', '/tea-banner.jpg', 'bbt-banner.jpg']
    return (
        
        <div className="carousel-container">
            <div className="carousel">
                {carouselImages.map((ele, i) => {
                    let pos = 'nextSlide';
                    if (this.state.pictureNumber === i) {
                        pos = 'activeSlide';
                    }
                    if ((this.state.pictureNumber === i - 1) || 
                        (i === 0 && this.state.pictureNumber === carouselImages.length - 1)) {
                            pos = 'lastSlide';
                        }
                        return(
                            <article className={pos} key={i}>
                                <img src={ele}  className='carouselImg' />
                            </article>
                        );
                })}

                <p className='prev' onClick={() => {
                    if (this.state.pictureNumber===0){
                        this.setState({pictureNumber: 2})
                } else{
                    this.setState({pictureNumber: this.state.pictureNumber - 1})}
                 }} >
                    <AiFillCaretLeft />               
                </p>

                <p className='next' onClick={() => {
                    if (this.state.pictureNumber===2){
                        this.setState({pictureNumber: 0})
                } else{
                    this.setState({pictureNumber: this.state.pictureNumber + 1})}
                 }}
                  >
                    <AiFillCaretRight />
                </p>
            </div>
        </div>
    )}   
}

export default Carousel;