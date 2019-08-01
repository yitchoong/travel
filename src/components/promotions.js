import React, {useState} from 'react'
import Carousel from 'react-bootstrap/Carousel'
import Container from 'react-bootstrap/Container'

export default function Promotions({bgColor, messages}) {

    const [index, setIndex] = useState(0);
    const [direction, setDirection] = useState(null);

    const handleSelect = (selectedIndex, e) => {
      setIndex(selectedIndex);
      setDirection(e.direction);
    };
    return (
    <Container fluid style={{padding:0, margin:0, height:'4em'}}>
        <Carousel activeIndex={index} direction={direction} 
            prevIcon={null} nextIcon={null} onSelect={handleSelect}>
            {messages.map( (msg,idx) => {
                return (
                    <Carousel.Item key={idx}>
                        <div style={{backgroundColor:bgColor, textAlign:'center', paddingLeft:'1rem', height:'3rem'}}>
                            {msg}
                        </div>
                    </Carousel.Item>
                )
            })}
        </Carousel>
    </Container>
    );
  }
