import type { GetServerSideProps, NextPage } from 'next'
import HomePage from "../containers/Home"
import {GithubProfileProvider} from "../context/hooks/github/profile"

const Home: NextPage = () => (
    <GithubProfileProvider>
        <HomePage />
    </GithubProfileProvider>
)

export default Home
