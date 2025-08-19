import { useCookies } from "react-cookie"

const Home = () => {
    const [cookies] = useCookies();
    return (
        <h2>
            Welcome {cookies.staffName}!
        </h2>
    )
}

export default Home;