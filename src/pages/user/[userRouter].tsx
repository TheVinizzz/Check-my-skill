import React from "react"
import type { NextPage } from 'next'
import UserPage from "../../containers/UserPage"
import {GithubProfileProvider} from "../../context/hooks/github/profile"

const Home: NextPage = () => (
    <GithubProfileProvider>
        <UserPage />
    </GithubProfileProvider>
)

export default Home