import React from 'react'
import ReactDOM from 'react-dom/client'
import Scene from './scene.jsx'
import SceneContextProvider from './state/sceneState.jsx'
import SceneController from './components/sceneController.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
	<SceneContextProvider>
		<SceneController />
		<Scene />
	</SceneContextProvider>
  </React.StrictMode>,
)
