import React, { useState } from 'react';
import NavHeader from './../components/NavHeader';
import GifyStore from './GifyStore';

export default function Home() {
    const [lightMode, setLightMode] = useState(true);
    const changeTheme = () => {
        toggleMode(!lightMode);
        setLightMode(!lightMode);

    }
    const toggleMode = (mode) => {
        if (mode) {
            document.body.classList.remove('dark-mode');
        } else {
            document.body.classList.add('dark-mode');
        }
    }
    return (
        <>
            <NavHeader enableThemeToggle={true} lightMode={lightMode} changeTheme={changeTheme}></NavHeader>
            <GifyStore></GifyStore>
        </>
    )
}
