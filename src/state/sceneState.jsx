import React, {useReducer} from 'react'

 const initial = {
    isPlaying: true,
    targetObj: null,
    distanceTarget: 0,
    animating: false
}

export const SceneContext = React.createContext(initial)

function SceneContextProvider(props) {

    const [sceneState, updateSceneState] = useReducer((prev, next) => {
        return {...prev, ...next}
    }, { initial })

    return  <SceneContext.Provider value={{ sceneState, updateSceneState }}>
        {props.children}
    </SceneContext.Provider>
}
export default SceneContextProvider

