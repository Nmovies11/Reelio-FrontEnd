import Navigation from "./../Components/Navigation";

const About = () => {
    return (
        <>
            <Navigation />
            <div style={{ padding: '20px', textAlign: 'center' }}>
                <h1>About Us</h1>
                <p>Reelio is about giving the users the best possible experience when it comes to finding movies!.</p>
                <p>All movie data is provided by TMDB and we do not own any of the content.</p>
                <p>No money is made with this website</p>
            </div>
        </>
    );
};

export default About;