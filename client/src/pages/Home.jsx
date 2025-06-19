import React from "react";
import Navbar from "../components/navbar";
import { Header } from "../components/header";
import { Bloglist } from "../components/Bloglist";
import Newletter from "../components/Newletter";
import Footer from "../components/Footer";






function Home(){
    return (
        <>
        <Navbar/>
        <Header />
        <Bloglist />
        <Newletter />
        <Footer />
        
        </>

    )
}

export default Home;