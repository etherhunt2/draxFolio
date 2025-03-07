import React from 'react';
import { FaFileAlt } from 'react-icons/fa';
import styles from '@/app/styles/CVBox.module.css';
import Link from 'next/link';

const RequestCV = () => {
    return (
        <div className={`${styles.iconBox} cvBox`}>
            <Link href="https://wa.link/3m6v7h" legacyBehavior>
                <a className={styles.iconLink} target='_blank' rel='noopener noreferrer'>
                    <FaFileAlt size={20} />
                    <span className={styles.requestText}>Request CV</span>
                </a>
            </Link>
        </div>
    )
}

export default RequestCV