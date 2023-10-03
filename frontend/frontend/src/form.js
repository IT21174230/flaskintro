import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import axios from 'axios'

function Input() {
  const [minerals, setMinerals] = useState(Array(20).fill(''));
  const [inputTimeout, setInputTimeout] = useState(null);
  const [predictions, setPredictions]=useState(null)

  const mineralField={0:"aluminium", 1:"ammonia", 2:"arsenic", 3:"barium", 4:"cadmium", 5:"chloramine", 6:"chromium", 7:"copper", 8:"flouride", 9:"bacteria", 10:"viruses", 
      11:"lead", 12:"nitrates", 13:"nitrites", 14:"mercury", 15:"perchlorate", 16:"radium", 17:"selenium", 18:"silver", 19:"uranium"}

  const handleSubmit = async (e) => {
    e.preventDefault();
    axios({method:'POST',
      url:'http://127.0.0.1:5000/predict',
      data:minerals,
      headers: {
        'Content-Type': 'application/json', // Set the content type to JSON
      },
    }).then((response)=>{
      console.log(response.status);
      console.log(response.data);
      setPredictions(response.data.predictions)
    }).catch((error)=>{
      console.error({'error':error});
    })
  };

  const handleInput = (e, index) => {
    e.preventDefault();
    const newMin = e.target.value;

    // Clear any previous timeouts
    clearTimeout(inputTimeout);

    // Set a new timeout to update the minerals state after a delay (adjust as needed)
    const newInputTimeout = setTimeout(() => {
      setMinerals((prevMinerals) => {
        const updatedMinerals = [...prevMinerals];
        updatedMinerals[index] = newMin;
        return updatedMinerals;
      });
    }, 50);

    setInputTimeout(newInputTimeout);
  };

  const showPred=()=>{
      if (predictions) {
        return (
          <div className='predictions'>
            <p>Predictions: {predictions}</p>
          </div>
        );
      }
      return null;
    };
  

  return (
    <><Form onSubmit={handleSubmit}>
      {Object.keys(mineralField).map((index) => (
        <Form.Group key={index} className="mb-3" controlId={index}>
          <Form.Label>{mineralField[index]}</Form.Label>
          <Form.Control
            type="number"
            value={minerals[index] !== null ? minerals[index] : ''}
            onChange={(e) => handleInput(e, index)} />
        </Form.Group>
      ))}

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
    {showPred()}
    </>
  );
}

export { Input };
