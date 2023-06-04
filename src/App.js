import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowDown, faArrowUp, faPen, faTrashCan } from '@fortawesome/free-solid-svg-icons'

import './App.css'
import { Toast } from 'bootstrap'

function App() {
	// Recipes (Ideas for dish) states
	const [recipe, setRecipe] = useState([
		{
			id: 1,
			title: 'spagetti',
			ingrediends: 'pasta,meat,sauce',
			description: 'cook Pasta, fry meat and mix all with sauce. Enyoy!',
			opened: false,
		},
		{
			id: 2,
			title: 'Scrumbled Eggs',
			ingrediends: 'Eggs, butter, bread, sausage',
			description: 'fry Eggs and cutted sausage on butter - Eat with bread',
			opened: false,
		},
	])
	//Temp State
	const [newRecipe, setNewRecipe] = useState({
		title: '',
		ingrediends: '',
		description: '',
	})
	const [updateData, setUpdateData] = useState('')

	//Add Recipe
	const addRecipe = () => {
		if (newRecipe.title && newRecipe.ingrediends && newRecipe.description) {
			let num = recipe.length + 1
			let newEntry = {
				id: num,
				title: newRecipe.title,
				ingrediends: newRecipe.ingrediends,
				description: newRecipe.description,
				opened: false,
			}
			setRecipe([...recipe, newEntry])
			setNewRecipe({
				title: '',
				ingrediends: '',
				description: '',
			})
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
		setUpdateData({
			...updateData,
			ingrediends: '',
			description: '',
		})
	}
	//Change Recipe
	const changeRecipe = e => {
		let newEntry = {
			id: updateData.id,
			title: updateData.title,
			opened: updateData.opened,
			ingrediends: updateData.ingrediends,
			description: updateData.description,
		}

		switch (e.target.name) {
			case 'title':
				newEntry.title = e.target.value
				break
			case 'ingrediends':
				newEntry.ingrediends = e.target.value
				break
			case 'description':
				newEntry.description = e.target.value
				break
			default:
				break
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
			<h1>Recipe of your day - React App</h1>
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
								name="title"
								className="form-control form-control-lg"
							/>

							<input
								value={updateData && updateData.ingrediends}
								onChange={e => changeRecipe(e)}
								name="ingrediends"
								className="form-control form-control-lg"
							/>

							<input
								value={updateData && updateData.description}
								onChange={e => changeRecipe(e)}
								name="description"
								className="form-control form-control-lg"
							/>
						</div>
						<div className="col-auto">
							<button onClick={updateRecipe} className="btn btn-lg btn-primary mr-20">
								Update
							</button>
							<button onClick={cancelUpdate} className="btn btn-lg btn-danger">
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
								value={newRecipe.title}
								onChange={e => setNewRecipe({ ...newRecipe, title: e.target.value })}
								className="form-control form-control-lg"
								placeholder="Foodname"
							/>
							<input
								value={newRecipe.ingrediends}
								onChange={e => setNewRecipe({ ...newRecipe, ingrediends: e.target.value })}
								className="form-control form-control-lg"
								placeholder="Ingrediends"
							/>
							<input
								value={newRecipe.description}
								onChange={e => setNewRecipe({ ...newRecipe, description: e.target.value })}
								className="form-control form-control-lg"
								placeholder="Introduction"
							/>
						</div>
						<div className="col-auto">
							<button onClick={addRecipe} className="btn btn-lg btn-primary">
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
											onClick={() =>
												setUpdateData({
													id: item.id,
													title: item.title,
													ingrediends: item.ingrediends,
													description: item.description,
													opened: item.opened,
												})
											}>
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
