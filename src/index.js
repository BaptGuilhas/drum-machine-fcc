import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./styles.css"
 
const playlist = [
  {
    title: '01_Perc_39_185_SP.wav',
    file: '80s_vibe.mp3',
  },
  {
    title: '170_DrumsFull_38_31_SP.wav',
    file: '170_DrumsFull_38_31_SP.wav',
  },
  {
    title: '170_F_BassPump_01_516.wav',
    file: '170_F_BassPump_01_516.wav',
  },
  {
    title: '170_TakesMeBackHat_369_SP.wav',
    file: '170_TakesMeBackHat_369_SP.wav',
  },
  {
    title: '174_BongoLoop_01_161_SP.wav',
    file: '174_BongoLoop_01_161_SP.wav',
  },
  {
    title: '174_Fm_Bass_SP_183_02.wav',
    file: '174_Fm_Bass_SP_183_02.wav',
  },
  {
    title: '50_MarchSnare_SP_196_01.wav',
    file: '50_MarchSnare_SP_196_01.wav',
  },
  {
    title: 'Kick_SP_300_24.wav',
    file: 'Kick_SP_300_24.wav',
  },
  {
    title: 'Vulture_Fx_01_495.wav',
    file: 'Vulture_Fx_01_495.wav',
  }
];
const keysKB = ["Q", "W", "E", "A", "S", "D", "Z", "X", "C"];

function PianoKey(props) {
    var id_name = "id"+props.value;
    return (
        <div 
          id={id_name} 
          className="btn btn-xl drum-pad" 
          onClick={()=> {
            document.getElementById(keysKB[props.value]).play();
            document.getElementById("display").textContent = playlist[props.value].title;
          }}
        >
          <audio 
            id={keysKB[props.value]}
            className='clip'
            src={"audio/" + playlist[props.value].file}
          />
          {keysKB[props.value]}
        </div>
    )
} 

function SliderVolume(props) {
  return (
    <div className="slidecontainer">
      <input type="range" min="0" max="100" 
        onInput={(e)=> {
          keysKB.forEach(x=>document.getElementById(x).volume = e.target.value / 100);
          e.target.style.backgroundSize = e.target.value + '% 100%';
        }}
        className="slider"
      />
    </div>
)
}

class Board extends React.Component {
    renderPianoKey(i) {
        return (
        <PianoKey
            value = {i}
        />
        )
    }
    render() {
      window.onkeydown = (e)=> {
        let testStr = "".concat(...keysKB);
        let testRegex = new RegExp(e.key, "i");
        if (testRegex.test(testStr)) {
          const index = keysKB.indexOf(e.key.toUpperCase());
          document.getElementById(keysKB[index]).play();
          document.getElementById("display").textContent = playlist[index].title
        }
      }
        return (
          <div id="drum-machine">
            <div id="board" className='container-fluid'>
              <div id='panel-left'>
                      {this.renderPianoKey(0)}
                      {this.renderPianoKey(1)}
                      {this.renderPianoKey(2)}
                      {this.renderPianoKey(3)}
                      {this.renderPianoKey(4)}
                      {this.renderPianoKey(5)}
                      {this.renderPianoKey(6)}
                      {this.renderPianoKey(7)}
                      {this.renderPianoKey(8)}
              </div>
              <div id="panel-right">
                <div id='menu'>
                  <div id='display'>
                    nothing (yet)
                  </div>
                  <div id='slider'>
                    <SliderVolume  onInput={(val)=>this.handleInput(val)} />
                  </div>
                  
                </div>
              </div>
              </div>
            </div>
        )
    }
}
class Drum extends React.Component {
  constructor(props) {
    super(props);
  }
    render() {
        return (
          <Board />
        )
    }

}
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Drum />);