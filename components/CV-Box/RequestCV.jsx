import React from 'react';
import { FaFileAlt } from 'react-icons/fa';
import styles from '@/app/styles/CVBox.module.css';
import Link from 'next/link';

const RequestCV = () => {
    return (
        <div className={`${styles.iconBox} cvBox`}>
            <Link href="https://wa.link/3m6v7h" className={styles.iconLink} target='_blank' rel='noopener noreferrer'>
                <FaFileAlt size={20} />
                <span className={styles.requestText}>Need CV?</span>
            </Link>
        </div>
    )
}

export default RequestCV