import {useContext} from 'react'
import {SceneContext} from '../state/sceneState'

function SceneController() {
    const { sceneState, updateSceneState } = useContext(SceneContext)
    const { isPlaying } = sceneState

    const togglePlay = () => {
        updateSceneState({isPlaying: !isPlaying})
    }

   return  <div style={{position: 'absolute', zIndex: 10, bottom: '4rem', left: '46%'}}>
         <i class={`fa fa-solid fa-${isPlaying ? 'stop' : 'play' }`} style={{fontSize: '3rem'}} onClick={togglePlay}/>
    </div>
}
export default SceneController