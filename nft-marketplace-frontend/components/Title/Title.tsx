import React from 'react';

//INTERNAL IMPORT
import Style from "./Title.module.css";

type TitleProps = {
  heading: string;
  paragraph: string;
};

const Title: React.FC<TitleProps> = ({ heading, paragraph }) => {
    return (
        <div>
            <div className={Style.title}>
                <div className={Style.title_box}>
                    <h2>{heading}</h2>
                    <p>{paragraph}</p>
                </div>
            </div>
        </div>
    )
}

export default Title
