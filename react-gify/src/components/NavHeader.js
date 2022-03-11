import React from 'react'

export default function NavHeader(props) {
    return (
        <nav className="navbar navbar-expand-sm bg-dark navbar-dark fixed-top">
            <a className="navbar-brand" href="/">Gify Store</a>
            {props.enableThemeToggle && <button className="btn btn-primary" onClick={props.changeTheme} type="button">{props.lightMode ? 'Dark Mode' : 'LightMode'}</button>}
        </nav>
    )
}
