import Button from '@material-ui/core/Button'
import React, { FC } from 'react'

const Home: FC = () => {

	return (
		<div>
            <h1>Olá</h1>
            <Button variant="contained" color="primary" onClick={() => alert("eita carai")}>
                Hello World
            </Button>
		</div>
	)
}

export default Home
