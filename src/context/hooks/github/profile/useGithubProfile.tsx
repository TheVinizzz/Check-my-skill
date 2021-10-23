import { useContext } from 'react'

import { GithubProfileContext } from './index'
import { UseGithubProfileReturn } from './interfaces'

export default (): UseGithubProfileReturn =>
	useContext(GithubProfileContext)
