// import { createRoot } from 'react-dom/client'

// function NavigationBar() {
// 	// TODO: Actually implement a navigation bar
// 	return <h1>Hello from React!</h1>
// }

// const domNode = document.getElementById('navigation')
// const root = createRoot(domNode)
// root.render(<NavigationBar />)

import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
