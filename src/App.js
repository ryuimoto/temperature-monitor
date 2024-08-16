import { useState,useEffect } from "react";
import axios from 'axios';

function App(){
  const [currentTime,setCurrentTime] = useState('');
  const [temperature,setTemperature] = useState(null);
  const[warning,setWarning] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
      fetchTemperature();
    },1000);

    return () => clearInterval(interval);
  },[]);

  const fetchTemperature = async () =>{
    try{
      const response = await axios.get('https://ryuimoto.github.io/temperature-monitor/');
      setTemperature(response.data.temperature);
      if(response.data.temperature >= 35){
        setWarning('熱中症注意');
      }else{
        setWarning('');
      }
    } catch (error){
      console.error('Error fetching temperature:',error);
      setWarning('データの取得に失敗しました');
    }
  };

  return(
    <div className="App">
      <header className="App-header">
        <h1>現在の時間：{currentTime}</h1>
        <h2>現在の気温：{temperature ?`${temperature}°C`: 'Loading..'}</h2>
      </header>
    </div>
  );
}

export default App;