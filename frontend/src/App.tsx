import { useEffect, useState } from 'react'

function App() {
  const [value, setValue] = useState<string[]>([]);

  const fetchData = async () => {
    const response = await fetch('https://localhost:7059/api/get/stream');
    if (!response.ok) {
      throw new Error(`Failed to load response: ${response.status} ${response.statusText}`);
    }

    if (response.body === null) {
      throw new Error("Response body is null");
    }

    const reader = response.body.getReader();

    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        console.log("Read complete");
        break;
      }
      if (value !== undefined) {

        const str = new TextDecoder("utf-8").decode(value);
        console.log("-----: ", value, "----", str);    
    
        setValue(prev => [...prev, str]);
    
        console.log("Received chunk: ", value); 
      }
    }
  }

  useEffect(() => {

    fetchData();
  }, [])



  return (
    <div className="App">
      <p>Hello from streams example</p>
      <div>{value.map(x => <p>{x}</p>)}</div>
    </div>
  )
}

export default App
