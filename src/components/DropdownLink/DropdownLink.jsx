import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./DropdownLink.module.css";
import { RiArrowDropDownLine } from "react-icons/ri";

export default function DropdownLink({ links, label }) {
    const [isOpen, setIsOpen] = useState(false);

    const onHoverDropDown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className={`${styles.dropdown}`} onMouseLeave={onHoverDropDown}>
            <button onMouseEnter={onHoverDropDown} onClick={onHoverDropDown} className={`${styles.dropbtn} flex items-center`}>
                {label}
                <RiArrowDropDownLine className="text-2xl" />
            </button>
            {isOpen && (
                <div className={styles.dropdownContent}>
                    {Array.from(links).map((item) => {
                        return (
                            <Link key={item.label} to={item.link}>
                                {item.label}
                            </Link>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
