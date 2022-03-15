import logo from './logo.svg';
import './App.css';
import {useState} from "react";

function App() {
  const game_win = (game_array) =>{
    if(game_array[0] === 1 && game_array[1] === 1 && game_array[2] === 1) {
      return 1;
    }
    if(game_array[3] === 1 && game_array[4] === 1 && game_array[5] === 1) {
      return 1;
    }
    if(game_array[6] === 1 && game_array[7] === 1 && game_array[8] === 1) {
      return 1;
    }
    if(game_array[0] === 1 && game_array[3] === 1 && game_array[6] === 1) {
      return 1;
    }
    if(game_array[1] === 1 && game_array[4] === 1 && game_array[7] === 1) {
      return 1;
    }
    if(game_array[2] === 1 && game_array[5] === 1 && game_array[8] === 1) {
      return 1;
    }
    if(game_array[0] === 1 && game_array[4] === 1 && game_array[8] === 1) {
      return 1;
    }
    if(game_array[2] === 1 && game_array[4] === 1 && game_array[6] === 1) {
      return 1;
    }


    if(game_array[0] === 2 && game_array[1] === 2 && game_array[2] === 2) {
      return 2;
    }
    if(game_array[3] === 2 && game_array[4] === 2 && game_array[5] === 2) {
      return 2;
    }
    if(game_array[6] === 2 && game_array[7] === 2 && game_array[8] === 2) {
      return 2;
    }
    if(game_array[0] === 2 && game_array[3] === 2 && game_array[6] === 2) {
      return 2;
    }
    if(game_array[1] === 2 && game_array[4] === 2 && game_array[7] === 2) {
      return 2;
    }
    if(game_array[2] === 2 && game_array[5] === 2 && game_array[8] === 2) {
      return 2;
    }
    if(game_array[0] === 2 && game_array[4] === 2 && game_array[8] === 2) {
      return 2;
    }
    if(game_array[2] === 2 && game_array[4] === 2 && game_array[6] === 2) {
      return 2;
    }
    let found = 3;
    for(let i = 0; i < 9; i++) {
      if(game_array[i] === 0) {
        found = 0;
      }
    }
    return found;
  };
  const easy_choice = (game_array) => {
    let count = 0;
    for(let i = 0; i < 9; i++) {
      if(game_array[i] === 0) count++;
    }
    let c = Math.floor(Math.random() * count);
    count = 0;
    for(let i = 0; i < 9; i++) {
      if(count === c && game_array[i] === 0) {
        game_array[i] = 2;
        return i;
      }
      if(game_array[i] === 0) count++;
    }
    game_array[8] = 2;
    return 8;
  };
  
  const computer_choice = (game_array) => {
    if(gameLevel === 0) {
      let index = easy_choice(game_array);
      return index;
    }

    let count = 0;
    let poss = [];
    for(let i = 0; i < 9; i++) {
      if(game_array[i] === 0){
        count++;
        poss.push(i);
      } 
    }
    let urgent = 0;
    let index = -1;
    let good = 0;
    if(gameLevel === 3) {
    for(let i = 0; i < count; i++) {
      let t_p = [...game_array];
      t_p[poss[i]] = 2;
      if(game_win(t_p) === 2) {
        good = 1;
        index = poss[i];
      }
    }
    if(good === 1) {
      //console.log("good=" + index);
      return index;
    }
    for(let i = 0; i < count; i++) {
      let t_p = [...game_array];
      t_p[poss[i]] = 1;
      if(game_win(t_p) === 1) {
        urgent = 1;
        index = poss[i];
      }
    }
    if(urgent === 1) {
      //console.log("IndexII="+index);
      return index;
    }
    }
    
    let dgood = 0;
    if(gameLevel === 3) {
    for(let i = 0; i < count; i++) {
      let t_p = [...game_array];
      t_p[poss[i]] = 2;
      let t_count = 0;
      for(let j = 0; j < count; j++){
        if(j == i) continue;
        let tt_p = [...game_array];
        tt_p[poss[i]] = 2;
        tt_p[poss[j]] = 2;
        if(game_win(tt_p) === 2) {
          dgood = 1;
          t_count++;
        }
      }
      if(t_count >= 2) {
        index = poss[i];
        //console.log("dwin="+index);
        return index;
      }      
    }

    let durgent = 0;
    for(let i = 0; i < count; i++) {
      let t_p = [...game_array];
      t_p[poss[i]] = 1;
      let t_count = 0;
      for(let j = 0; j < count; j++){
        if(j == i) continue;
        let tt_p = [...game_array];
        tt_p[poss[i]] = 1;
        tt_p[poss[j]] = 1;
        if(game_win(tt_p) === 1) {
          durgent = 1;
          t_count++;
          //console.log("tcount="+i+j);
        }
      }
      if(t_count >= 2) {
        index = poss[i];
        //console.log("dlose="+index);
        return index;
      }      
    }
    }

    let poss_r = [];
    for(let i = 0; i < poss.length; i++) {
      let pp = cal_result(poss[i],game_array, 10,count);
      poss_r.push(pp);
    }
    let max = -20000;
    let maxint = 0;
    let max_arr = [0];
    for(let i = 0; i < poss.length; i++) {
      if(max < poss_r[i]) {
        max = poss_r[i];
        index = poss[i];
        maxint = 0;
        max_arr[0] = poss[i];
      } else if(max === poss_r[i]) {
        maxint++;
        max_arr.push(poss[i]);
      }
    }
    if(gameLevel === 3){
    if(maxint > 1) {
      let j = Math.floor(Math.random()*maxint);
      index = max_arr[j];
    }
    }
    //console.log("p=" + poss_r);
    //console.log("i="+poss);
    //console.log("index="+index);
    return index;
  }; 

  const cal_result = (p,game_array, level,count1) => {
    let p_r = [...game_array];
    let score = 0;
    if(level == 10) {      
      p_r[p] = 2;
      let win = game_win(p_r);
      if(win === 2) { return 10*count1;}
      else if(win === 3) {return 0;}
      let count = 0;
      let poss_a = [];
      for(let i = 0; i < 9; i++) {
        if(p_r[i] === 0) {
          count++;
          poss_a.push(i);
        }
      }
      for(let i = 0; i < poss_a.length; i++) {
        score += cal_result(poss_a[i],p_r,-10,count);
      }
    } else if(level == -10) {      
      p_r[p] = 1;
      let win = game_win(p_r);
      if(win === 1) { return -10*count1;}
      else if(win === 3) {return 0;}
      let count = 0;
      let poss_a = [];
      for(let i = 0; i < 9; i++) {
        if(p_r[i] === 0) {
          count++;
          poss_a.push(i);
        }
      }
      for(let i = 0; i < poss_a.length; i++) {
        score += cal_result(poss_a[i],p_r,10,count);
      }
    }    
    return score;
  };

  const [gameArray, updateGameArray] = useState([0,0,0,0,0,0,0,0,0]);
  const [bfontStyle, setBfontStyle] = useState([{fontSize: '24px', fontWeight: 'bold',color: 'rgb(255,255,255)'},{fontSize: '24px', fontWeight: 'bold',color: 'rgb(255,255,255)'},
  {fontSize: '24px', fontWeight: 'bold',color: 'rgb(255,255,255)'}, {fontSize: '24px', fontWeight: 'bold',color: 'rgb(255,255,255)'}, {fontSize: '24px', fontWeight: 'bold',color: 'rgb(255,255,255)'}, {fontSize: '24px', fontWeight: 'bold',color: 'rgb(255,255,255)'}, {fontSize: '24px', fontWeight: 'bold',color: 'rgb(255,255,255)'}, {fontSize: '24px', fontWeight: 'bold',color: 'rgb(255,255,255)'}, {fontSize: '24px', fontWeight: 'bold',color: 'rgb(255,255,255)'}]);
  const [buttonsText, setButtonsText] = useState(["","","","","","","","",""]);
  const [gameResult, setGameResult] = useState("");
  const [gameStatus, setGameStatus] = useState(0);
  const [gameLevel, setGameLevel] = useState(3);
  function handleClick(e) {
    let newArr = [...gameArray];
    let i = parseInt(e.target.value);
    let sArr = [...bfontStyle];
    let bArr = [...buttonsText];
    
    const computerStyle = {
      fontSize: '24px', 
      fontWeight: 'bold',
      color: 'rgb(240,235,211)'
    };
    const userStyle = {
      fontSize: '24px', 
      fontWeight: 'bold',
      color: 'rgb(85,85,85)'
    };
    if(newArr[i] === 0 && gameStatus === 0) {
      bArr[i] = "X";
      newArr[i] = 1;
      sArr[i] = userStyle;
      let win = game_win(newArr);
      if(win === 1) {
        setGameResult("You win!");
        setGameStatus(1);
      } else if(win === 3) {
        setGameResult("It is a tie!");
        setGameStatus(1);
      } else {
        let j = computer_choice(newArr);
        newArr[j] = 2;
        bArr[j] = "O";
        sArr[j] = computerStyle;
        win = game_win(newArr);
        if(win === 2) {
          setGameResult("Computer win!");
          setGameStatus(1);
        } else if(win === 3) {
          setGameResult("It is a tie!");
          setGameStatus(1);
        }
      }
      
      setButtonsText(bArr);
      updateGameArray(newArr);
      setBfontStyle(sArr);
    }
    
  }

  function handleRestart(e) {
    let newArr = [...gameArray];
    let bArr = [...buttonsText];
    for(let i = 0; i < 9; i++) {
      newArr[i] = 0;
      bArr[i] = '';
    }
    setButtonsText(bArr);
    updateGameArray(newArr);
    setGameStatus(0);
    setGameResult("");
  }
  function handleLevel(e) {
    let v = parseInt(e.target.value);
    let newArr = [...gameArray];
    let bArr = [...buttonsText];
    for(let i = 0; i < 9; i++) {
      newArr[i] = 0;
      bArr[i] = '';
    }
    setButtonsText(bArr);
    updateGameArray(newArr);
    setGameStatus(0);
    setGameResult("");
    setGameLevel(v);
  }

  return (
    <div className="App">
      <h1 id="title">Tic-tac-toe </h1>
      <h2 id="result">{gameResult}</h2>
      <section id="game">
        <button id="button0" onClick={handleClick} value="0" style={bfontStyle[0]}>{buttonsText[0]}</button>
        <button id="button1" onClick={handleClick} value="1" style={bfontStyle[1]}>{buttonsText[1]}</button>
        <button id="button2" onClick={handleClick} value="2" style={bfontStyle[2]}>{buttonsText[2]}</button>
        <button id="button3" onClick={handleClick} value="3" style={bfontStyle[3]}>{buttonsText[3]}</button>
        <button id="button4" onClick={handleClick} value="4" style={bfontStyle[4]}>{buttonsText[4]}</button>
        <button id="button5" onClick={handleClick} value="5" style={bfontStyle[5]}>{buttonsText[5]}</button>
        <button id="button6" onClick={handleClick} value="6" style={bfontStyle[6]}>{buttonsText[6]}</button>
        <button id="button7" onClick={handleClick} value="7" style={bfontStyle[7]}>{buttonsText[7]}</button>
        <button id="button8" onClick={handleClick} value="8" style={bfontStyle[8]}>{buttonsText[8]}</button>      
      </section>
      <section id="game_control">
        <button id="game_restart" onClick={handleRestart}>Restart</button>
        <select id="game_level" value={gameLevel} onChange={handleLevel}> 
          <option value="0" >Easy</option>
          <option value="1" >Middle</option>
          <option value="3" >Difficult</option>       
        </select>
        <div></div>
      </section>
    </div>
  );
}

export default App;
