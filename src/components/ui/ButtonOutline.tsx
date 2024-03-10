interface ButtonOutlineProps {
    key: number;
    active?: boolean;
    hoverEffect?: boolean;
    children: React.ReactNode;
}

const ButtonOutline: React.FC<ButtonOutlineProps> = ({active, hoverEffect, children}) => {
    let classes = 'px-7 py-5 border rounded-md text-sm';
    if (active) {
        classes += ' bg-primary text-white';
    } else if (hoverEffect) {
        classes += ' transition-all ease-in hover:bg-primary hover:text-white';
    }


    return <button className={classes}>{children}</button>;
};

export default ButtonOutline;
