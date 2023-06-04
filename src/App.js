import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowDown, faArrowUp, faPen, faTrashCan } from '@fortawesome/free-solid-svg-icons'

import './App.css'
import { Toast } from 'bootstrap'

function App() {
	// Recipes (Ideas for dish) states
	const [recipe, setRecipe] = useState([
		{ id: 1, title: 'Food 1', ingrediends: 'one, alpha', description: 'sample description 1', opened: false },
		{ id: 2, title: 'Food 2', ingrediends: 'one, beta', description: 'sample description 2', opened: false },
	])
	//Temp State
	const [newRecipe, setNewRecipe] = useState('')
	const [updateData, setUpdateData] = useState('')

	//Add Recipe
	const addRecipe = () => {
		if (newRecipe) {
			let num = recipe.length + 1
			let newEntry = {
				id: num,
				title: newRecipe,
				ingrediends: newRecipe.ingrediends,
				description: newRecipe.description,
				opened: false,
			}
			setRecipe([...recipe, newEntry])
			setNewRecipe('')
		}
	}

	//Delete Recipe
	const deleteRecipe = id => {
		let newRecipes = recipe.filter(item => item.id !== id)
		setRecipe(newRecipes)
	}
	//Mark/extend Recipe
	const markRecipe = id => {
		let newRecipe = recipe.map(item => {
			if (item.id === id) {
				return { ...item, opened: !item.opened }
			}
			return item
		})
		setRecipe(newRecipe)
	}
	//cancelUpdate
	const cancelUpdate = () => {
		setUpdateData('')
	}
	//Change Recipe
	const changeRecipe = e => {
		let newEntry = {
			id: updateData.id,
			title: e.target.value,
			opened: updateData.opened,
		}
		setUpdateData(newEntry)
	}
	//Update Recipe
	const updateRecipe = () => {
		let filteredRecords = [...recipe].filter(item => item.id !== updateData.id)
		let updatedObject = [...filteredRecords, updateData]
		setRecipe(updatedObject)
		setUpdateData('')
	}

	return (
		<div className="container App">
			<br />
			<br />
			<h2>Recipe of your day - React App</h2>
			<br />
			<br />
			{/* {Update Recipe} */}
			{updateData && updateData ? (
				<>
					<div className="row">
						<div className="col">
							<input
								value={updateData && updateData.title}
								onChange={e => changeRecipe(e)}
								className="form-control form-control-lg"
							/>
						</div>
						<div className="col-auto">
							<button onClick={updateRecipe} className="btn btn-lg btn-success mr-20">
								Update
							</button>
							<button onClick={cancelUpdate} className="btn btn-lg btn-warning">
								Cancel
							</button>
						</div>
					</div>
					<br />
				</>
			) : (
				<>
					<div className="row">
						<div className="col">
							<input
								value={newRecipe}
								onChange={e => setNewRecipe(e.target.value)}
								className="form-control form-control-lg"
							/>
						</div>
						<div className="col-auto">
							<button onClick={addRecipe} className="btn btn-lg btn-success">
								Add Recipe
							</button>
						</div>
					</div>
					<br />
				</>
			)}

			{/* {Display recipes} */}
			{recipe && recipe.length ? '' : 'No Recipes on your list...'}
			{recipe &&
				recipe
					.sort((a, b) => (a.id > b.id ? 1 : -1))
					.map((item, index) => {
						return (
							<React.Fragment key={item.id}>
								<div className="col itemBg">
									<div>
										<span className="itemNumber">{index + 1}</span>
										<span className="itemText">{item.title}</span>
									</div>
									<div className="iconsWrap">
										{item.opened ? (
											<span title="Extended / not extended" onClick={() => markRecipe(item.id)}>
												<FontAwesomeIcon icon={faArrowUp} />
											</span>
										) : (
											<span title="Extended / not extended" onClick={() => markRecipe(item.id)}>
												<FontAwesomeIcon icon={faArrowDown} />
											</span>
										)}

										<span
											title="Edit"
											onClick={() => setUpdateData({ id: item.id, title: item.title, opened: item.opened })}>
											<FontAwesomeIcon icon={faPen} />
										</span>

										<span title="Delete" onClick={() => deleteRecipe(item.id)}>
											<FontAwesomeIcon icon={faTrashCan} />
										</span>
									</div>
									<div className={item.opened ? 'extended description' : 'description'}>
										<p>{item.ingrediends}</p>
										<div>
											<p>{item.description}</p>
										</div>
									</div>
								</div>
							</React.Fragment>
						)
					})}
		</div>
	)
}

export default App
