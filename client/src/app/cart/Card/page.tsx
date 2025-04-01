import styles from './card.module.css';

interface CardProps {
    children: React.ReactNode;
    className?: string
}

export default function Card({children,className}: CardProps){
    return(
        <div className={`${styles.container} ${className}`}>
            {children}
        </div>
    )
}
